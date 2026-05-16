import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { Button } from '@/src/components/ui/Button';
import { Mail, CheckCircle2, AlertCircle, ArrowRight, Briefcase } from 'lucide-react';
import { motion } from 'motion/react';

export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();
  const [status, setStatus] = useState<'pending' | 'verifying' | 'success' | 'error'>(token ? 'verifying' : 'pending');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (token) {
      const verify = async () => {
        try {
          const res = await fetch(`http://localhost:3001/api/auth/verify/${token}`);
          const data = await res.json();
          if (res.ok) {
            setStatus('success');
            setMessage(data.message);
          } else {
            setStatus('error');
            setMessage(data.error);
          }
        } catch (err) {
          setStatus('error');
          setMessage('Failed to connect to the server.');
        }
      };
      verify();
    }
  }, [token]);

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-6 hero-pattern">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md text-center"
      >
        <div className="flex items-center gap-3 justify-center mb-12">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
            <Briefcase className="w-6 h-6 text-on-primary" />
          </div>
          <span className="font-bold text-2xl tracking-tight">InternPortal</span>
        </div>

        <div className="bg-surface-container border border-outline rounded-[2.5rem] p-10 md:p-14 shadow-2xl">
          {status === 'pending' && (
            <>
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
                <Mail className="w-10 h-10 text-primary" />
              </div>
              <h1 className="text-3xl font-bold mb-4">Check your email</h1>
              <p className="text-on-surface-variant text-sm mb-10 leading-relaxed">
                We've sent a verification link to your email address. Please click the link to activate your account.
              </p>
              <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10 mb-8">
                 <p className="text-[10px] font-bold uppercase tracking-widest text-primary">Simulation Note</p>
                 <p className="text-xs text-on-surface-variant mt-2">Check the server terminal console to find your verification link.</p>
              </div>
              <Button onClick={() => navigate('/login')} variant="outline" className="w-full h-14">
                Back to Login
              </Button>
            </>
          )}

          {status === 'verifying' && (
            <>
              <div className="w-12 h-12 border-2 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-8" />
              <h1 className="text-2xl font-bold mb-2">Verifying...</h1>
              <p className="text-on-surface-variant text-sm">Please wait while we confirm your email.</p>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-8 text-green-500">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <h1 className="text-3xl font-bold mb-4">Account Verified!</h1>
              <p className="text-on-surface-variant text-sm mb-10">{message}</p>
              <Button onClick={() => navigate('/login')} className="w-full h-14">
                Continue to Login
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-8 text-red-500">
                <AlertCircle className="w-12 h-12" />
              </div>
              <h1 className="text-3xl font-bold mb-4">Verification Failed</h1>
              <p className="text-on-surface-variant text-sm mb-10">{message}</p>
              <Button onClick={() => navigate('/onboarding')} variant="outline" className="w-full h-14">
                Try Registering Again
              </Button>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}
