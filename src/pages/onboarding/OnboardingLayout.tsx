import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/src/components/ui/Button';
import { ArrowLeft, HelpCircle, Briefcase } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function OnboardingLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const steps = [
    { path: '/onboarding/step-1', label: 'Personal Info', step: 1 },
    { path: '/onboarding/step-2', label: 'CV Upload', step: 2 },
    { path: '/onboarding/step-3', label: 'Interests', step: 3 },
  ];
  
  const currentStepIndex = steps.findIndex(step => step.path === location.pathname);
  const currentStep = steps[currentStepIndex] || steps[0];
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen flex flex-col bg-surface overflow-x-hidden">
      {/* Header */}
      <header className="bg-surface/80 backdrop-blur-md fixed top-0 left-0 w-full z-50 border-b border-outline">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div 
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => navigate('/')}
            >
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-on-primary" />
              </div>
              <span className="font-bold text-lg hidden sm:block">InternPortal</span>
            </div>
            <div className="h-6 w-[1px] bg-outline mx-2"></div>
            <h1 className="text-sm font-semibold text-on-surface-variant">Step {currentStep.step}: {currentStep.label}</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button variant="ghost" size="sm" className="hidden sm:flex">
              <HelpCircle className="w-4 h-4 mr-2" />
              Support
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow pt-32 pb-32 px-4 max-w-xl mx-auto w-full flex flex-col">
        {/* Progress System */}
        <div className="mb-12">
           <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">Onboarding Progress</span>
              <span className="text-xs font-bold text-on-surface-variant">{Math.round(progress)}%</span>
           </div>
           <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden border border-outline">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-primary rounded-full shadow-[0_0_10px_rgba(6,182,212,0.5)]" 
              />
           </div>
        </div>

        {/* Dynamic Step Content */}
        <div className="flex-grow bg-surface-container border border-outline rounded-3xl p-8 md:p-12 shadow-xl">
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

      {/* Background Decor */}
      <div className="fixed top-1/2 left-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full -z-10 pointer-events-none" />
      <div className="fixed bottom-0 right-[-10%] w-[30%] h-[30%] bg-accent/5 blur-[100px] rounded-full -z-10 pointer-events-none" />
    </div>
  );
}
