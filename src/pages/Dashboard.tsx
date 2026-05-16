import { Button } from '@/src/components/ui/Button';
import { Card } from '@/src/components/ui/Card';
import { Rocket, TrendingUp, Sparkles, MessageCircle, ArrowRight, Bookmark, Briefcase } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col hero-pattern">
      <header className="bg-[#050505]/80 backdrop-blur-md border-b border-premium sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
            <div className="flex flex-col items-start leading-none gap-0.5">
              <span className="serif text-2xl text-accent tracking-widest uppercase font-light">Aurelian</span>
              <span className="text-[7px] uppercase tracking-[0.4em] text-accent opacity-40">Private Portal</span>
            </div>
            <div className="flex items-center gap-8">
               <div className="hidden sm:flex items-center gap-8 text-[10px] uppercase tracking-widest font-light opacity-60">
                 <span className="hover:text-accent cursor-pointer transition-colors">Catalog</span>
                 <span className="hover:text-accent cursor-pointer transition-colors">Brokerage</span>
               </div>
               <div className="w-10 h-10 border border-premium flex items-center justify-center text-[10px] text-accent font-light italic">
                  JD
               </div>
            </div>
        </div>
      </header>

      <main className="flex-grow p-8 md:p-12 max-w-6xl mx-auto w-full space-y-20 pb-32">
        {/* Welcome Header */}
        <section className="text-center pt-8">
           <motion.div 
             initial={{ scale: 0.9, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             className="inline-flex items-center gap-3 px-6 py-2 border border-accent/20 text-accent mb-8 font-light text-[9px] uppercase tracking-[0.3em] bg-accent/5 backdrop-blur-sm"
           >
              <Sparkles className="w-4 h-4 text-accent opacity-40" />
              Intelligence Calibration Complete
           </motion.div>
           <h1 className="serif text-4xl md:text-6xl font-light text-on-background mb-6 leading-tight italic">
             Welcome home, <span className="text-accent underline underline-offset-8 decoration-accent/20">John.</span>
           </h1>
           <p className="text-sm text-accent opacity-40 max-w-md mx-auto font-light leading-relaxed tracking-widest uppercase">
             Twelve institutions have expressed interest in your tenure.
           </p>
        </section>

        {/* Featured Match */}
        <section className="space-y-10">
           <div className="flex items-center justify-between border-b border-premium pb-6">
              <h2 className="serif text-2xl font-light text-on-background flex items-center gap-3 italic">
                 <Rocket className="w-5 h-5 text-accent opacity-40" />
                 Premier Matches
              </h2>
              <button className="text-[10px] uppercase tracking-[0.3em] text-accent opacity-40 hover:opacity-100 transition-opacity">Expand View</button>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
             {[1, 2].map((i) => (
                <div key={i}>
                  <Card className="group hover:border-accent/40 bg-[#0A0A0A] border-premium p-10 relative overflow-hidden transition-all duration-700 h-full">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 blur-[50px] pointer-events-none -z-10 group-hover:bg-accent/10 transition-colors"></div>
                    <div className="flex justify-between items-start mb-10">
                       <div className="w-14 h-14 border border-premium flex items-center justify-center opacity-40">
                          {i === 1 ? <TrendingUp className="w-6 h-6 text-accent" /> : <Rocket className="w-6 h-6 text-accent" />}
                       </div>
                       <div className="text-accent border border-premium px-3 py-1 flex items-center gap-1 font-light italic text-[8px] tracking-[0.2em] uppercase">
                          <Sparkles className="w-3 h-3 opacity-40" />
                          {i === 1 ? '98% SYNERGY' : '94% SYNERGY'}
                       </div>
                    </div>
                    
                    <h3 className="serif text-3xl font-light text-on-surface mb-2 italic">
                       {i === 1 ? 'Quant Strategist Intern' : 'Architectural Lead'}
                    </h3>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-accent opacity-40 mb-10 font-light">
                       {i === 1 ? 'Goldman Sachs • London' : 'Airbnb • Paris'}
                    </p>
 
                    <div className="flex gap-4 mb-12">
                       {['PYTHON', 'STRATEGY', 'RISK'].map(tag => (
                         <span key={tag} className="text-[9px] uppercase tracking-widest text-accent opacity-30 border-b border-accent/10 pb-0.5">
                            {tag}
                         </span>
                       ))}
                    </div>
 
                    <div className="flex gap-6">
                       <Button className="flex-1 h-12 uppercase tracking-widest text-[10px]">Secure Engagement</Button>
                       <button className="w-12 h-12 border border-premium flex items-center justify-center hover:border-accent transition-colors">
                          <Bookmark className="w-5 h-5 text-accent opacity-40" />
                       </button>
                    </div>
                  </Card>
                </div>
             ))}
           </div>
        </section>

        {/* Quick Tips */}
        <section className="bg-accent p-12 shadow-2xl relative overflow-hidden">
           <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rotate-45 translate-x-32 -translate-y-32" />
           <div className="flex flex-col md:flex-row items-center gap-12 relative z-10 text-on-primary">
              <div className="flex-1 space-y-6">
                 <span className="text-[10px] uppercase tracking-[0.4em] text-on-primary opacity-60">Consultation</span>
                 <h3 className="serif text-4xl font-light italic">Elevate your candidacy</h3>
                 <p className="text-on-primary/80 text-sm font-light leading-relaxed max-w-md">Our data indicates that refined portfolios receive priority placement by institutional partners.</p>
                 <Button className="bg-white text-[#050505] hover:bg-white/90 px-12 h-12 text-[10px] uppercase tracking-widest">Update Dossier</Button>
              </div>
              <div className="w-full md:w-1/3 bg-[#050505] p-8 border border-white/10 shadow-3xl">
                 <div className="flex items-center gap-3 mb-6 opacity-40">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-[9px] font-medium uppercase tracking-[0.3em]">Concierge Insight</span>
                 </div>
                 <p className="text-on-primary/80 text-xs font-light tracking-wide italic leading-relaxed">
                   "Precision in the first paragraph of your statement of purpose yields the highest return."
                 </p>
              </div>
           </div>
        </section>
      </main>

      {/* Navigation for small screens */}
      <footer className="fixed bottom-0 left-0 w-full bg-[#050505] border-t border-premium p-6 flex justify-around md:hidden z-50 backdrop-blur-xl bg-opacity-80">
        <button className="flex flex-col gap-1 items-center font-medium text-[8px] uppercase tracking-[0.2em] text-accent">
           <TrendingUp className="w-5 h-5 opacity-40" />
           Synergy
        </button>
        <button className="flex flex-col gap-1 items-center font-medium text-[8px] uppercase tracking-[0.2em] text-accent opacity-40">
           <Briefcase className="w-5 h-5" />
           Archives
        </button>
        <button className="flex flex-col gap-1 items-center font-medium text-[8px] uppercase tracking-[0.2em] text-accent opacity-40">
           <MessageCircle className="w-5 h-5" />
           Concierge
        </button>
      </footer>
    </div>
  );
}
