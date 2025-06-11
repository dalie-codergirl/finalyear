import axios, { AxiosResponse } from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Types
export interface DashboardStats {
  activeProjects: number;
  pendingReports: number;
  fieldOfficers: number;
}

export interface Project {
  id: string;
  name: string;
  status: string;
  startDate: string;
  endDate: string;
}

export interface ProjectProgress {
  labels: string[];
  data: number[];
}

export interface BudgetData {
  used: number;
  remaining: number;
}

export interface ProjectInsight {
  project: string;
  lessons: string;
  recommendations: string;
  date: string;
}

export interface ApiResponse<T> {
  data: T;
  error?: string;
}

async function handleResponse<T>(response: AxiosResponse): Promise<ApiResponse<T>> {
  if (response.status >= 400) {
    throw new Error(response.data?.message || 'An error occurred');
  }
  return { data: response.data };
}

// API functions
export const getDashboardStats = () => api.get<DashboardStats>('/dashboard/stats');
export const getProjects = () => api.get<Project[]>('/dashboard/projects');
export const getProjectProgress = (projectId?: string) => 
  api.get<ProjectProgress>(`/dashboard/project-progress/${projectId || ''}`);
export const getBudgetOverview = (projectId?: string) => 
  api.get<BudgetData>(`/dashboard/budget/${projectId || ''}`);

export const submitProjectInsight = async (data: ProjectInsight): Promise<ApiResponse<void>> => {
  const response = await api.post('/lessons', data);
  return handleResponse<void>(response);
};

export const logout = async (): Promise<ApiResponse<void>> => {
  const response = await api.post('/auth/logout');
  return handleResponse<void>(response);
};

export default api; 