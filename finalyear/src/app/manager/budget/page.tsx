'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { CurrencyDollarIcon, ArrowTrendingUpIcon, ArrowTrendingDownIcon } from '@heroicons/react/24/solid';
import BackButton from '../components/BackButton';

// Import Chart.js components
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// Dynamically import Chart.js components
const DoughnutChart = dynamic(() => import('react-chartjs-2').then(mod => mod.Doughnut), { ssr: false });
const BarChart = dynamic(() => import('react-chartjs-2').then(mod => mod.Bar), { ssr: false });

interface ProjectBudget {
  id: string;
  name: string;
  totalBudget: number;
  spent: number;
  remaining: number;
  status: 'on_track' | 'over_budget' | 'under_budget';
}

export default function BudgetPage() {
  const [selectedProject, setSelectedProject] = useState('all');
  const [budgets, setBudgets] = useState<ProjectBudget[]>([
    {
      id: '1',
      name: 'Project A',
      totalBudget: 100000,
      spent: 65000,
      remaining: 35000,
      status: 'on_track'
    },
    {
      id: '2',
      name: 'Project B',
      totalBudget: 80000,
      spent: 70000,
      remaining: 10000,
      status: 'over_budget'
    },
    {
      id: '3',
      name: 'Project C',
      totalBudget: 120000,
      spent: 40000,
      remaining: 80000,
      status: 'under_budget'
    }
  ]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on_track':
        return 'text-sky-600';
      case 'over_budget':
        return 'text-red-600';
      case 'under_budget':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'on_track':
        return <CurrencyDollarIcon className="w-5 h-5" />;
      case 'over_budget':
        return <ArrowTrendingUpIcon className="w-5 h-5" />;
      case 'under_budget':
        return <ArrowTrendingDownIcon className="w-5 h-5" />;
      default:
        return null;
    }
  };

  return (
    <div className="p-8">
      <BackButton />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Budget Management</h1>
        <select
          value={selectedProject}
          onChange={(e) => setSelectedProject(e.target.value)}
          className="p-2 border rounded-md focus:ring-2 focus:ring-sky-500"
        >
          <option value="all">All Projects</option>
          {budgets.map(budget => (
            <option key={budget.id} value={budget.id}>{budget.name}</option>
          ))}
        </select>
      </div>

      {/* Budget Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Total Budget</h3>
          <div className="text-3xl font-bold text-sky-600">
            {formatCurrency(budgets.reduce((acc, curr) => acc + curr.totalBudget, 0))}
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Total Spent</h3>
          <div className="text-3xl font-bold text-yellow-600">
            {formatCurrency(budgets.reduce((acc, curr) => acc + curr.spent, 0))}
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Total Remaining</h3>
          <div className="text-3xl font-bold text-green-600">
            {formatCurrency(budgets.reduce((acc, curr) => acc + curr.remaining, 0))}
          </div>
        </div>
      </div>

      {/* Budget Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Budget Distribution</h3>
          <div className="h-64">
            <DoughnutChart 
              data={{
                labels: budgets.map(b => b.name),
                datasets: [{
                  data: budgets.map(b => b.totalBudget),
                  backgroundColor: [
                    'rgb(14, 165, 233)',
                    'rgb(168, 85, 247)',
                    'rgb(59, 130, 246)'
                  ]
                }]
              }}
              options={{ cutout: '70%' }}
            />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Budget Utilization</h3>
          <div className="h-64">
            <BarChart 
              data={{
                labels: budgets.map(b => b.name),
                datasets: [
                  {
                    label: 'Spent',
                    data: budgets.map(b => b.spent),
                    backgroundColor: 'rgb(14, 165, 233)'
                  },
                  {
                    label: 'Remaining',
                    data: budgets.map(b => b.remaining),
                    backgroundColor: 'rgb(226, 232, 240)'
                  }
                ]
              }}
              options={{
                responsive: true,
                scales: {
                  x: { stacked: true },
                  y: { stacked: true }
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* Project Budget Details */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Budget</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Spent</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remaining</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {budgets.map((budget) => (
              <tr key={budget.id}>
                <td className="px-6 py-4 whitespace-nowrap font-medium">{budget.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{formatCurrency(budget.totalBudget)}</td>
                <td className="px-6 py-4 whitespace-nowrap">{formatCurrency(budget.spent)}</td>
                <td className="px-6 py-4 whitespace-nowrap">{formatCurrency(budget.remaining)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`flex items-center ${getStatusColor(budget.status)}`}>
                    {getStatusIcon(budget.status)}
                    <span className="ml-2">
                      {budget.status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 