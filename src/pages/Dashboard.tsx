import { useState } from 'react';
import { Button } from '@/src/components/ui/Button';
import { User, Building2, Bell, Settings, LogOut } from 'lucide-react';
import ApplicantDashboard from './ApplicantDashboard';
import RecruiterDashboard from './RecruiterDashboard';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState<'applicant' | 'recruiter'>(user?.role || 'applicant');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-surface flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-surface-container border-r border-outline p-6 sticky top-0 h-screen">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-on-primary font-bold">I</span>
          </div>
          <span className="font-bold text-xl tracking-tight">Portal</span>
        </div>

        <nav className="flex-grow space-y-2">
          <Button variant="ghost" className="w-full justify-start opacity-100 bg-surface-bright">
            <Settings className="w-4 h-4 mr-3" />
            Overview
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Bell className="w-4 h-4 mr-3" />
            Notifications
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <User className="w-4 h-4 mr-3" />
            Profile
          </Button>
        </nav>

        <div className="pt-6 border-t border-outline">
          <Button variant="ghost" onClick={handleLogout} className="w-full justify-start text-red-500 hover:text-red-500 hover:bg-red-500/5">
            <LogOut className="w-4 h-4 mr-3" />
            Sign Out
          </Button>
        </div>
      </aside>

      <div className="flex-grow flex flex-col">
        {/* Top Navbar */}
        <header className="h-20 bg-surface/80 backdrop-blur-md border-b border-outline sticky top-0 z-40 px-8 flex items-center justify-between">
          <div className="flex items-center gap-4 lg:hidden">
             <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-on-primary font-bold">I</span>
             </div>
          </div>

          <div className="flex items-center gap-2 bg-surface-container p-1 rounded-xl border border-outline">
            <button 
              onClick={() => setRole('applicant')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${role === 'applicant' ? 'bg-primary text-on-primary shadow-lg' : 'text-on-surface-variant hover:text-on-surface'}`}
            >
              <User className="w-3.5 h-3.5" />
              Applicant
            </button>
            <button 
              onClick={() => setRole('recruiter')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${role === 'recruiter' ? 'bg-accent text-white shadow-lg' : 'text-on-surface-variant hover:text-on-surface'}`}
            >
              <Building2 className="w-3.5 h-3.5" />
              Company
            </button>
          </div>

          <div className="flex items-center gap-4">
             <div className="hidden sm:block text-right">
                <p className="text-xs font-bold text-on-surface">{user?.name || 'User'}</p>
                <p className="text-[10px] text-on-surface-variant uppercase tracking-wider">{role === 'applicant' ? 'Student' : 'Talent Lead'}</p>
             </div>
             <div className="w-10 h-10 rounded-full bg-surface-container-highest border border-outline overflow-hidden">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || 'User'}`} alt="Avatar" />
             </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-8 md:p-12 max-w-7xl mx-auto w-full">
          {role === 'applicant' ? <ApplicantDashboard /> : <RecruiterDashboard />}
        </main>
      </div>
    </div>
  );
}
