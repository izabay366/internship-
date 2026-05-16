import { useNavigate } from 'react-router-dom';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Users, BookOpen } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/src/lib/utils';

export default function Step1About() {
  const navigate = useNavigate();
  const [year, setYear] = useState('Sophomore');

  const years = ['Freshman', 'Sophomore', 'Junior', 'Senior', 'Graduate'];

  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-3xl font-bold text-on-surface mb-3 tracking-tight">Tell us about yourself</h2>
        <p className="text-on-surface-variant text-sm leading-relaxed">
          Help us understand your background to find the best internship matches for you.
        </p>
      </section>

      <form className="space-y-8" onSubmit={(e) => { 
        e.preventDefault(); 
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());
        localStorage.setItem('onboarding_data', JSON.stringify(data));
        navigate('/onboarding/step-2'); 
      }}>
        <div className="space-y-6">
          <Input label="Full Name" name="name" placeholder="e.g. John Doe" required />
          <Input label="Email Address" name="email" type="email" placeholder="e.g. john@example.com" required />
          <Input label="Password" name="password" type="password" placeholder="Min 6 characters" required />
          <Input label="University / Institution" name="institution" placeholder="e.g. Stanford University" required />
          <Input label="Major / Field of Study" name="major" placeholder="e.g. Computer Science" required />
        </div>

        <div className="space-y-4">
          <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant ml-1">
            Current Year
          </label>
          <div className="flex flex-wrap gap-2">
            {years.map((y) => (
              <button
                key={y}
                type="button"
                onClick={() => setYear(y)}
                className={cn(
                  "px-4 py-2 text-xs font-semibold rounded-xl border transition-all active:scale-95",
                  year === y 
                    ? "bg-primary text-on-primary border-primary shadow-lg shadow-primary/20" 
                    : "bg-surface-bright text-on-surface-variant border-outline hover:border-primary hover:text-on-surface"
                )}
              >
                {y}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 bg-primary/5 border border-primary/10 rounded-2xl flex items-start gap-4 mt-8">
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
             <BookOpen className="w-5 h-5 text-primary" />
          </div>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            <span className="font-bold text-on-surface">Pro Tip:</span> Completing your profile increases your visibility to recruiters by up to 3x.
          </p>
        </div>

        <div className="pt-6">
          <Button type="submit" size="lg" className="w-full h-14">
            Continue to CV Upload
          </Button>
        </div>
      </form>
    </div>
  );
}
