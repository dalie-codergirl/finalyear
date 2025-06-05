'use client';
import { useState, useEffect } from 'react';
import { 
  HomeIcon, 
  CogIcon, 
  UserCircleIcon, 
  DocumentTextIcon,
  ChartBarIcon,
  BellIcon,
  ClockIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/solid';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import NotificationSystem from '../components/NotificationSystem';
import ActivityDetails from '../components/ActivityDetails';
import React from 'react';

// Dynamically import Chart.js components to avoid SSR issues
const Chart = dynamic(() => import('react-chartjs-2').then(mod => mod.Line), { ssr: false });
const DoughnutChart = dynamic(() => import('react-chartjs-2').then(mod => mod.Doughnut), { ssr: false });

// Create a theme context
export const ThemeContext = React.createContext({
  theme: 'light',
  setTheme: (theme: string) => {}
});

export default function FieldOfficerDashboard() {
  const router = useRouter();
  const [theme, setTheme] = useState('light');
  const [activeTab, setActiveTab] = useState('home');
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [formFields, setFormFields] = useState([
    { id: 'title', type: 'text', label: 'Activity Title', required: true },
    { id: 'project', type: 'select', label: 'Project', required: true },
    { id: 'description', type: 'textarea', label: 'Description', required: true },
  ]);
  const [showAddField, setShowAddField] = useState(false);
  const [newField, setNewField] = useState({ id: '', type: 'text', label: '', required: false });

  // Effect to apply theme
  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }, [theme]);

  const handleAddField = () => {
    if (newField.id && newField.label) {
      setFormFields([...formFields, { ...newField, id: newField.id.toLowerCase().replace(/\s+/g, '_') }]);
      setNewField({ id: '', type: 'text', label: '', required: false });
      setShowAddField(false);
    }
  };

  const handleTabClick = (tab: string) => {
    switch (tab) {
      case 'reports':
        router.push('/field/reports');
        break;
      case 'settings':
        router.push('/field/settings');
        break;
      case 'profile':
        router.push('/field/profile');
        break;
      case 'analytics':
        const element = document.getElementById('analytics-section');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
        break;
      default:
        setActiveTab(tab);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={`min-h-screen flex ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50'}`}>
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
              <h2 className="text-xl font-bold">Field Officer Portal</h2>
            </div>
            
            <nav className="space-y-2">
              <button 
                onClick={() => handleTabClick('home')}
                className={`flex items-center space-x-2 w-full p-2 rounded ${activeTab === 'home' ? 'bg-sky-800' : 'hover:bg-sky-600'}`}
              >
                <HomeIcon className="w-5 h-5" />
                <span>Home</span>
              </button>
              
              <button 
                onClick={() => handleTabClick('reports')}
                className={`flex items-center space-x-2 w-full p-2 rounded ${activeTab === 'reports' ? 'bg-sky-800' : 'hover:bg-sky-600'}`}
              >
                <DocumentTextIcon className="w-5 h-5" />
                <span>Reports</span>
              </button>
              
              <button 
                onClick={() => handleTabClick('analytics')}
                className={`flex items-center space-x-2 w-full p-2 rounded ${activeTab === 'analytics' ? 'bg-sky-800' : 'hover:bg-sky-600'}`}
              >
                <ChartBarIcon className="w-5 h-5" />
                <span>Analytics</span>
              </button>
              
              <button 
                onClick={() => handleTabClick('settings')}
                className={`flex items-center space-x-2 w-full p-2 rounded ${activeTab === 'settings' ? 'bg-sky-800' : 'hover:bg-sky-600'}`}
              >
                <CogIcon className="w-5 h-5" />
                <span>Settings</span>
              </button>
              
              <button 
                onClick={() => handleTabClick('profile')}
                className={`flex items-center space-x-2 w-full p-2 rounded ${activeTab === 'profile' ? 'bg-sky-800' : 'hover:bg-sky-600'}`}
              >
                <UserCircleIcon className="w-5 h-5" />
                <span>Profile</span>
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className={`flex-1 p-8 ${isSidebarOpen ? 'lg:ml-64' : ''}`}>
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold">Welcome, John Doe!</h1>
              <p className="text-gray-600">Have a great day at work</p>
            </div>
            <div className="flex items-center space-x-4">
              <NotificationSystem />
              <div className="relative">
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  2
                </span>
                <button className="p-2 rounded-full hover:bg-gray-200">
                  <ClockIcon className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>

          {/* Activity Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Active Projects</h3>
              <div className="text-3xl font-bold text-sky-600">8</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Pending Reports</h3>
              <div className="text-3xl font-bold text-yellow-600">3</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Completed Activities</h3>
              <div className="text-3xl font-bold text-green-600">12</div>
            </div>
          </div>

          {/* Report Form */}
          <div className="bg-white p-6 rounded-lg shadow mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Submit Activity Report</h2>
              <button
                onClick={() => setShowAddField(true)}
                className="px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700"
              >
                Add Field
              </button>
            </div>

            {showAddField && (
              <div className="mb-6 p-4 border rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Add New Field</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Field ID</label>
                    <input
                      type="text"
                      value={newField.id}
                      onChange={(e) => setNewField({ ...newField, id: e.target.value })}
                      className="w-full p-2 border rounded"
                      placeholder="Enter field ID"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Field Label</label>
                    <input
                      type="text"
                      value={newField.label}
                      onChange={(e) => setNewField({ ...newField, label: e.target.value })}
                      className="w-full p-2 border rounded"
                      placeholder="Enter field label"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Field Type</label>
                    <select
                      value={newField.type}
                      onChange={(e) => setNewField({ ...newField, type: e.target.value })}
                      className="w-full p-2 border rounded"
                    >
                      <option value="text">Text</option>
                      <option value="textarea">Text Area</option>
                      <option value="select">Select</option>
                      <option value="date">Date</option>
                      <option value="number">Number</option>
                    </select>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={newField.required}
                      onChange={(e) => setNewField({ ...newField, required: e.target.checked })}
                      className="mr-2"
                    />
                    <label>Required field</label>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => setShowAddField(false)}
                      className="px-4 py-2 border rounded hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddField}
                      className="px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700"
                    >
                      Add Field
                    </button>
                  </div>
                </div>
              </div>
            )}

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              {formFields.map((field) => (
                <div key={field.id}>
                  <label className="block text-sm font-medium mb-1">
                    {field.label}
                    {field.required && <span className="text-red-500">*</span>}
                  </label>
                  {field.type === 'textarea' ? (
                    <textarea
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-sky-500"
                      rows={4}
                      required={field.required}
                    />
                  ) : field.type === 'select' ? (
                    <select className="w-full p-2 border rounded focus:ring-2 focus:ring-sky-500" required={field.required}>
                      <option value="">Select {field.label.toLowerCase()}</option>
                      <option>Project A</option>
                      <option>Project B</option>
                      <option>Project C</option>
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-sky-500"
                      required={field.required}
                    />
                  )}
                </div>
              ))}
              
              <div>
                <label className="block text-sm font-medium mb-1">Attachments</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <input type="file" multiple className="hidden" id="file-upload" />
                  <label 
                    htmlFor="file-upload"
                    className="cursor-pointer text-sky-600 hover:text-sky-800"
                  >
                    Click to upload or drag and drop files here
                  </label>
                </div>
              </div>
              
              <button 
                type="submit"
                className="bg-sky-600 text-white px-4 py-2 rounded hover:bg-sky-700"
              >
                Submit Report
              </button>
            </form>
          </div>

          {/* Activity Timeline */}
          <div className="bg-white p-6 rounded-lg shadow mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Activity Timeline</h2>
              <div className="flex space-x-2">
                <button className="p-2 text-sm border rounded hover:bg-gray-50">
                  Sort by Date
                </button>
                <button className="p-2 text-sm border rounded hover:bg-gray-50">
                  Sort by Project
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
              {/* Timeline Item */}
              <div 
                className="flex items-start space-x-4 cursor-pointer hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setSelectedActivity({
                  id: '1',
                  title: 'Field Visit - Project A',
                  description: 'Completed site inspection and collected data from local stakeholders.',
                  startDate: '2024-02-20',
                  endDate: '2024-02-21',
                  progress: 75,
                  budget: {
                    total: 10000,
                    used: 7500
                  },
                  status: 'ongoing',
                  attachments: [
                    {
                      name: 'Site Photos.zip',
                      url: '/attachments/photos.zip',
                      type: 'application/zip'
                    },
                    {
                      name: 'Inspection Report.pdf',
                      url: '/attachments/report.pdf',
                      type: 'application/pdf'
                    }
                  ]
                })}
              >
                <div className="flex-shrink-0">
                  <div className="w-4 h-4 rounded-full bg-sky-600"></div>
                </div>
                <div className="flex-1 bg-gray-50 p-4 rounded">
                  <div className="flex justify-between">
                    <h4 className="font-semibold">Field Visit - Project A</h4>
                    <span className="text-sm text-gray-500">2 hours ago</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Completed site inspection and collected data from local stakeholders.
                  </p>
                  <div className="mt-2">
                    <div className="text-sm text-gray-500 mb-1">Progress</div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-sky-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Analytics Section */}
          <div id="analytics-section" className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Activity Progress</h3>
              <div className="h-64">
                <Chart 
                  data={{
                    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                    datasets: [{
                      label: 'Progress',
                      data: [25, 45, 70, 85],
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
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Budget Utilization</h3>
              <div className="h-64">
                <DoughnutChart 
                  data={{
                    labels: ['Used', 'Remaining'],
                    datasets: [{
                      data: [7500, 2500],
                      backgroundColor: ['rgb(14, 165, 233)', 'rgb(226, 232, 240)']
                    }]
                  }}
                  options={{ cutout: '70%' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Activity Details Modal */}
        {selectedActivity && (
          <ActivityDetails 
            activity={selectedActivity}
            onClose={() => setSelectedActivity(null)}
          />
        )}
      </div>
    </ThemeContext.Provider>
  );
} 