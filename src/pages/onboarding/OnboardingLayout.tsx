import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/src/components/ui/Button';
import { ArrowLeft, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function OnboardingLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const steps = [
    { path: '/onboarding/step-1', label: 'Step 1 of 3', title: 'Personal Info' },
    { path: '/onboarding/step-2', label: 'Step 2 of 3', title: 'CV Upload' },
    { path: '/onboarding/step-3', label: 'Step 3 of 3', title: 'Interests' },
  ];
  
  const currentStepIndex = steps.findIndex(step => step.path === location.pathname);
  const currentStep = steps[currentStepIndex] || steps[0];
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen flex flex-col bg-surface overflow-x-hidden">
      {/* Header */}
      <header className="bg-surface/80 backdrop-blur-md fixed top-0 left-0 w-full z-50 border-b border-premium">
        <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Button 
                variant="ghost" 
                size="sm" 
                className="w-10 h-10 p-0"
                onClick={() => navigate(-1)}
            >
              <ArrowLeft className="w-5 h-5 text-accent opacity-60" />
            </Button>
            <h1 className="serif text-2xl text-accent tracking-widest uppercase font-light italic">{currentStep.label}</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="text-accent opacity-60 font-medium text-[10px] uppercase tracking-[0.3em] px-4">Skip</Button>
            <div className="h-8 w-[1px] bg-premium hidden md:block"></div>
            <Button 
                variant="ghost" 
                size="sm" 
                className="w-10 h-10 p-0"
            >
              <HelpCircle className="w-5 h-5 text-accent opacity-60" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow pt-24 pb-32 px-4 max-w-lg mx-auto w-full flex flex-col">
        {/* Progress System */}
        <div className="mb-10">
           <div className="flex justify-between items-center mb-3">
              <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-primary">Onboarding Progress</span>
              <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-on-surface-variant">{Math.round(progress)}% Complete</span>
           </div>
           <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-primary rounded-full" 
              />
           </div>
        </div>

        {/* Dynamic Step Content */}
        <div className="flex-grow">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Animated Blooms for Background Depth */}
      <div className="fixed top-1/2 left-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full -z-10 pointer-events-none" />
      <div className="fixed bottom-0 right-[-10%] w-[30%] h-[30%] bg-success/5 blur-[100px] rounded-full -z-10 pointer-events-none" />
    </div>
  );
}
