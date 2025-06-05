const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export interface DashboardStats {
  activeProjects: number;
  pendingReports: number;
  fieldOfficers: number;
}

export interface Project {
  id: string;
  name: string;
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

async function handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'An error occurred');
  }
  const data = await response.json();
  return { data };
}

export const api = {
  // Dashboard Statistics
  getDashboardStats: async (): Promise<ApiResponse<DashboardStats>> => {
    const response = await fetch(`${API_BASE_URL}/dashboard/stats`, {
      credentials: 'include'
    });
    return handleResponse<DashboardStats>(response);
  },

  // Projects
  getProjects: async (): Promise<ApiResponse<Project[]>> => {
    const response = await fetch(`${API_BASE_URL}/projects`, {
      credentials: 'include'
    });
    return handleResponse<Project[]>(response);
  },

  // Project Progress
  getProjectProgress: async (projectId?: string): Promise<ApiResponse<ProjectProgress>> => {
    const url = projectId 
      ? `${API_BASE_URL}/projects/progress?projectId=${projectId}`
      : `${API_BASE_URL}/projects/progress`;
    const response = await fetch(url, {
      credentials: 'include'
    });
    return handleResponse<ProjectProgress>(response);
  },

  // Budget Overview
  getBudgetOverview: async (projectId?: string): Promise<ApiResponse<BudgetData>> => {
    const url = projectId 
      ? `${API_BASE_URL}/budget/overview?projectId=${projectId}`
      : `${API_BASE_URL}/budget/overview`;
    const response = await fetch(url, {
      credentials: 'include'
    });
    return handleResponse<BudgetData>(response);
  },

  // Project Insights
  submitProjectInsight: async (data: ProjectInsight): Promise<ApiResponse<void>> => {
    const response = await fetch(`${API_BASE_URL}/lessons`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    });
    return handleResponse<void>(response);
  },

  // Auth
  logout: async (): Promise<ApiResponse<void>> => {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include'
    });
    return handleResponse<void>(response);
  }
}; 