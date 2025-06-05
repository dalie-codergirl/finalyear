import { useState } from 'react';
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
import { Line, Doughnut } from 'react-chartjs-2';

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

interface ActivityDetailsProps {
  activity: {
    id: string;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    progress: number;
    budget: {
      total: number;
      used: number;
    };
    status: 'ongoing' | 'completed' | 'delayed';
    attachments: Array<{
      name: string;
      url: string;
      type: string;
    }>;
  };
  onClose: () => void;
}

export default function ActivityDetails({ activity, onClose }: ActivityDetailsProps) {
  const [activeTab, setActiveTab] = useState('overview');

  const progressData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Progress',
        data: [25, 45, 70, activity.progress],
        borderColor: 'rgb(14, 165, 233)',
        tension: 0.4,
      },
    ],
  };

  const budgetData = {
    labels: ['Used', 'Remaining'],
    datasets: [
      {
        data: [activity.budget.used, activity.budget.total - activity.budget.used],
        backgroundColor: ['rgb(14, 165, 233)', 'rgb(226, 232, 240)'],
      },
    ],
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold">{activity.title}</h2>
              <p className="text-gray-500">
                {new Date(activity.startDate).toLocaleDateString()} - {new Date(activity.endDate).toLocaleDateString()}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Tabs */}
          <div className="border-b mb-6">
            <nav className="flex space-x-4">
              <button
                onClick={() => setActiveTab('overview')}
                className={`pb-4 px-2 ${
                  activeTab === 'overview'
                    ? 'border-b-2 border-sky-600 text-sky-600'
                    : 'text-gray-500'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('progress')}
                className={`pb-4 px-2 ${
                  activeTab === 'progress'
                    ? 'border-b-2 border-sky-600 text-sky-600'
                    : 'text-gray-500'
                }`}
              >
                Progress
              </button>
              <button
                onClick={() => setActiveTab('attachments')}
                className={`pb-4 px-2 ${
                  activeTab === 'attachments'
                    ? 'border-b-2 border-sky-600 text-sky-600'
                    : 'text-gray-500'
                }`}
              >
                Attachments
              </button>
            </nav>
          </div>

          {/* Content */}
          <div>
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p className="text-gray-600">{activity.description}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Status</h3>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    activity.status === 'completed' ? 'bg-green-100 text-green-800' :
                    activity.status === 'delayed' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Budget Utilization</h3>
                  <div className="w-64">
                    <Doughnut data={budgetData} options={{ cutout: '70%' }} />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'progress' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Progress Timeline</h3>
                  <div className="h-64">
                    <Line data={progressData} options={{
                      responsive: true,
                      scales: {
                        y: {
                          beginAtZero: true,
                          max: 100,
                        },
                      },
                    }} />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Overall Progress</h3>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-sky-600 h-2.5 rounded-full"
                      style={{ width: `${activity.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{activity.progress}% Complete</p>
                </div>
              </div>
            )}

            {activeTab === 'attachments' && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Attachments</h3>
                <div className="space-y-2">
                  {activity.attachments.map((attachment, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span>{attachment.name}</span>
                      </div>
                      <a
                        href={attachment.url}
                        download
                        className="text-sky-600 hover:text-sky-800"
                      >
                        Download
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 