import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3001;
const SECRET_KEY = process.env.JWT_SECRET || 'internportal-super-secret-key';

app.use(cors());
app.use(express.json());

// Initialize SQLite Database
const dbPath = path.resolve(__dirname, '../database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) console.error('Database connection error:', err);
  else console.log('Connected to SQLite database.');
});

// Create tables if they don't exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE,
      password TEXT,
      name TEXT,
      role TEXT,
      institution TEXT,
      major TEXT,
      year TEXT,
      interests TEXT,
      is_verified INTEGER DEFAULT 0,
      verification_token TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS jobs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      recruiter_id INTEGER,
      title TEXT,
      company TEXT,
      location TEXT,
      description TEXT,
      tags TEXT,
      type TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(recruiter_id) REFERENCES users(id)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS applications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      job_id INTEGER,
      applicant_id INTEGER,
      status TEXT DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(job_id) REFERENCES jobs(id),
      FOREIGN KEY(applicant_id) REFERENCES users(id),
      UNIQUE(job_id, applicant_id)
    )
  `);
});

// Auth Routes
app.post('/api/auth/register', async (req, res) => {
  const { email, password, name, role, institution, major, year, interests } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const interestsStr = JSON.stringify(interests || []);
    const verificationToken = crypto.randomBytes(32).toString('hex');

    const query = `
      INSERT INTO users (email, password, name, role, institution, major, year, interests, verification_token)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.run(query, [email, hashedPassword, name, role, institution, major, year, interestsStr, verificationToken], function(err) {
      if (err) {
        if (err.message.includes('UNIQUE constraint failed')) {
          return res.status(400).json({ error: 'Email already exists' });
        }
        return res.status(500).json({ error: err.message });
      }

      // Simulate sending email
      const verifyUrl = `http://localhost:3000/verify-email?token=${verificationToken}`;
      console.log('------------------------------------------');
      console.log(`VERIFICATION EMAIL SENT TO: ${email}`);
      console.log(`CLICK HERE TO VERIFY: ${verifyUrl}`);
      console.log('------------------------------------------');

      res.status(201).json({ 
        message: 'Registration successful. Please verify your email.',
        needsVerification: true
      });
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/auth/verify/:token', (req, res) => {
  const { token } = req.params;

  db.run('UPDATE users SET is_verified = 1, verification_token = NULL WHERE verification_token = ?', [token], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(400).json({ error: 'Invalid or expired token' });
    
    res.json({ message: 'Email verified successfully! You can now log in.' });
  });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user: any) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    if (!user.is_verified) {
      return res.status(403).json({ error: 'Please verify your email address before logging in.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, SECRET_KEY, { expiresIn: '24h' });
    res.json({ 
      token, 
      user: { id: user.id, email: user.email, name: user.name, role: user.role } 
    });
  });
});

// Middleware to verify JWT
const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err: any, user: any) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

app.get('/api/user/profile', authenticateToken, (req: any, res) => {
  db.get('SELECT id, email, name, role, institution, major, year, interests FROM users WHERE id = ?', [req.user.id], (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(user);
  });
});

// Job Routes
app.post('/api/jobs', authenticateToken, (req: any, res) => {
  const { title, company, location, description, tags, type } = req.body;
  const recruiter_id = req.user.id;

  if (req.user.role !== 'recruiter') return res.status(403).json({ error: 'Only recruiters can post jobs' });

  const query = `INSERT INTO jobs (recruiter_id, title, company, location, description, tags, type) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  db.run(query, [recruiter_id, title, company, location, description, JSON.stringify(tags), type], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID, title, company });
  });
});

app.get('/api/jobs', (req, res) => {
  db.all('SELECT * FROM jobs ORDER BY created_at DESC', [], (err, jobs) => {
    if (err) return res.status(500).json({ error: err.message });
    const formattedJobs = jobs.map((j: any) => ({
      ...j,
      tags: JSON.parse(j.tags || '[]')
    }));
    res.json(formattedJobs);
  });
});

app.get('/api/my-jobs', authenticateToken, (req: any, res) => {
  const query = `
    SELECT j.*, COUNT(a.id) as applicant_count 
    FROM jobs j 
    LEFT JOIN applications a ON j.id = a.job_id 
    WHERE j.recruiter_id = ? 
    GROUP BY j.id 
    ORDER BY j.created_at DESC
  `;
  db.all(query, [req.user.id], (err, jobs) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(jobs);
  });
});

// Application Routes
app.post('/api/applications', authenticateToken, (req: any, res) => {
  const { job_id } = req.body;
  const applicant_id = req.user.id;

  if (req.user.role !== 'applicant') return res.status(403).json({ error: 'Only applicants can apply for jobs' });

  const query = `INSERT INTO applications (job_id, applicant_id) VALUES (?, ?)`;
  db.run(query, [job_id, applicant_id], function(err) {
    if (err) {
      if (err.message.includes('UNIQUE constraint failed')) {
        return res.status(400).json({ error: 'You have already applied for this job' });
      }
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID, status: 'pending' });
  });
});

app.get('/api/my-applications', authenticateToken, (req: any, res) => {
  const query = `
    SELECT a.*, j.title, j.company, j.location, j.type 
    FROM applications a 
    JOIN jobs j ON a.job_id = j.id 
    WHERE a.applicant_id = ?
    ORDER BY a.created_at DESC
  `;
  db.all(query, [req.user.id], (err, apps) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(apps);
  });
});

app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});
