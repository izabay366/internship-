import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import OnboardingLayout from './pages/onboarding/OnboardingLayout';
import Step1About from './pages/onboarding/Step1About';
import Step2Upload from './pages/onboarding/Step2Upload';
import Step3Interests from './pages/onboarding/Step3Interests';
import Dashboard from './pages/Dashboard';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/onboarding" element={<OnboardingLayout />}>
          <Route index element={<Navigate to="/onboarding/step-1" replace />} />
          <Route path="step-1" element={<Step1About />} />
          <Route path="step-2" element={<Step2Upload />} />
          <Route path="step-3" element={<Step3Interests />} />
        </Route>
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}
