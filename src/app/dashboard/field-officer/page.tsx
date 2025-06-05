import { useState } from 'react';
import { 
  HomeIcon, 
  CogIcon, 
  UserCircleIcon, 
  DocumentTextIcon,
  ChartBarIcon,
  BellIcon,
  ClockIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';
import dynamic from 'next/dynamic';

// Dynamically import Chart.js components to avoid SSR issues
const Chart = dynamic(() => import('react-chartjs-2').then(mod => mod.Line), { ssr: false });
const DoughnutChart = dynamic(() => import('react-chartjs-2').then(mod => mod.Doughnut), { ssr: false });

export default function FieldOfficerDashboard() {
  const [theme, setTheme] = useState('light');
  const [activeTab, setActiveTab] = useState('home');
  
  return (
    <div className={`min-h-screen flex ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50'}`}>
      {/* Sidebar */}
      <div className="w-64 bg-sky-700 text-white p-4">
        <div className="mb-8">
          <h2 className="text-xl font-bold">Field Officer Portal</h2>
        </div>
        
        <nav className="space-y-2">
          <button 
            onClick={() => setActiveTab('home')}
            className={`flex items-center space-x-2 w-full p-2 rounded ${activeTab === 'home' ? 'bg-sky-800' : 'hover:bg-sky-600'}`}
          >
            <HomeIcon className="w-5 h-5" />
            <span>Home</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('reports')}
            className={`flex items-center space-x-2 w-full p-2 rounded ${activeTab === 'reports' ? 'bg-sky-800' : 'hover:bg-sky-600'}`}
          >
            <DocumentTextIcon className="w-5 h-5" />
            <span>Reports</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center space-x-2 w-full p-2 rounded ${activeTab === 'analytics' ? 'bg-sky-800' : 'hover:bg-sky-600'}`}
          >
            <ChartBarIcon className="w-5 h-5" />
            <span>Analytics</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('settings')}
            className={`flex items-center space-x-2 w-full p-2 rounded ${activeTab === 'settings' ? 'bg-sky-800' : 'hover:bg-sky-600'}`}
          >
            <CogIcon className="w-5 h-5" />
            <span>Settings</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('profile')}
            className={`flex items-center space-x-2 w-full p-2 rounded ${activeTab === 'profile' ? 'bg-sky-800' : 'hover:bg-sky-600'}`}
          >
            <UserCircleIcon className="w-5 h-5" />
            <span>Profile</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-200">
              <BellIcon className="w-6 h-6" />
            </button>
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
          <h2 className="text-xl font-bold mb-4">Submit Activity Report</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Activity Title</label>
              <input 
                type="text" 
                className="w-full p-2 border rounded focus:ring-2 focus:ring-sky-500"
                placeholder="Enter activity title"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Project</label>
              <select className="w-full p-2 border rounded focus:ring-2 focus:ring-sky-500">
                <option>Select project</option>
                <option>Project A</option>
                <option>Project B</option>
                <option>Project C</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea 
                className="w-full p-2 border rounded focus:ring-2 focus:ring-sky-500"
                rows={4}
                placeholder="Enter activity description"
              ></textarea>
            </div>
            
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
            <div className="flex items-start space-x-4">
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
            
            {/* Add more timeline items here */}
          </div>
        </div>

        {/* Analytics Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Activity Progress</h3>
            {/* Chart.js implementation will go here */}
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Budget Utilization</h3>
            {/* Chart.js implementation will go here */}
          </div>
        </div>
      </div>
    </div>
  );
} 