'use client';
import { useState } from 'react';
import { 
  ClipboardDocumentListIcon, 
  CalendarIcon, 
  UserGroupIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/solid';
import BackButton from '../components/BackButton';

interface Project {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: 'ongoing' | 'completed' | 'delayed';
  progress: number;
  teamSize: number;
  budget: {
    total: number;
    used: number;
  };
}

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      name: 'Project A',
      description: 'Community development initiative in Northern Region',
      startDate: '2024-01-01',
      endDate: '2024-06-30',
      status: 'ongoing',
      progress: 65,
      teamSize: 4,
      budget: {
        total: 100000,
        used: 65000
      }
    },
    {
      id: '2',
      name: 'Project B',
      description: 'Infrastructure development in Southern Region',
      startDate: '2024-02-15',
      endDate: '2024-08-15',
      status: 'delayed',
      progress: 30,
      teamSize: 3,
      budget: {
        total: 80000,
        used: 70000
      }
    },
    {
      id: '3',
      name: 'Project C',
      description: 'Education program in Eastern Region',
      startDate: '2024-01-15',
      endDate: '2024-03-15',
      status: 'completed',
      progress: 100,
      teamSize: 2,
      budget: {
        total: 50000,
        used: 48000
      }
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600';
      case 'delayed':
        return 'text-red-600';
      default:
        return 'text-sky-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon className="w-5 h-5 text-green-600" />;
      case 'delayed':
        return <ExclamationTriangleIcon className="w-5 h-5 text-red-600" />;
      default:
        return <ClockIcon className="w-5 h-5 text-sky-600" />;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-8">
      <div className="mb-8">
        <BackButton />
      </div>

      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-6">Projects Management</h1>
        
        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-sky-500"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="p-2 border rounded-md focus:ring-2 focus:ring-sky-500"
          >
            <option value="all">All Status</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
            <option value="delayed">Delayed</option>
          </select>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <div key={project.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold">{project.name}</h3>
                  <p className="text-gray-600 mt-1">{project.description}</p>
                </div>
                <div className="flex items-center">
                  {getStatusIcon(project.status)}
                  <span className={`ml-2 ${getStatusColor(project.status)}`}>
                    {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-600">
                    <CalendarIcon className="w-5 h-5 mr-2" />
                    <span>{project.startDate} - {project.endDate}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <UserGroupIcon className="w-5 h-5 mr-2" />
                    <span>{project.teamSize} members</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-sky-600 h-2 rounded-full" 
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Budget</span>
                    <span>{formatCurrency(project.budget.used)} / {formatCurrency(project.budget.total)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-sky-600 h-2 rounded-full" 
                      style={{ width: `${(project.budget.used / project.budget.total) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t flex justify-end space-x-2">
                <button className="px-4 py-2 text-sky-600 hover:text-sky-800">
                  View Details
                </button>
                <button className="px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700">
                  Manage Project
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 