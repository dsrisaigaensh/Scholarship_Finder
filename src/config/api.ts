// API configuration
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export const API_ENDPOINTS = {
  // Auth endpoints
  SIGNUP: `${API_BASE_URL}/api/signup`,
  LOGIN: `${API_BASE_URL}/api/login`,
  ADMIN_LOGIN: `${API_BASE_URL}/api/admin/login`,
  
  // Application endpoints
  APPLY: `${API_BASE_URL}/api/apply`,
  APPLIED: `${API_BASE_URL}/api/applied`,
  
  // Admin endpoints
  USERS: `${API_BASE_URL}/api/users`,
  ADMIN_APPLICATIONS: `${API_BASE_URL}/api/admin/applications`,
  USER_STATUS: `${API_BASE_URL}/api/users/status`,
  USER_ROLE: `${API_BASE_URL}/api/users/role`,
  DELETE_USER: (id: string, role: string) => `${API_BASE_URL}/api/users/${id}?role=${role}`,
}; 