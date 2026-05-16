import { useNavigate } from 'react-router-dom';
import { Button } from '@/src/components/ui/Button';
import { Card } from '@/src/components/ui/Card';
import { CloudUpload, FileText, Sparkles, FolderOpen } from 'lucide-react';
import { useState } from 'react';

export default function Step2Upload() {
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = () => {
    setIsUploading(true);
    // Simulate upload delay
    setTimeout(() => {
      setIsUploading(false);
      navigate('/onboarding/step-3');
    }, 1500);
  };

  return (
    <div className="space-y-12">
      <section>
        <div className="w-12 h-[1px] bg-accent mb-6 opacity-30"></div>
        <h2 className="serif text-4xl font-light text-on-background mb-4 italic leading-tight text-balance">The Professional Dossier</h2>
        <p className="text-sm text-accent opacity-60 font-light leading-relaxed tracking-wide">
          Our refinement algorithms analyze your trajectory to ensure alignment with our partner standards.
        </p>
      </section>

      <div className="space-y-10">
        {/* Upload Zone */}
        <Card 
            level={2} 
            className="group relative cursor-pointer border-2 border-dashed border-premium hover:border-accent hover:bg-accent/5 transition-all duration-700 p-16 flex flex-col items-center justify-center text-center aspect-[4/3] bg-[#0A0A0A]"
        >
          <input 
            type="file" 
            className="absolute inset-0 opacity-0 cursor-pointer" 
            onChange={handleUpload}
            disabled={isUploading}
          />
          <div className="w-20 h-20 bg-accent/5 border border-premium flex items-center justify-center mb-8 group-hover:scale-105 transition-transform duration-500">
            <CloudUpload className="w-8 h-8 text-accent opacity-40 group-hover:opacity-100 transition-opacity" />
          </div>
          <h3 className="serif text-3xl font-light text-on-surface mb-2 italic">Deposit Credentials</h3>
          <p className="text-[10px] uppercase tracking-[0.3em] text-accent opacity-40 mb-10">Drag and drop or select file</p>
          
          <div className="flex gap-4">
             {['PDF', 'DOCX'].map(format => (
               <div key={format} className="flex items-center gap-2 px-4 py-1.5 bg-transparent border border-premium transition-colors hover:border-accent">
                  <FileText className="w-3.5 h-3.5 text-accent opacity-40" />
                  <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-accent opacity-60">{format}</span>
               </div>
             ))}
          </div>

          {isUploading && (
            <div className="absolute inset-0 bg-[#050505]/95 backdrop-blur-md flex flex-col items-center justify-center">
               <div className="w-12 h-12 border border-premium border-t-accent rounded-full animate-spin mb-6" />
               <p className="text-[10px] uppercase tracking-[0.4em] text-accent animate-pulse font-light">Analyzing trajectory...</p>
            </div>
          )}
        </Card>

        {/* AI Insight */}
        <Card level={0} className="bg-[#0A0A0A] border border-premium p-8 flex items-start gap-6">
           <div className="p-3 border border-premium">
             <Sparkles className="w-5 h-5 text-accent opacity-40" />
           </div>
           <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-accent opacity-40 mb-2">Concierge Note</p>
              <p className="text-sm font-light text-accent/80 leading-relaxed italic">
                "A detailed dossier increases private placement visibility by 85%. Discretion is our priority."
              </p>
           </div>
        </Card>

        {/* Fixed Bottom Action */}
        <div className="fixed bottom-0 left-0 w-full bg-surface/90 backdrop-blur-md border-t border-premium p-8 flex flex-col items-center gap-4 z-50">
          <Button 
            onClick={() => navigate('/onboarding/step-3')} 
            size="xl" 
            className="w-full max-w-lg h-14"
          >
            Acknowledge & Next
          </Button>
          <button 
            type="button"
            onClick={() => navigate('/onboarding/step-3')}
            className="text-[10px] uppercase tracking-[0.4em] text-accent opacity-40 hover:opacity-100 transition-opacity font-medium"
          >
            I will provide this later
          </button>
        </div>
      </div>
      <div className="h-24" />
    </div>
  );
}
