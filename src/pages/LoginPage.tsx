import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { useAuth } from '@/src/context/AuthContext';
import { Briefcase, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      await login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-6 hero-pattern">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="flex items-center gap-3 justify-center mb-10">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
            <Briefcase className="w-6 h-6 text-on-primary" />
          </div>
          <span className="font-bold text-2xl tracking-tight">InternPortal</span>
        </div>

        <div className="bg-surface-container border border-outline rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
            <p className="text-on-surface-variant text-sm">Enter your credentials to access your portal.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-500 text-sm rounded-xl text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input 
              label="Email Address" 
              type="email" 
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="name@company.com" 
              required 
            />
            <Input 
              label="Password" 
              type="password" 
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="••••••••" 
              required 
            />

            <div className="pt-4">
              <Button type="submit" size="lg" className="w-full h-14" disabled={isSubmitting}>
                {isSubmitting ? 'Signing In...' : 'Sign In'}
                {!isSubmitting && <ArrowRight className="w-4 h-4 ml-2" />}
              </Button>
            </div>
          </form>

          <div className="mt-10 pt-6 border-t border-outline text-center">
            <p className="text-sm text-on-surface-variant">
              Don't have an account?{' '}
              <Link to="/onboarding" className="text-primary font-bold hover:underline">
                Get Started
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
