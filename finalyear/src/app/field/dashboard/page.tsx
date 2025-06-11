'use client';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { ClockIcon } from '@heroicons/react/24/solid';
import NotificationSystem from '../components/NotificationSystem';
import ActivityDetails from '../components/ActivityDetails';
import { getDashboardStats, getProjects, getProjectProgress, getBudgetOverview } from '@/services/api';
import { DashboardStats, Project, ProjectProgress, BudgetData } from '@/services/api';
import { Toaster, toast } from 'react-hot-toast';
import React from 'react';

// Dynamically import Chart.js components to avoid SSR issues
const Chart = dynamic(() => import('react-chartjs-2').then(mod => mod.Line), { ssr: false });
const DoughnutChart = dynamic(() => import('react-chartjs-2').then(mod => mod.Doughnut), { ssr: false });

export default function FieldOfficerDashboard() {
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [formFields, setFormFields] = useState([
    { id: 'title', type: 'text', label: 'Activity Title', required: true },
    { id: 'project', type: 'select', label: 'Project', required: true },
    { id: 'description', type: 'textarea', label: 'Description', required: true },
  ]);
  const [showAddField, setShowAddField] = useState(false);
  const [newField, setNewField] = useState({ id: '', type: 'text', label: '', required: false });
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

  const handleAddField = () => {
    if (newField.id && newField.label) {
      setFormFields([...formFields, { ...newField, id: newField.id.toLowerCase().replace(/\s+/g, '_') }]);
      setNewField({ id: '', type: 'text', label: '', required: false });
      setShowAddField(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      
      <div className="space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">Active Projects</h3>
              <div className="p-2 bg-sky-100 rounded-lg">
                <svg className="w-6 h-6 text-sky-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <div className="text-3xl font-bold text-sky-600">{stats.activeProjects}</div>
              <p className="text-gray-600 text-sm mt-2">Currently in progress</p>
            </div>
            <div className="mt-4 h-1 bg-sky-100 rounded-full overflow-hidden">
              <div className="h-1 bg-sky-600 rounded-full" style={{ width: '70%' }}></div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">Pending Reports</h3>
              <div className="p-2 bg-yellow-100 rounded-lg">
                <svg className="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v7h-2l-1 2H8l-1-2H5V5z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <div className="text-3xl font-bold text-yellow-600">{stats.pendingReports}</div>
              <p className="text-gray-600 text-sm mt-2">Awaiting review</p>
            </div>
            <div className="mt-4 h-1 bg-yellow-100 rounded-full overflow-hidden">
              <div className="h-1 bg-yellow-600 rounded-full" style={{ width: '45%' }}></div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">Field Officers</h3>
              <div className="p-2 bg-green-100 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <div className="text-3xl font-bold text-green-600">{stats.fieldOfficers}</div>
              <p className="text-gray-600 text-sm mt-2">Active team members</p>
            </div>
            <div className="mt-4 h-1 bg-green-100 rounded-full overflow-hidden">
              <div className="h-1 bg-green-600 rounded-full" style={{ width: '85%' }}></div>
            </div>
          </div>
        </div>

        {/* Analytics Section */}
        <div id="analytics-section" className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Activity Progress</h3>
            <div className="h-64">
              <Chart 
                data={{
                  labels: projectProgress.labels,
                  datasets: [{
                    label: 'Progress',
                    data: projectProgress.data,
                    borderColor: 'rgb(14, 165, 233)',
                    backgroundColor: 'rgba(14, 165, 233, 0.1)',
                    tension: 0.4,
                    fill: true
                  }]
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      display: false
                    }
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      max: 100,
                      grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                      }
                    },
                    x: {
                      grid: {
                        display: false
                      }
                    }
                  }
                }}
              />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Budget Overview</h3>
            <div className="h-64">
              <DoughnutChart 
                data={{
                  labels: ['Used', 'Remaining'],
                  datasets: [{
                    data: [budgetData.used, budgetData.remaining],
                    backgroundColor: ['rgb(14, 165, 233)', 'rgb(226, 232, 240)'],
                    borderWidth: 0
                  }]
                }}
                options={{
                  cutout: '70%',
                  plugins: {
                    legend: {
                      position: 'bottom'
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>

        {/* Report Form */}
        <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-gray-800">Submit Activity Report</h2>
            <button
              onClick={() => setShowAddField(true)}
              className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
            >
              Add Field
            </button>
          </div>

          {showAddField && (
            <div className="mb-8 p-6 border border-gray-200 rounded-lg bg-gray-50">
              <h3 className="text-lg font-semibold mb-6 text-gray-800">Add New Field</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Field ID</label>
                  <input
                    type="text"
                    value={newField.id}
                    onChange={(e) => setNewField({ ...newField, id: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    placeholder="Enter field ID"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Field Label</label>
                  <input
                    type="text"
                    value={newField.label}
                    onChange={(e) => setNewField({ ...newField, label: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    placeholder="Enter field label"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Field Type</label>
                  <select
                    value={newField.type}
                    onChange={(e) => setNewField({ ...newField, type: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
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
                    className="w-4 h-4 text-sky-600 border-gray-300 rounded focus:ring-sky-500"
                  />
                  <label className="ml-2 text-sm text-gray-700">Required field</label>
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowAddField(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddField}
                    className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                  >
                    Add Field
                  </button>
                </div>
              </div>
            </div>
          )}

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            {formFields.map((field) => (
              <div key={field.id}>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                {field.type === 'textarea' ? (
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    rows={4}
                    required={field.required}
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                  />
                ) : field.type === 'select' ? (
                  <select 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    required={field.required}
                  >
                    <option value="">Select {field.label.toLowerCase()}</option>
                    {projects.map((project) => (
                      <option key={project.id} value={project.id}>
                        {project.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    required={field.required}
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                  />
                )}
              </div>
            ))}
            
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Attachments</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-sky-500 transition-colors">
                <input type="file" multiple className="hidden" id="file-upload" />
                <label 
                  htmlFor="file-upload"
                  className="cursor-pointer text-sky-600 hover:text-sky-800"
                >
                  <div className="space-y-2">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="text-sm text-gray-600">
                      <span className="font-medium text-sky-600 hover:text-sky-800">
                        Click to upload
                      </span>
                      {' '}or drag and drop
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, PDF up to 10MB
                    </p>
                  </div>
                </label>
              </div>
            </div>
            
            <button 
              type="submit"
              className="w-full py-3 px-4 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
            >
              Submit Report
            </button>
          </form>
        </div>
      </div>

      {/* Activity Details Modal */}
      {selectedActivity && (
        <ActivityDetails 
          activity={selectedActivity}
          onClose={() => setSelectedActivity(null)}
        />
      )}
    </>
  );
}