import { useNavigate } from 'react-router-dom';
import { Button } from '@/src/components/ui/Button';
import { Code, Palette, BarChart3, Megaphone, Wallet, PackageOpen, BrainCircuit, LineChart, Users2, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/src/lib/utils';
import { useAuth } from '@/src/context/AuthContext';

const INTERESTS = [
  { id: 'swe', label: 'Software Engineering', Icon: Code },
  { id: 'design', label: 'UI/UX Design', Icon: Palette },
  { id: 'data', label: 'Data Science', Icon: BarChart3 },
  { id: 'marketing', label: 'Marketing', Icon: Megaphone },
  { id: 'finance', label: 'Finance', Icon: Wallet },
  { id: 'pm', label: 'Product Management', Icon: PackageOpen },
  { id: 'ai', label: 'Artificial Intelligence', Icon: BrainCircuit },
  { id: 'sales', label: 'Sales', Icon: LineChart },
  { id: 'hr', label: 'Human Resources', Icon: Users2 },
];

export default function Step3Interests() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [selected, setSelected] = useState<string[]>(['swe', 'design']);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggle = (id: string) => {
    setSelected(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleFinalize = async () => {
    setIsSubmitting(true);
    setError(null);
    try {
      const savedData = JSON.parse(localStorage.getItem('onboarding_data') || '{}');
      const finalData = {
        ...savedData,
        interests: selected,
        role: 'applicant' // Defaulting to applicant for this flow
      };

      const data: any = await register(finalData);
      localStorage.removeItem('onboarding_data');
      
      if (data.needsVerification) {
        navigate('/verify-email');
      } else {
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong during registration');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-3xl font-bold text-on-surface mb-3 tracking-tight">Choose your interests</h2>
        <p className="text-on-surface-variant text-sm leading-relaxed">
           Select at least two categories to help us personalize your feed.
        </p>
      </section>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 text-sm rounded-xl">
          {error}
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {INTERESTS.map(({ id, label, Icon }) => {
          const isActive = selected.includes(id);
          return (
            <button
              key={id}
              onClick={() => toggle(id)}
              disabled={isSubmitting}
              className={cn(
                "group flex flex-col items-center justify-center p-6 border rounded-2xl transition-all active:scale-95 text-center h-32 gap-3 relative",
                isActive 
                  ? "bg-primary/5 border-primary text-primary shadow-lg shadow-primary/5" 
                  : "bg-surface-bright/50 border-outline text-on-surface-variant hover:border-primary/50 hover:text-on-surface"
              )}
            >
              <Icon className={cn(
                  "w-6 h-6 transition-transform group-hover:scale-110",
                  isActive ? "text-primary" : "text-on-surface-variant opacity-50"
              )} />
              <span className="text-[10px] font-bold uppercase tracking-wider leading-tight">{label}</span>
              
              {isActive && (
                <div className="absolute top-3 right-3">
                   <CheckCircle2 className="w-4 h-4 text-primary" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      <div className="pt-10 space-y-4">
        <Button 
            onClick={handleFinalize} 
            size="lg" 
            className="w-full h-14"
            disabled={selected.length < 2 || isSubmitting}
        >
          {isSubmitting ? 'Creating Account...' : 'Complete Onboarding'}
        </Button>
        <p className="text-[10px] font-bold text-on-surface-variant text-center uppercase tracking-widest">
          You can change these preferences later in your settings.
        </p>
      </div>
    </div>
  );
}
