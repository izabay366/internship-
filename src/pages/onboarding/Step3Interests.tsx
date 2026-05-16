import { useNavigate } from 'react-router-dom';
import { Button } from '@/src/components/ui/Button';
import { Card } from '@/src/components/ui/Card';
import { Code, Palette, BarChart3, Megaphone, Wallet, PackageOpen, BrainCircuit, LineChart, Users2, Sparkles, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/src/lib/utils';

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
  const [selected, setSelected] = useState<string[]>(['swe', 'design', 'marketing']);

  const toggle = (id: string) => {
    setSelected(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-12">
      <section>
        <div className="w-12 h-[1px] bg-accent mb-6 opacity-30"></div>
        <h2 className="serif text-4xl font-light text-on-background mb-4 italic leading-tight text-balance">Curate Your <span className="italic">Destiny</span></h2>
        <p className="text-sm text-accent opacity-60 font-light leading-relaxed tracking-wide">
           Select the domains where you seek to establish your legacy. Minimum of three required.
        </p>
      </section>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
        {INTERESTS.map(({ id, label, Icon }) => {
          const isActive = selected.includes(id);
          return (
            <button
              key={id}
              onClick={() => toggle(id)}
              className={cn(
                "group flex flex-col items-start p-6 border transition-all active:scale-95 text-left h-40 justify-between relative overflow-hidden",
                isActive 
                  ? "bg-accent/5 border-accent text-accent shadow-xl shadow-accent/5" 
                  : "bg-[#0A0A0A] border-premium text-accent/40 hover:border-accent hover:text-accent duration-500"
              )}
            >
              <div className={cn(
                "w-10 h-10 border flex items-center justify-center transition-colors",
                isActive ? "border-accent bg-accent/10" : "border-premium bg-transparent"
              )}>
                <Icon className={cn(
                    "w-5 h-5",
                    isActive ? "text-accent" : "text-accent/30 group-hover:text-accent"
                )} />
              </div>
              <span className={cn(
                  "text-[10px] uppercase tracking-widest font-medium leading-tight",
                  isActive ? "opacity-100" : "opacity-40"
              )}>{label}</span>
              
              {isActive && (
                <div className="absolute top-0 right-0 w-8 h-8 bg-accent flex items-center justify-center">
                   <div className="w-1.5 h-1.5 bg-on-primary rounded-full" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      <Card level={0} className="bg-[#0A0A0A] border border-premium flex items-center gap-6 p-8">
        <div className="p-3 border border-premium">
          <Sparkles className="w-6 h-6 text-accent opacity-40" />
        </div>
        <div>
          <h4 className="text-[10px] font-medium text-accent uppercase tracking-[0.3em] mb-2 opacity-40">Intelligence Calibration</h4>
          <p className="text-xs text-accent/80 font-light leading-relaxed italic">
            "Your selections inform our neural matching engine, aligning your aspirations with institutional needs."
          </p>
        </div>
      </Card>

      {/* Fixed Bottom Action */}
      <div className="fixed bottom-0 left-0 w-full bg-surface/90 backdrop-blur-md border-t border-premium p-8 flex flex-col items-center gap-4 z-50">
        <Button 
            onClick={() => navigate('/dashboard')} 
            size="xl" 
            className="w-full max-w-lg h-14 tracking-[0.2em]"
        >
          Finalize Dossier
          <CheckCircle2 className="w-5 h-5 ml-2" />
        </Button>
        <p className="text-[9px] font-medium text-accent opacity-40 text-center uppercase tracking-[0.4em] px-10">
          Preferences may be refined via the private portal.
        </p>
      </div>
      <div className="h-28" />
    </div>
  );
}
