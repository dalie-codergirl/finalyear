'use client';
import { useState, useEffect } from 'react';
import { CalendarDaysIcon, PlusIcon, ArrowLeftIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';

interface Activity {
  id: string;
  projectId: string;
  title: string;
  description: string;
  targetedOutcome: string;
  startDate: string;
  endDate: string;
  budget: number;
  assignedTo: string;
  status: 'pending' | 'in-progress' | 'completed';
}

interface Project {
  id: string;
  name: string;
}

interface FieldOfficer {
  id: string;
  name: string;
}

export default function ActivitiesPage() {
  const router = useRouter();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [fieldOfficers, setFieldOfficers] = useState<FieldOfficer[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState('');
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    targetedOutcome: '',
    startDate: '',
    endDate: '',
    budget: 0,
    assignedTo: ''
  });

  useEffect(() => {
    // TODO: Fetch actual data from your backend
    // For now using dummy data
    setProjects([
      { id: '1', name: 'Project A' },
      { id: '2', name: 'Project B' },
      { id: '3', name: 'Project C' }
    ]);

    setFieldOfficers([
      { id: '1', name: 'John Smith' },
      { id: '2', name: 'Jane Doe' },
      { id: '3', name: 'Mike Johnson' }
    ]);

    setActivities([
      {
        id: '1',
        projectId: '1',
        title: 'Initial Survey',
        description: 'Conduct initial survey of the project area',
        targetedOutcome: 'Complete survey report with findings',
        startDate: '2024-03-20',
        endDate: '2024-03-25',
        budget: 5000,
        assignedTo: '1',
        status: 'pending'
      }
    ]);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newActivity = {
      id: editingActivity?.id || Date.now().toString(),
      projectId: selectedProject,
      ...formData,
      status: 'pending' as const
    };

    if (editingActivity) {
      setActivities(activities.map(activity => 
        activity.id === editingActivity.id ? newActivity : activity
      ));
    } else {
      setActivities([...activities, newActivity]);
      // TODO: Implement notification system to alert field officer
      console.log('Notification sent to field officer:', formData.assignedTo);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      targetedOutcome: '',
      startDate: '',
      endDate: '',
      budget: 0,
      assignedTo: ''
    });
    setEditingActivity(null);
    setShowForm(false);
  };

  const handleEdit = (activity: Activity) => {
    setEditingActivity(activity);
    setSelectedProject(activity.projectId);
    setFormData({
      title: activity.title,
      description: activity.description,
      targetedOutcome: activity.targetedOutcome,
      startDate: activity.startDate,
      endDate: activity.endDate,
      budget: activity.budget,
      assignedTo: activity.assignedTo
    });
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.back()}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ArrowLeftIcon className="w-6 h-6 text-gray-600" />
              </button>
              <h1 className="text-2xl font-bold">Project Activities</h1>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700 flex items-center gap-2"
            >
              <PlusIcon className="w-5 h-5" />
              New Activity
            </button>
          </div>
        </div>

        {showForm && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">
              {editingActivity ? 'Edit Activity' : 'Create New Activity'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Project</label>
                  <select
                    value={selectedProject}
                    onChange={(e) => setSelectedProject(e.target.value)}
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-sky-500"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-sky-500"
                    rows={3}
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Targeted Outcome
                  </label>
                  <textarea
                    value={formData.targetedOutcome}
                    onChange={(e) => setFormData({ ...formData, targetedOutcome: e.target.value })}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-sky-500"
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-sky-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-sky-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Budget</label>
                  <input
                    type="number"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: parseFloat(e.target.value) })}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-sky-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Assign To</label>
                  <select
                    value={formData.assignedTo}
                    onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-sky-500"
                    required
                  >
                    <option value="">Select Field Officer</option>
                    {fieldOfficers.map(officer => (
                      <option key={officer.id} value={officer.id}>
                        {officer.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 border rounded hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700"
                >
                  {editingActivity ? 'Update Activity' : 'Create Activity'}
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4">
            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="w-full md:w-auto p-2 border rounded focus:ring-2 focus:ring-sky-500"
            >
              <option value="">All Projects</option>
              {projects.map(project => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Activity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Timeline
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Budget
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Assigned To
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {activities
                  .filter(activity => !selectedProject || activity.projectId === selectedProject)
                  .map(activity => (
                    <tr key={activity.id}>
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{activity.title}</div>
                        <div className="text-sm text-gray-500">{activity.description}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {activity.startDate} to {activity.endDate}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          ${activity.budget.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {fieldOfficers.find(o => o.id === activity.assignedTo)?.name}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                          ${activity.status === 'completed' ? 'bg-green-100 text-green-800' :
                            activity.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'}`}>
                          {activity.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleEdit(activity)}
                          className="text-sky-600 hover:text-sky-900"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
} 