import { useNavigate } from 'react-router-dom';
import { Button } from '@/src/components/ui/Button';
import { Briefcase, Users, Globe, Zap, CheckCircle2, ArrowRight, Star, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-surface flex flex-col hero-pattern">
      {/* Navbar */}
      <header className="bg-surface/80 backdrop-blur-md sticky top-0 z-50 border-b border-outline">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-on-primary" />
            </div>
            <span className="font-bold text-xl tracking-tight">InternPortal</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-on-surface-variant">
            <a href="#" className="hover:text-primary transition-colors">For Students</a>
            <a href="#" className="hover:text-primary transition-colors">For Employers</a>
            <a href="#" className="hover:text-primary transition-colors">Success Stories</a>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" className="hidden sm:flex" onClick={() => navigate('/login')}>Log In</Button>
            <Button onClick={() => navigate('/onboarding')}>Sign Up</Button>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="px-6 py-20 md:py-32 max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-8">
              <Star className="w-3.5 h-3.5 fill-primary" />
              Empowering the next generation of talent
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-on-surface mb-8 tracking-tight">
              Bridge the gap between <br />
              <span className="text-primary">Learning</span> and <span className="text-accent">Career</span>
            </h1>
            <p className="text-lg text-on-surface-variant mb-12 leading-relaxed max-w-2xl mx-auto">
              The premium internship platform connecting world-class students with industry-leading companies. AI-powered matching for maximum impact.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="xl" onClick={() => navigate('/onboarding')} className="px-10">
                I'm a Student
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="xl" variant="outline" className="px-10">
                I'm an Employer
                <Briefcase className="w-5 h-5 ml-2" />
              </Button>
            </div>

            <div className="mt-16 flex flex-wrap justify-center items-center gap-10 opacity-40 grayscale contrast-125">
               <span className="font-bold text-2xl tracking-tighter">GOOGLE</span>
               <span className="font-bold text-2xl tracking-tighter">STRIPE</span>
               <span className="font-bold text-2xl tracking-tighter">ADOBE</span>
               <span className="font-bold text-2xl tracking-tighter">META</span>
            </div>
          </motion.div>
        </section>

        {/* Dual Audience Section */}
        <section className="px-6 py-24 bg-surface-container/50">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-surface-container border border-outline p-10 rounded-3xl"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-8">
                <Users className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-on-surface">For Students</h3>
              <p className="text-on-surface-variant mb-8 leading-relaxed">
                Unlock exclusive opportunities at top-tier companies. Get personalized recommendations and track your applications in real-time.
              </p>
              <ul className="space-y-4 mb-10">
                {['Verified Listings', 'AI Resume Optimization', 'Direct Messaging'].map(item => (
                  <li key={item} className="flex items-center gap-3 text-sm font-medium">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="w-full">Explore Opportunities</Button>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-surface-container border border-outline p-10 rounded-3xl"
            >
              <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mb-8">
                <Globe className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-on-surface">For Recruiters</h3>
              <p className="text-on-surface-variant mb-8 leading-relaxed">
                Find the perfect talent for your team. Our platform filters through thousands of candidates to surface the most qualified individuals.
              </p>
              <ul className="space-y-4 mb-10">
                {['Curated Applicant Pool', 'Advanced Analytics', 'Employer Branding'].map(item => (
                  <li key={item} className="flex items-center gap-3 text-sm font-medium">
                    <ShieldCheck className="w-5 h-5 text-accent" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="w-full">Post an Internship</Button>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="px-6 py-20">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-around gap-12 text-center">
             <div>
                <p className="text-4xl font-bold text-primary mb-2">50k+</p>
                <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Active Students</p>
             </div>
             <div>
                <p className="text-4xl font-bold text-accent mb-2">2k+</p>
                <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Top Companies</p>
             </div>
             <div>
                <p className="text-4xl font-bold text-green-500 mb-2">94%</p>
                <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Success Rate</p>
             </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 py-24">
           <div className="max-w-5xl mx-auto bg-primary rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-32 -translate-y-32"></div>
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent/20 rounded-full translate-x-32 translate-y-32"></div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-on-primary mb-8 relative z-10">Ready to start your journey?</h2>
              <p className="text-on-primary/80 mb-12 text-lg relative z-10 max-w-2xl mx-auto">Join thousands of students and companies already using InternPortal.</p>
              <div className="flex flex-col sm:flex-row justify-center gap-6 relative z-10">
                 <Button size="lg" className="bg-surface text-on-surface hover:bg-surface/90 px-12">Get Started Now</Button>
                 <Button size="lg" variant="ghost" className="text-on-primary border border-white/20 hover:bg-white/10 px-12">Contact Sales</Button>
              </div>
           </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container border-t border-outline py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-on-primary" />
              </div>
              <span className="font-bold text-lg">InternPortal</span>
            </div>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Leading the way in modern career development for the digital age.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-6">Platform</h4>
            <ul className="space-y-4 text-sm text-on-surface-variant">
              <li><a href="#" className="hover:text-primary">Internships</a></li>
              <li><a href="#" className="hover:text-primary">Companies</a></li>
              <li><a href="#" className="hover:text-primary">Resources</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-on-surface-variant">
              <li><a href="#" className="hover:text-primary">About Us</a></li>
              <li><a href="#" className="hover:text-primary">Careers</a></li>
              <li><a href="#" className="hover:text-primary">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-6">Social</h4>
            <div className="flex gap-4">
               <div className="w-10 h-10 border border-outline rounded-xl flex items-center justify-center hover:border-primary cursor-pointer transition-colors">
                  <Zap className="w-4 h-4" />
               </div>
               <div className="w-10 h-10 border border-outline rounded-xl flex items-center justify-center hover:border-primary cursor-pointer transition-colors">
                  <Globe className="w-4 h-4" />
               </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-12 mt-12 border-t border-outline flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-on-surface-variant font-medium">
           <p>© 2024 INTERNPORTAL INC. ALL RIGHTS RESERVED.</p>
           <div className="flex gap-8">
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
           </div>
        </div>
      </footer>
    </div>
  );
}
