import { useState, useEffect } from 'react';
import { Button } from '@/src/components/ui/Button';
import { Card } from '@/src/components/ui/Card';
import { Search, Briefcase, Bookmark, Calendar, Filter, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import { useAuth } from '@/src/context/AuthContext';

export default function ApplicantDashboard() {
  const { token } = useAuth();
  const [jobs, setJobs] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [jobsRes, appsRes] = await Promise.all([
          fetch('http://localhost:3001/api/jobs'),
          fetch('http://localhost:3001/api/my-applications', {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);
        
        if (jobsRes.ok) setJobs(await jobsRes.json());
        if (appsRes.ok) setApplications(await appsRes.json());
      } catch (err) {
        console.error('Failed to fetch data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const handleApply = async (jobId: number) => {
    try {
      const res = await fetch('http://localhost:3001/api/applications', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ job_id: jobId }),
      });

      if (res.ok) {
        const newApp = await res.json();
        // Refresh applications list
        const appsRes = await fetch('http://localhost:3001/api/my-applications', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (appsRes.ok) setApplications(await appsRes.json());
        alert('Application submitted successfully!');
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to apply');
      }
    } catch (err) {
      console.error('Apply error:', err);
    }
  };

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-on-surface mb-2">Find your next opportunity</h1>
          <p className="text-on-surface-variant">Browse curated internships from top companies.</p>
        </div>
        <div className="flex gap-4">
          <div className="relative flex-grow md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
            <input 
              type="text" 
              placeholder="Search internships..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface-container border border-outline rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>
          <Button variant="outline" className="shrink-0">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Recommended for you</h2>
          </div>
          
          <div className="space-y-4">
            {isLoading ? (
              <p className="text-center text-on-surface-variant py-10">Loading opportunities...</p>
            ) : filteredJobs.length === 0 ? (
              <p className="text-center text-on-surface-variant py-10">No internships found matching your search.</p>
            ) : (
              filteredJobs.map((job) => {
                const hasApplied = applications.some(app => app.job_id === job.id);
                return (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Card className="p-6 hover:border-primary/40 transition-all group border-outline">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex gap-4">
                          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                            <Briefcase className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{job.title}</h3>
                            <p className="text-sm text-on-surface-variant">{job.company}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Bookmark className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="flex flex-wrap gap-3 mb-6">
                        <div className="flex items-center text-xs text-on-surface-variant bg-surface-bright px-3 py-1.5 rounded-lg">
                          <MapPin className="w-3 h-3 mr-1.5" />
                          {job.location}
                        </div>
                        <div className="flex items-center text-xs text-on-surface-variant bg-surface-bright px-3 py-1.5 rounded-lg">
                          <Calendar className="w-3 h-3 mr-1.5" />
                          {new Date(job.created_at).toLocaleDateString()}
                        </div>
                        {(job.tags || []).map((tag: string) => (
                          <span key={tag} className="text-xs text-primary bg-primary/5 px-3 py-1.5 rounded-lg font-medium border border-primary/10">
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-outline">
                        <span className="text-xs text-on-surface-variant uppercase tracking-wider font-medium">{job.type || 'INTERN'} ROLE</span>
                        <Button 
                          size="sm" 
                          onClick={() => handleApply(job.id)}
                          disabled={hasApplied}
                          variant={hasApplied ? 'outline' : 'primary'}
                        >
                          {hasApplied ? 'Applied' : 'Apply Now'}
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                );
              })
            )}
          </div>
        </div>

        <div className="space-y-8">
          <Card className="p-6 bg-accent/5 border-accent/20">
            <h3 className="text-lg font-semibold mb-4 text-accent">Your Applications</h3>
            <div className="space-y-4">
              {applications.length === 0 ? (
                <p className="text-xs text-on-surface-variant italic">No applications yet.</p>
              ) : (
                applications.map(app => (
                  <div key={app.id} className="p-4 bg-surface rounded-xl border border-outline">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">{app.title}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                        app.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-green-500/10 text-green-500'
                      }`}>
                        {app.status}
                      </span>
                    </div>
                    <p className="text-[10px] text-on-surface-variant mb-2">{app.company}</p>
                    <div className="w-full bg-surface-bright h-1 rounded-full overflow-hidden">
                      <div className={`h-full ${app.status === 'pending' ? 'bg-yellow-500 w-1/2' : 'bg-green-500 w-full'}`}></div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>

          <Card className="p-6 border-outline">
            <h3 className="text-lg font-semibold mb-4">Upcoming Deadlines</h3>
            <p className="text-xs text-on-surface-variant mb-4 italic">Real-time deadlines from our partners.</p>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="bg-red-500/10 text-red-500 text-[10px] font-bold px-2 py-1 rounded flex flex-col items-center justify-center h-10 w-10 shrink-0">
                  <span>MAY</span>
                  <span>20</span>
                </div>
                <div>
                  <p className="text-sm font-medium">Stripe Backend Internship</p>
                  <p className="text-[10px] text-on-surface-variant uppercase tracking-wider">3 days remaining</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
