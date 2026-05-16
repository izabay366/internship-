import { useNavigate } from 'react-router-dom';
import { Button } from '@/src/components/ui/Button';
import { BadgeHelp, ArrowRight, CheckCircle2, Rocket, Briefcase, Zap, SearchCheck, GraduationCap, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-[#050505] hero-pattern">
      {/* Navbar */}
      <header className="bg-[#050505]/80 backdrop-blur-md sticky top-0 z-50 border-b border-premium">
        <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
          <div className="flex flex-col items-center">
            <span className="serif text-2xl text-accent tracking-widest uppercase font-light">Aurelian</span>
            <p className="text-[8px] tracking-[0.4em] uppercase opacity-40 -mt-1">Internship Concierge</p>
          </div>
          <div className="hidden md:flex items-center space-x-10 text-[10px] tracking-widest uppercase font-light">
            <span className="border-b border-accent pb-1 cursor-pointer">Opportunities</span>
            <span className="opacity-40 cursor-pointer hover:opacity-100 transition-opacity">Resume Audit</span>
            <span className="opacity-40 cursor-pointer hover:opacity-100 transition-opacity">Network</span>
          </div>
          <div className="flex items-center gap-6">
            <Button variant="outline" size="sm" className="hidden sm:flex border-premium">Portal</Button>
            <div className="h-8 w-[1px] bg-premium hidden md:block"></div>
            <Button onClick={() => navigate('/onboarding')} size="sm">Get Started</Button>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="px-8 py-20 md:py-32 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 text-center md:text-left z-10"
          >
            <div className="inline-flex items-center gap-3 mb-8">
              <div className="w-10 h-[1px] bg-accent opacity-40"></div>
              <span className="text-[10px] font-medium uppercase tracking-[0.4em] text-accent">Curated Excellence</span>
            </div>
            <h1 className="serif text-5xl md:text-7xl font-light text-on-background mb-8 leading-[1.1]">
              Architect Your <br/>
              <span className="italic">Professional Future</span>
            </h1>
            <p className="text-sm md:text-base text-on-surface-variant mb-12 max-w-md mx-auto md:mx-0 font-light leading-relaxed tracking-wide">
              An exclusive gateway for discerning students to access the world's most prestigious internships. AI-driven precision meets white-glove career management.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center md:justify-start">
              <Button 
                size="xl" 
                onClick={() => navigate('/onboarding')}
                className="group px-12"
              >
                Begin Onboarding
              </Button>
              <Button size="xl" variant="outline" className="border-premium px-12">Private View</Button>
            </div>

            <div className="mt-16 pt-10 border-t border-premium flex items-center justify-center md:justify-start gap-6">
              <div className="flex -space-x-4">
                <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbYWA8NWSdRQD9ap-gcp0JovFH1Smx3ffv2D8caxEzAqknaw7oIAgzWAkxjtntLk-xUVYmHhqdIqSXcFQwcmxb9QHOGFUa826aMOny7pU7al3wSzAE8zxf62jn1t_Axfq3hIA3pWiJBVBtajOOCfH0wfSt11ow96mJMad3CtDvbEjrHr57aJULF6ZxBBktEc2LPUBLDrKVMr8zZBTmSJE5r5w35yg-Z_bz1WH2uYqBtglgUy1_kZg6kFEDlW8GmWNY_bcYg9Oo_oq7"
                    alt="User"
                    className="w-12 h-12 rounded-full border border-premium object-cover"
                />
                <div className="w-12 h-12 rounded-full border border-premium bg-[#0A0A0A] flex items-center justify-center text-[10px] text-accent font-light">
                  +5k
                </div>
              </div>
              <p className="text-[10px] text-accent/40 font-medium uppercase tracking-[0.2em]">
                Joining the <span className="text-accent underline underline-offset-4">Top 1%</span> of global talent
              </p>
            </div>
          </motion.div>

          {/* Hero Illustration (Card UI) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex-1 relative order-first md:order-last flex justify-center items-center"
          >
            <div className="absolute inset-0 bg-accent/5 rounded-full blur-[120px] transform -translate-y-12"></div>
            <div className="relative w-full max-w-lg">
              {/* Decorative Back Card */}
              <div className="absolute top-0 right-0 w-full aspect-[4/3] bg-[#0A0A0A] border border-premium p-8 transform -rotate-3 z-0 translate-x-6">
                 <div className="h-[1px] w-32 bg-premium mb-8" />
                 <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgt558b4ZYMNZ4Jk7RPZvO3E-kpVMWJVEFp3Tj2drPayfmJvWv8x19Fn5IxeCF9-QTc55M3EwvgeEDlupw3FL3ERLOsSnXcA_78EH5lTtXfhn74IfpJB4J1ET4RoTno0znpwVX2PkqVkrv7e09YmcIgREb2iihy5uTvdxkrZWjlnvis38IyzSUN6wyx6VSmamJjGMcu3v-fhbf8FHCMCV1THcf0lRR-ULcSTK2m3oDhR5NaYPiAf8svVbL0-mhzo_5ukesZQV5poFD"
                    alt="Workspace"
                    className="w-full h-full object-cover opacity-20 grayscale"
                  />
              </div>
              
              {/* Main Internship Card */}
              <div className="relative bg-neutral-900 border border-premium p-10 shadow-2xl z-20 hover:scale-[1.01] transition-transform duration-500">
                <div className="flex justify-between items-start mb-10">
                  <div className="w-14 h-14 bg-accent/10 border border-premium flex items-center justify-center">
                    <Rocket className="w-6 h-6 text-accent" />
                  </div>
                  <div className="text-accent px-4 py-1.5 border border-premium text-[9px] uppercase tracking-widest font-light italic">
                    98% Curated Match
                  </div>
                </div>
                <span className="text-[10px] uppercase tracking-widest text-accent mb-2 block">Silicon Valley</span>
                <h3 className="serif text-4xl font-light text-on-background mb-2 italic">Lead Design Intern</h3>
                <p className="text-[10px] uppercase tracking-[0.2em] text-on-surface-variant mb-10 font-light opacity-60">Tech Global Corp • Private Equity</p>
                
                <div className="flex gap-4 mb-12">
                  {['AI/ML', 'ESTATE', 'STRATEGY'].map(tag => (
                    <span key={tag} className="text-[9px] tracking-[0.2em] text-accent opacity-40 uppercase border-b border-accent/20 pb-0.5">
                      {tag}
                    </span>
                  ))}
                </div>
                <Button className="w-full h-14 bg-accent text-on-primary">Reserve Placement</Button>
              </div>

              {/* Toast Notification */}
              <motion.div 
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-10 -right-12 bg-[#050505] border border-premium p-6 shadow-2xl z-30 flex items-center gap-4"
              >
                 <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                 <div className="text-[10px] uppercase tracking-widest font-light leading-tight">Private Invitation <br/><span className="opacity-40 italic">Goldman Sachs</span></div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Features Bento */}
        <section className="px-8 py-32 max-w-7xl mx-auto">
          <div className="mb-20 text-center">
            <h2 className="serif text-4xl md:text-5xl font-light mb-4">Refining the <span className="italic">Modern Candidate</span></h2>
            <div className="w-20 h-[1px] bg-accent mx-auto opacity-30 mt-8"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="md:col-span-2 bg-[#0A0A0A] border border-premium p-12 transition-all group overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 blur-[100px] -z-10 translate-x-1/2 -translate-y-1/2"></div>
              <div className="max-w-lg mb-12">
                <span className="text-[10px] uppercase tracking-[0.3em] text-accent mb-6 block font-medium opacity-60">Identity Profile</span>
                <h3 className="serif text-3xl font-light mb-4 italic leading-tight">Archetype Mapping</h3>
                <p className="text-sm text-on-surface-variant font-light leading-relaxed tracking-wide opacity-80">Our proprietary neural engine identifies your professional spirit, matching your essence with cultures where genius is recognized.</p>
              </div>
              <div className="h-44 border-t border-premium/50 pt-10 flex items-center justify-between">
                  {['ANALYST', 'CREATIVE', 'OPERATOR'].map((role, i) => (
                    <div key={role} className="flex flex-col items-center gap-4">
                       <div className={`w-14 h-14 border border-premium flex items-center justify-center opacity-${100 - i*20}`}>
                          <CheckCircle2 className="w-5 h-5 text-accent opacity-40" />
                       </div>
                       <span className="text-[9px] uppercase tracking-widest font-light opacity-40">{role}</span>
                    </div>
                  ))}
              </div>
            </div>

            <div className="bg-accent p-12 text-on-primary flex flex-col justify-between shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rotate-45 translate-x-16 -translate-y-16"></div>
               <div>
                 <span className="text-[10px] uppercase tracking-[0.3em] text-on-primary/60 mb-6 block font-medium">Optimization</span>
                 <h3 className="serif text-3xl font-light mb-4 italic leading-tight">Polished Presentation</h3>
                 <p className="text-on-primary/80 text-sm font-light leading-relaxed">Elevating your dossier through AI-augmented refinement. First impressions, mathematically perfected.</p>
               </div>
               <div className="mt-12 pt-8 border-t border-on-primary/10">
                  <div className="flex items-center gap-3">
                     <Zap className="w-4 h-4" />
                     <span className="text-[10px] font-medium uppercase tracking-[0.2em]">Strategy: Emphasize Tenure</span>
                  </div>
               </div>
            </div>

            <div className="bg-[#0A0A0A] border border-premium p-12">
               <span className="text-[10px] uppercase tracking-[0.3em] text-accent mb-6 block font-medium opacity-60">Mentorship</span>
               <h3 className="serif text-3xl font-light mb-4 italic leading-tight">Private Access</h3>
               <p className="text-sm text-on-surface-variant font-light leading-relaxed tracking-wide opacity-80">direct consultation with established partners. Knowledge passed in confidence.</p>
            </div>

            <div className="md:col-span-2 bg-[#0A0A0A] border border-premium p-12 flex flex-col sm:flex-row items-center gap-12 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-premium to-transparent"></div>
               <div className="flex-1">
                 <span className="text-[10px] uppercase tracking-[0.3em] text-accent mb-6 block font-medium opacity-60">Analytics</span>
                 <h3 className="serif text-3xl font-light mb-4 italic leading-tight">Insight Engine</h3>
                 <p className="text-sm text-on-surface-variant font-light leading-relaxed tracking-wide opacity-80">Quantifying the shifting landscape of global opportunity. Knowledge is the ultimate asset.</p>
               </div>
               <div className="w-full sm:w-1/2 flex items-end justify-between h-32 gap-6 border-b border-premium/30 pb-2">
                  {[30, 60, 100, 70, 90, 40].map((h, i) => (
                    <div 
                      key={i} 
                      className="w-full bg-accent/20 border-t border-accent/40" 
                      style={{ height: `${h}%` }} 
                    />
                  ))}
               </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-8 my-32 border border-premium bg-[#0A0A0A] p-20 text-center relative overflow-hidden shadow-2xl">
           <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-20"></div>
           <h2 className="serif text-4xl md:text-6xl font-light mb-10 leading-tight">Secure Your <span className="italic">Placement</span></h2>
           <p className="text-on-surface-variant mb-12 max-w-2xl mx-auto text-sm font-light tracking-widest uppercase opacity-40">Private applications for the Fall 2024 season are now open.</p>
           <div className="flex flex-col sm:flex-row justify-center gap-8 relative z-10">
              <Button onClick={() => navigate('/onboarding')} size="lg" className="px-16">Enter Gate</Button>
              <Button size="lg" variant="outline" className="border-premium px-16">View Catalog</Button>
           </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#0A0A0A] border-t border-premium py-24 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-20">
          <div className="col-span-2 md:col-span-1">
            <span className="serif text-3xl text-accent mb-8 block font-light tracking-widest uppercase">Aurelian</span>
            <p className="text-[10px] text-on-surface-variant tracking-[0.3em] leading-relaxed uppercase opacity-40">
              Discreet professional brokerage for the academic elite. 
            </p>
          </div>
          <div>
            <h4 className="text-[10px] font-medium uppercase tracking-[0.4em] text-accent mb-10 opacity-30">Collections</h4>
            <ul className="space-y-4 text-[10px] uppercase tracking-[0.2em] font-light text-on-surface-variant">
              <li><a href="#" className="hover:text-accent transition-colors opacity-60 hover:opacity-100">Private Equity</a></li>
              <li><a href="#" className="hover:text-accent transition-colors opacity-60 hover:opacity-100">Tech Giants</a></li>
              <li><a href="#" className="hover:text-accent transition-colors opacity-60 hover:opacity-100">Strategic Labs</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-medium uppercase tracking-[0.4em] text-accent mb-10 opacity-30">Company</h4>
            <ul className="space-y-4 text-[10px] uppercase tracking-[0.2em] font-light text-on-surface-variant">
              <li><a href="#" className="hover:text-accent transition-colors opacity-60 hover:opacity-100">Our Charter</a></li>
              <li><a href="#" className="hover:text-accent transition-colors opacity-60 hover:opacity-100">Discretion</a></li>
              <li><a href="#" className="hover:text-accent transition-colors opacity-60 hover:opacity-100">Relations</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-medium uppercase tracking-[0.4em] text-accent mb-10 opacity-30">Connect</h4>
            <div className="flex gap-6">
               <button className="w-10 h-10 border border-premium flex items-center justify-center opacity-40 hover:opacity-100 transition-opacity"><Rocket className="w-4 h-4 text-accent" /></button>
               <button className="w-10 h-10 border border-premium flex items-center justify-center opacity-40 hover:opacity-100 transition-opacity"><Zap className="w-4 h-4 text-accent" /></button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-16 mt-20 border-t border-premium/20 flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] uppercase tracking-[0.5em] opacity-30 font-light">
           <p>© 2024 AURELIAN PRIVATE CONCIERGE. ALL RIGHTS RESERVED.</p>
           <div className="flex gap-12">
              <a href="#" className="hover:text-accent">Terms of Discretion</a>
              <a href="#" className="hover:text-accent">Privacy Portal</a>
           </div>
        </div>
      </footer>
    </div>
  );
}
