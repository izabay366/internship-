import { useNavigate } from 'react-router-dom';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Card } from '@/src/components/ui/Card';
import { Users } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/src/lib/utils';

export default function Step1About() {
  const navigate = useNavigate();
  const [year, setYear] = useState('Sophomore');

  const years = ['Freshman', 'Sophomore', 'Junior', 'Senior', 'Graduate'];

  return (
    <div className="space-y-12">
      <section>
        <div className="w-12 h-[1px] bg-accent mb-6 opacity-30"></div>
        <h2 className="serif text-4xl font-light text-on-background mb-4 italic leading-tight text-balance">The Foundation of Your Dossier</h2>
        <p className="text-sm text-accent opacity-60 font-light leading-relaxed tracking-wide">
          Your academic journey is the first chapter of your professional narrative. 
        </p>
      </section>

      <form className="space-y-10" onSubmit={(e) => { e.preventDefault(); navigate('/onboarding/step-2'); }}>
        <div className="space-y-8">
          <Input label="Identity" placeholder="Full legal name" required />
          <Input label="Institution" placeholder="Search prestigious institutions" required />
          <Input label="Discipline" placeholder="e.g. Quantitative Finance" required />
        </div>

        <div className="space-y-6">
          <label className="block text-[10px] uppercase tracking-[0.3em] text-accent opacity-60 font-medium ml-1">
            Academic Tenure
          </label>
          <div className="flex flex-wrap gap-3">
            {years.map((y) => (
              <button
                key={y}
                type="button"
                onClick={() => setYear(y)}
                className={cn(
                  "px-6 py-2.5 text-[10px] uppercase tracking-widest font-light border transition-all active:scale-95",
                  year === y 
                    ? "bg-accent text-on-primary border-accent" 
                    : "bg-surface-container-lowest text-accent/40 border-premium hover:border-accent hover:text-accent transition-all duration-300"
                )}
              >
                {y}
              </button>
            ))}
          </div>
        </div>

        {/* Decorative Card */}
        <Card level={2} className="mt-14 p-0 relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-24 h-[1px] bg-accent opacity-20"></div>
           <div className="h-40 bg-neutral-900 border-b border-premium relative">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqIB1OivdWx68SfMAp64K2PFfOZgy7el8wgo7PUz5OQWZOCHERNGInDX3p8eGx_4hBQA4aI6bmJ8W7ILX69JZZzaX0aib2iZZ2hKV_qTdO-umSVJWYOxQI9LkSY6pONyQ04TTOxyylIAW9r9FvB3yLKNLgT6i5P7lwXUbz2BAQtrClaD6diXupp8W8hLNv8l7NFuqt5O1FJopFW9eaqRiTA7h9nwUMv7qbMHnbVbOhJmlSgFu3l3GkpYVDJFezfE_MRRVnnViaLqMw" 
                alt="Students" 
                className="w-full h-full object-cover opacity-20 grayscale group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
           </div>
           <div className="p-8 flex items-start gap-6 bg-[#0A0A0A]">
              <div className="w-12 h-12 bg-accent/5 border border-premium flex items-center justify-center shrink-0">
                 <Users className="w-5 h-5 text-accent opacity-40 font-light" />
              </div>
              <p className="text-xs text-accent opacity-60 font-light leading-relaxed italic">
                "Precision in detail ensures exclusivity in placement. Your data is handled with the utmost discretion."
              </p>
           </div>
        </Card>

        {/* Fixed Bottom Action */}
        <div className="fixed bottom-0 left-0 w-full bg-surface/90 backdrop-blur-md border-t border-premium p-8 flex justify-center z-50">
          <Button type="submit" size="xl" className="w-full max-w-lg tracking-[0.2em] h-14">Continue Engagement</Button>
        </div>
      </form>
      <div className="h-20" /> {/* spacer */}
    </div>
  );
}
