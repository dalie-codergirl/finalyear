'use client';
import { XMarkIcon } from '@heroicons/react/24/solid';

interface Attachment {
  name: string;
  url: string;
  type: string;
}

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
    status: string;
    attachments: Attachment[];
  };
  onClose: () => void;
}

export default function ActivityDetails({ activity, onClose }: ActivityDetailsProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl mx-4">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold">{activity.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-gray-600">{activity.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-gray-700">Start Date</h4>
              <p>{activity.startDate}</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-700">End Date</h4>
              <p>{activity.endDate}</p>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-700 mb-2">Progress</h4>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-sky-600 h-2 rounded-full" 
                style={{ width: `${activity.progress}%` }}
              ></div>
            </div>
            <p className="text-right text-sm text-gray-600 mt-1">{activity.progress}%</p>
          </div>

          <div>
            <h4 className="font-medium text-gray-700 mb-2">Budget</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm text-gray-600">Total</p>
                <p className="text-lg font-semibold">${activity.budget.total.toLocaleString()}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm text-gray-600">Used</p>
                <p className="text-lg font-semibold">${activity.budget.used.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {activity.attachments.length > 0 && (
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Attachments</h4>
              <div className="space-y-2">
                {activity.attachments.map((attachment, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded"
                  >
                    <span className="text-sm">{attachment.name}</span>
                    <a
                      href={attachment.url}
                      download
                      className="text-sky-600 hover:text-sky-800 text-sm font-medium"
                    >
                      Download
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end p-6 border-t bg-gray-50 rounded-b-lg">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
} 