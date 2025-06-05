'use client';
import { useState } from 'react';
import BackButton from '../components/BackButton';
import { UserCircleIcon, CheckCircleIcon, XCircleIcon, ClockIcon } from '@heroicons/react/24/solid';

interface Report {
  id: string;
  title: string;
  officerName: string;
  location: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
  type: string;
}

export default function ReportsPage() {
  const [filter, setFilter] = useState('all');
  const [reports, setReports] = useState<Report[]>([
    {
      id: '1',
      title: 'Field Visit Report - Project A',
      officerName: 'John Doe',
      location: 'Site A',
      date: '2024-02-20',
      status: 'pending',
      type: 'Field Visit'
    },
    {
      id: '2',
      title: 'Weekly Progress Report - Project B',
      officerName: 'Jane Smith',
      location: 'Site B',
      date: '2024-02-19',
      status: 'approved',
      type: 'Progress Report'
    },
    {
      id: '3',
      title: 'Incident Report - Project C',
      officerName: 'Mike Johnson',
      location: 'Site C',
      date: '2024-02-18',
      status: 'rejected',
      type: 'Incident Report'
    }
  ]);

  const handleStatusChange = (reportId: string, newStatus: 'approved' | 'rejected') => {
    setReports(reports.map(report => 
      report.id === reportId ? { ...report, status: newStatus } : report
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'text-green-600';
      case 'rejected':
        return 'text-red-600';
      default:
        return 'text-yellow-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircleIcon className="w-5 h-5 text-green-600" />;
      case 'rejected':
        return <XCircleIcon className="w-5 h-5 text-red-600" />;
      default:
        return <ClockIcon className="w-5 h-5 text-yellow-600" />;
    }
  };

  const filteredReports = filter === 'all' 
    ? reports 
    : reports.filter(report => report.status === filter);

  return (
    <div className="p-8">
      <div className="mb-8">
        <BackButton />
      </div>
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Reports Management</h1>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border rounded-md focus:ring-2 focus:ring-sky-500"
        >
          <option value="all">All Reports</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Officer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredReports.map((report) => (
              <tr key={report.id}>
                <td className="px-6 py-4">
                  <div>
                    <div className="font-medium text-gray-900">{report.title}</div>
                    <div className="text-sm text-gray-500">{report.type}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <UserCircleIcon className="w-8 h-8 text-gray-400 mr-2" />
                    <span>{report.officerName}</span>
                  </div>
                </td>
                <td className="px-6 py-4">{report.location}</td>
                <td className="px-6 py-4">{report.date}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    {getStatusIcon(report.status)}
                    <span className={`ml-2 ${getStatusColor(report.status)}`}>
                      {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {report.status === 'pending' && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleStatusChange(report.id, 'approved')}
                        className="text-green-600 hover:text-green-800"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleStatusChange(report.id, 'rejected')}
                        className="text-red-600 hover:text-red-800"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 