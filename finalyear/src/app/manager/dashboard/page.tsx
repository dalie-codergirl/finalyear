'use client';
import { useState, useEffect } from 'react';
import { 
  HomeIcon, 
  CogIcon, 
  UserGroupIcon, 
  DocumentTextIcon,
  BanknotesIcon,
  BellIcon,
  Bars3Icon,
  XMarkIcon,
  ClipboardDocumentListIcon,
  UserCircleIcon,
  CalendarDaysIcon,
  PlusIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/solid';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import NotificationSystem from '../components/NotificationSystem';
import { getDashboardStats, getProjects, getProjectProgress, getBudgetOverview } from '@/services/api';
import { DashboardStats, Project, ProjectProgress, BudgetData } from '@/services/api';
import { toast } from 'react-hot-toast';

// Import Chart.js components
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// Dynamically import Chart.js components to avoid SSR issues
const Chart = dynamic(() => import('react-chartjs-2').then(mod => mod.Line), { ssr: false });
const DoughnutChart = dynamic(() => import('react-chartjs-2').then(mod => mod.Doughnut), { ssr: false });

export default function ManagerDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedProject, setSelectedProject] = useState('');
  const [showLessonsForm, setShowLessonsForm] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // State for dashboard data
  const [stats, setStats] = useState<DashboardStats>({
    activeProjects: 0,
    pendingReports: 0,
    fieldOfficers: 0
  });
  
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectProgress, setProjectProgress] = useState<ProjectProgress>({
    labels: [],
    data: []
  });
  const [budgetData, setBudgetData] = useState<BudgetData>({
    used: 0,
    remaining: 0
  });

  const [lessonsForm, setLessonsForm] = useState({
    project: '',
    lessons: '',
    recommendations: '',
    date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        // Fetch all data in parallel
        const [statsRes, projectsRes, progressRes, budgetRes] = await Promise.all([
          getDashboardStats(),
          getProjects(),
          getProjectProgress(),
          getBudgetOverview()
        ]);

        setStats(statsRes.data);
        setProjects(projectsRes.data);
        setProjectProgress(progressRes.data);
        setBudgetData(budgetRes.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        toast.error('Failed to load dashboard data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Fetch project-specific data when a project is selected
  useEffect(() => {
    if (selectedProject) {
      const fetchProjectData = async () => {
        try {
          const [progressRes, budgetRes] = await Promise.all([
            getProjectProgress(selectedProject),
            getBudgetOverview(selectedProject)
          ]);

          setProjectProgress(progressRes.data);
          setBudgetData(budgetRes.data);
        } catch (error) {
          console.error('Error fetching project data:', error);
          toast.error('Failed to load project data');
        }
      };

      fetchProjectData();
    }
  }, [selectedProject]);

  const handleTabClick = (tab: string) => {
    switch (tab) {
      case 'reports':
        router.push('/manager/reports');
        break;
      case 'budget':
        router.push('/manager/budget');
        break;
      case 'team':
        router.push('/manager/team');
        break;
      case 'projects':
        router.push('/manager/projects');
        break;
      case 'settings':
        router.push('/manager/settings');
        break;
      case 'profile':
        router.push('/manager/profile');
        break;
      case 'activities':
        router.push('/manager/activities');
        break;
      default:
        setActiveTab(tab);
    }
  };

  const handleLessonsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.submitProjectInsight(lessonsForm);
      setShowLessonsForm(false);
      toast.success('Project insight saved successfully');
    } catch (error) {
      console.error('Error submitting lessons:', error);
      toast.error('Failed to save project insight');
    }
  };

  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = async () => {
    try {
      await api.logout();
      router.push('/login');
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error('Failed to logout');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-sky-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar Toggle Button for Mobile */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-sky-600 text-white"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <div 
        className={`fixed lg:static w-64 h-full min-h-screen bg-sky-700 text-white transition-transform duration-300 ease-in-out transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } z-40`}
        style={{ height: '100vh', position: 'fixed', overflowY: 'auto' }}
      >
        <div className="w-full p-4">
          <div className="mb-8">
            <h2 className="text-xl font-bold">Manager Portal</h2>
          </div>
          
          <nav className="space-y-2">
            <button 
              onClick={() => handleTabClick('home')}
              className={`flex items-center space-x-2 w-full p-2 rounded ${activeTab === 'home' ? 'bg-sky-800' : 'hover:bg-sky-600'}`}
            >
              <HomeIcon className="w-5 h-5" />
              <span>Dashboard</span>
            </button>
            
            <button 
              onClick={() => handleTabClick('profile')}
              className={`flex items-center space-x-2 w-full p-2 rounded ${activeTab === 'profile' ? 'bg-sky-800' : 'hover:bg-sky-600'}`}
            >
              <UserCircleIcon className="w-5 h-5" />
              <span>Profile</span>
            </button>

            <button 
              onClick={() => handleTabClick('activities')}
              className={`flex items-center space-x-2 w-full p-2 rounded ${activeTab === 'activities' ? 'bg-sky-800' : 'hover:bg-sky-600'}`}
            >
              <CalendarDaysIcon className="w-5 h-5" />
              <span>Activities</span>
            </button>
            
            <button 
              onClick={() => handleTabClick('reports')}
              className={`flex items-center space-x-2 w-full p-2 rounded ${activeTab === 'reports' ? 'bg-sky-800' : 'hover:bg-sky-600'}`}
            >
              <DocumentTextIcon className="w-5 h-5" />
              <span>Reports</span>
            </button>
            
            <button 
              onClick={() => handleTabClick('budget')}
              className={`flex items-center space-x-2 w-full p-2 rounded ${activeTab === 'budget' ? 'bg-sky-800' : 'hover:bg-sky-600'}`}
            >
              <BanknotesIcon className="w-5 h-5" />
              <span>Budget</span>
            </button>
            
            <button 
              onClick={() => handleTabClick('team')}
              className={`flex items-center space-x-2 w-full p-2 rounded ${activeTab === 'team' ? 'bg-sky-800' : 'hover:bg-sky-600'}`}
            >
              <UserGroupIcon className="w-5 h-5" />
              <span>View Team</span>
            </button>

            <button 
              onClick={() => handleTabClick('projects')}
              className={`flex items-center space-x-2 w-full p-2 rounded ${activeTab === 'projects' ? 'bg-sky-800' : 'hover:bg-sky-600'}`}
            >
              <ClipboardDocumentListIcon className="w-5 h-5" />
              <span>Projects</span>
            </button>
            
            <button 
              onClick={() => handleTabClick('settings')}
              className={`flex items-center space-x-2 w-full p-2 rounded ${activeTab === 'settings' ? 'bg-sky-800' : 'hover:bg-sky-600'}`}
            >
              <CogIcon className="w-5 h-5" />
              <span>Settings</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 p-8 ${isSidebarOpen ? 'lg:ml-64' : ''}`}>
        {/* Header with Greeting and Notifications */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Welcome, Manager!</h1>
              <p className="text-gray-600 mt-1">Have a productive day</p>
            </div>
            <div className="flex items-center space-x-4">
              <NotificationSystem />
              <button
                onClick={handleLogout}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors flex items-center gap-2 text-gray-600 hover:text-gray-900"
                title="Logout"
              >
                <ArrowRightOnRectangleIcon className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Logout Confirmation Dialog */}
        {showLogoutConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
              <h2 className="text-xl font-bold mb-4">Confirm Logout</h2>
              <p className="text-gray-600 mb-6">Are you sure you want to logout?</p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="px-4 py-2 border rounded hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmLogout}
                  className="px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Active Projects</h3>
              <div className="p-2 bg-sky-100 rounded-lg">
                <ClipboardDocumentListIcon className="w-6 h-6 text-sky-600" />
              </div>
            </div>
            <div className="text-3xl font-bold text-sky-600">{stats.activeProjects}</div>
            <p className="text-gray-600 text-sm mt-2">Currently in progress</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Pending Reports</h3>
              <div className="p-2 bg-yellow-100 rounded-lg">
                <DocumentTextIcon className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
            <div className="text-3xl font-bold text-yellow-600">{stats.pendingReports}</div>
            <p className="text-gray-600 text-sm mt-2">Awaiting review</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Field Officers</h3>
              <div className="p-2 bg-green-100 rounded-lg">
                <UserGroupIcon className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="text-3xl font-bold text-green-600">{stats.fieldOfficers}</div>
            <p className="text-gray-600 text-sm mt-2">Active team members</p>
          </div>
        </div>

        {/* Project Analysis Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Project Analysis</h2>
              <select
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                className="p-2 border rounded-md focus:ring-2 focus:ring-sky-500 text-sm"
              >
                <option value="">All Projects</option>
                {projects.map(project => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="h-64">
              <Chart 
                data={{
                  labels: projectProgress.labels,
                  datasets: [{
                    label: 'Project Progress',
                    data: projectProgress.data,
                    borderColor: 'rgb(14, 165, 233)',
                    tension: 0.4
                  }]
                }}
                options={{
                  responsive: true,
                  scales: {
                    y: {
                      beginAtZero: true,
                      max: 100
                    }
                  }
                }}
              />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Budget Utilization</h2>
            <div className="h-64">
              <DoughnutChart 
                data={{
                  labels: ['Used', 'Remaining'],
                  datasets: [{
                    data: [budgetData.used, budgetData.remaining],
                    backgroundColor: ['rgb(14, 165, 233)', 'rgb(226, 232, 240)']
                  }]
                }}
                options={{ cutout: '70%' }}
              />
            </div>
          </div>
        </div>

        {/* Lessons Learned Section */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Project Insights</h2>
            <button
              onClick={() => setShowLessonsForm(true)}
              className="px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 transition-colors flex items-center gap-2"
            >
              <PlusIcon className="w-5 h-5" />
              Add New Entry
            </button>
          </div>

          {showLessonsForm && (
            <form onSubmit={handleLessonsSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Project</label>
                <select
                  value={lessonsForm.project}
                  onChange={(e) => setLessonsForm({ ...lessonsForm, project: e.target.value })}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-sky-500"
                  required
                >
                  <option value="">Select Project</option>
                  {projects.map(project => (
                    <option key={project.id} value={project.id}>
                      {project.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Lessons Learned</label>
                <textarea
                  value={lessonsForm.lessons}
                  onChange={(e) => setLessonsForm({ ...lessonsForm, lessons: e.target.value })}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-sky-500"
                  rows={4}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Recommendations</label>
                <textarea
                  value={lessonsForm.recommendations}
                  onChange={(e) => setLessonsForm({ ...lessonsForm, recommendations: e.target.value })}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-sky-500"
                  rows={4}
                  required
                />
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowLessonsForm(false)}
                  className="px-4 py-2 border rounded hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700"
                >
                  Save Insights
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
} 