import { useState, useEffect } from 'react';
import { Button } from '@/src/components/ui/Button';
import { Card } from '@/src/components/ui/Card';
import { Input } from '@/src/components/ui/Input';
import { Plus, Users, Briefcase, TrendingUp, ChevronRight, MessageSquare, PieChart, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '@/src/context/AuthContext';

export default function RecruiterDashboard() {
  const { token, user } = useAuth();
  const [jobs, setJobs] = useState<any[]>([]);
  const [isPosting, setIsPosting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [newJob, setNewJob] = useState({
    title: '',
    location: '',
    type: 'Full-time',
    description: '',
    tags: ''
  });

  const fetchJobs = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/my-jobs', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) setJobs(await res.json());
    } catch (err) {
      console.error('Fetch jobs error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [token]);

  const handlePostJob = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3001/api/jobs', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          ...newJob,
          company: user?.name,
          tags: newJob.tags.split(',').map(t => t.trim()).filter(t => t !== '')
        }),
      });

      if (res.ok) {
        setIsPosting(false);
        setNewJob({ title: '', location: '', type: 'Full-time', description: '', tags: '' });
        fetchJobs();
      } else {
        alert('Failed to post job');
      }
    } catch (err) {
      console.error('Post job error:', err);
    }
  };

  return (
    <div className="space-y-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-on-surface mb-2">Company Dashboard</h1>
          <p className="text-on-surface-variant">Manage your internship postings and track applicants.</p>
        </div>
        <Button onClick={() => setIsPosting(true)} className="shrink-0 bg-accent text-white hover:bg-accent/90">
          <Plus className="w-4 h-4 mr-2" />
          Post New Internship
        </Button>
      </header>

      {/* Post Job Modal (Simple Overlay) */}
      <AnimatePresence>
        {isPosting && (
          <div className="fixed inset-0 bg-surface/80 backdrop-blur-md z-[60] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-surface-container border border-outline rounded-[2.5rem] w-full max-w-lg p-10 shadow-2xl relative"
            >
              <button 
                onClick={() => setIsPosting(false)}
                className="absolute top-8 right-8 text-on-surface-variant hover:text-on-surface transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              
              <h2 className="text-2xl font-bold mb-8">Post an Internship</h2>
              
              <form onSubmit={handlePostJob} className="space-y-6">
                <Input 
                  label="Job Title" 
                  placeholder="e.g. Frontend Engineer Intern" 
                  value={newJob.title}
                  onChange={(e) => setNewJob({...newJob, title: e.target.value})}
                  required 
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input 
                    label="Location" 
                    placeholder="e.g. Remote / New York" 
                    value={newJob.location}
                    onChange={(e) => setNewJob({...newJob, location: e.target.value})}
                    required 
                  />
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant ml-1">Type</label>
                    <select 
                      className="w-full bg-surface-bright border border-outline rounded-xl h-12 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                      value={newJob.type}
                      onChange={(e) => setNewJob({...newJob, type: e.target.value})}
                    >
                      <option>Full-time</option>
                      <option>Part-time</option>
                      <option>Project-based</option>
                    </select>
                  </div>
                </div>
                <Input 
                  label="Tags (Comma separated)" 
                  placeholder="e.g. React, Node.js, AI" 
                  value={newJob.tags}
                  onChange={(e) => setNewJob({...newJob, tags: e.target.value})}
                />
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant ml-1">Description</label>
                  <textarea 
                    className="w-full bg-surface-bright border border-outline rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 h-32"
                    placeholder="Describe the role and requirements..."
                    value={newJob.description}
                    onChange={(e) => setNewJob({...newJob, description: e.target.value})}
                    required
                  />
                </div>
                
                <div className="pt-4 flex gap-4">
                  <Button type="button" variant="ghost" className="flex-1" onClick={() => setIsPosting(false)}>Cancel</Button>
                  <Button type="submit" className="flex-1">Publish Internship</Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Active Postings', value: jobs.length.toString(), icon: Briefcase, color: 'text-primary', bg: 'bg-primary/10' },
          { label: 'Total Applicants', value: jobs.reduce((acc, curr) => acc + curr.applicant_count, 0).toString(), icon: Users, color: 'text-accent', bg: 'bg-accent/10' },
          { label: 'Shortlisted', value: '0', icon: TrendingUp, color: 'text-green-500', bg: 'bg-green-500/10' },
          { label: 'Messages', value: '0', icon: MessageSquare, color: 'text-orange-500', bg: 'bg-orange-500/10' },
        ].map((stat, i) => (
          <Card key={i} className="p-6 border-outline">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-on-surface-variant font-medium uppercase tracking-wider">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Your Postings</h2>
          </div>
          
          <div className="space-y-4">
            {isLoading ? (
              <p className="text-center py-10 text-on-surface-variant">Loading postings...</p>
            ) : jobs.length === 0 ? (
              <p className="text-center py-10 text-on-surface-variant italic">No postings yet. Click "Post New Internship" to start.</p>
            ) : (
              jobs.map((post) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <Card className="p-6 hover:border-primary/40 transition-all border-outline">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                      <div className="flex gap-4">
                        <div className="w-10 h-10 bg-surface-bright rounded-lg flex items-center justify-center shrink-0">
                          <Briefcase className="w-5 h-5 text-on-surface-variant" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{post.title}</h3>
                          <p className="text-xs text-on-surface-variant">Posted {new Date(post.created_at).toLocaleDateString()} • {post.location}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-12">
                        <div className="text-center">
                          <p className="text-sm font-bold">{post.applicant_count}</p>
                          <p className="text-[10px] text-on-surface-variant uppercase font-medium">Applicants</p>
                        </div>
                        <Button variant="outline" size="sm" className="h-9 px-4">
                          View List
                          <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        </div>

        <div className="space-y-8">
          <Card className="p-6 border-outline overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-16 translate-x-16"></div>
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <PieChart className="w-5 h-5 text-primary" />
              Recruitment Analytics
            </h3>
            <div className="space-y-6">
              <p className="text-xs text-on-surface-variant italic">Analytics will appear here once you have applicants.</p>
            </div>
          </Card>

          <Card className="p-6 bg-surface-container border-outline text-center">
             <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-primary" />
             </div>
             <h3 className="font-semibold mb-2">Talent Insights</h3>
             <p className="text-xs text-on-surface-variant leading-relaxed">
               Post more internships to see how your employer brand performs against industry benchmarks.
             </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
