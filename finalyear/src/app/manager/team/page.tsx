'use client';
import { useState } from 'react';
import { 
  UserCircleIcon, 
  MapPinIcon, 
  CheckCircleIcon, 
  XCircleIcon,
  MagnifyingGlassIcon 
} from '@heroicons/react/24/solid';
import BackButton from '../components/BackButton';

interface FieldOfficer {
  id: string;
  name: string;
  location: string;
  status: 'active' | 'inactive';
  projects: string[];
  assignedArea: string;
  lastActive: string;
}

export default function TeamPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [officers, setOfficers] = useState<FieldOfficer[]>([
    {
      id: '1',
      name: 'John Doe',
      location: 'Northern Region',
      status: 'active',
      projects: ['Project A', 'Project B'],
      assignedArea: 'District 1',
      lastActive: '2 hours ago'
    },
    {
      id: '2',
      name: 'Jane Smith',
      location: 'Southern Region',
      status: 'active',
      projects: ['Project C'],
      assignedArea: 'District 2',
      lastActive: '1 day ago'
    },
    {
      id: '3',
      name: 'Mike Johnson',
      location: 'Eastern Region',
      status: 'inactive',
      projects: ['Project B'],
      assignedArea: 'District 3',
      lastActive: '5 days ago'
    }
  ]);

  const filteredOfficers = officers.filter(officer => {
    const matchesSearch = officer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         officer.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         officer.assignedArea.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || officer.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'text-green-600' : 'text-red-600';
  };

  const getStatusIcon = (status: string) => {
    return status === 'active' 
      ? <CheckCircleIcon className="w-5 h-5 text-green-600" />
      : <XCircleIcon className="w-5 h-5 text-red-600" />;
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <BackButton />
      </div>

      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-6">Team Management</h1>
        
        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name, location, or area..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-sky-500"
              />
              <MagnifyingGlassIcon className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="p-2 border rounded-md focus:ring-2 focus:ring-sky-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOfficers.map((officer) => (
            <div key={officer.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <UserCircleIcon className="w-12 h-12 text-gray-400" />
                  <div className="ml-3">
                    <h3 className="font-semibold text-lg">{officer.name}</h3>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPinIcon className="w-4 h-4 mr-1" />
                      {officer.location}
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  {getStatusIcon(officer.status)}
                  <span className={`ml-2 text-sm ${getStatusColor(officer.status)}`}>
                    {officer.status.charAt(0).toUpperCase() + officer.status.slice(1)}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Assigned Area</p>
                  <p className="font-medium">{officer.assignedArea}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Projects</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {officer.projects.map((project, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-sky-100 text-sky-700 rounded-full text-sm"
                      >
                        {project}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Last Active</p>
                  <p className="text-sm">{officer.lastActive}</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t">
                <button className="w-full text-sky-600 hover:text-sky-800 text-sm font-medium">
                  View Full Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 