import { useNavigate } from 'react-router-dom';
import { Button } from '@/src/components/ui/Button';
import { CloudUpload, FileText, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

export default function Step2Upload() {
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);

  const handleUpload = () => {
    setIsUploading(true);
    // Simulate upload delay
    setTimeout(() => {
      setIsUploading(false);
      setIsUploaded(true);
    }, 1500);
  };

  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-3xl font-bold text-on-surface mb-3 tracking-tight">Upload your CV / Resume</h2>
        <p className="text-on-surface-variant text-sm leading-relaxed">
          Our system will parse your experience to provide better recommendations.
        </p>
      </section>

      <div className="space-y-8">
        <div 
          className={`relative group cursor-pointer border-2 border-dashed rounded-[2rem] p-12 flex flex-col items-center justify-center text-center transition-all duration-500 bg-surface-bright/50 ${isUploaded ? 'border-green-500/50 bg-green-500/5' : 'border-outline hover:border-primary hover:bg-primary/5'}`}
        >
          <input 
            type="file" 
            className="absolute inset-0 opacity-0 cursor-pointer" 
            onChange={handleUpload}
            disabled={isUploading || isUploaded}
          />
          
          {isUploaded ? (
            <>
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-xl font-bold text-on-surface mb-2">Resume Uploaded!</h3>
              <p className="text-xs text-on-surface-variant">resume_final_v2.pdf</p>
            </>
          ) : (
            <>
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <CloudUpload className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-on-surface mb-2">Drop your CV here</h3>
              <p className="text-xs text-on-surface-variant mb-6 uppercase tracking-widest font-bold">PDF or Word (Max 5MB)</p>
              
              <div className="flex gap-3">
                <div className="flex items-center gap-2 px-4 py-2 bg-surface-container border border-outline rounded-xl">
                  <FileText className="w-4 h-4 text-primary" />
                  <span className="text-[10px] font-bold text-on-surface-variant">PDF</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-surface-container border border-outline rounded-xl">
                  <FileText className="w-4 h-4 text-primary" />
                  <span className="text-[10px] font-bold text-on-surface-variant">DOCX</span>
                </div>
              </div>
            </>
          )}

          {isUploading && (
            <div className="absolute inset-0 bg-surface/80 backdrop-blur-sm rounded-[2rem] flex flex-col items-center justify-center z-10">
               <div className="w-10 h-10 border-2 border-primary/20 border-t-primary rounded-full animate-spin mb-4" />
               <p className="text-xs font-bold text-primary animate-pulse tracking-widest uppercase">Processing...</p>
            </div>
          )}
        </div>

        <div className="p-6 bg-accent/5 border border-accent/10 rounded-2xl">
           <p className="text-xs text-on-surface-variant leading-relaxed">
             <span className="font-bold text-accent">Privacy Note:</span> Your documents are encrypted and only visible to companies you choose to apply to.
           </p>
        </div>

        <div className="pt-6 space-y-4">
          <Button 
            onClick={() => navigate('/onboarding/step-3')} 
            size="lg" 
            className="w-full h-14"
            disabled={isUploading}
          >
            {isUploaded ? 'Continue' : 'I\'ll upload it later'}
          </Button>
        </div>
      </div>
    </div>
  );
}
