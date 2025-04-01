import axios from 'axios';
import { getToken, clearToken, storeToken} from '../pages/Auth/auth'; // Adjust the import path as necessary

const API_BASE_URL = 'http://localhost:8000';

// Create an axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


// Add request interceptor to include the token in headers
api.interceptors.request.use(
    (config) => {
      const token = getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Add response interceptor to handle token refresh and errors
api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      
      // If 401 error and we haven't already tried to refresh
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        
        try {
          const refreshToken = localStorage.getItem('refreshToken');
          if (!refreshToken) {
            clearToken();
            window.location.href = '/login';
            return Promise.reject(error);
          }
          
          const response = await refreshAccessToken(refreshToken);
          const newAccessToken = response.data.access;
          storeToken(newAccessToken);
          
          // Retry the original request with new token
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        } catch (refreshError) {
          clearToken();
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      }
      
      return Promise.reject(error);
    }
  );

  // Authentication API
export const authAPI = {
    signup: async (email, fullname, password, role) => {
      try {
        const response = await api.post('/signup/', { email, fullname, password, role });
        return response.data;
      } catch (error) {
        throw error.response?.data || error.message;
      }
    },

    verifyOTP: async (email, otp) => {
        try {
        const response = await api.post('/verify-otp/', { email, otp });
        return response.data;
        } catch (error) {
        throw error.response?.data || error.message;
        }
    },
    login: async (email, password) => {
        try {
          const response = await api.post('/login/', { email, password });
          // Store tokens
          storeToken(response.data.access);
          localStorage.setItem('refreshToken', response.data.refresh);
          return response.data;
        } catch (error) {
          throw error.response?.data || error.message;
        }
      },
    resendOTP: async (email) => {
    try {
        const response = await api.post('/resend-otp/', { email });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
    },
    refreshAccessToken: async (refreshToken) => {
        try {
          const response = await api.post('/token/refresh/', { refresh: refreshToken });
          return response.data;
        } catch (error) {
          throw error.response?.data || error.message;
        }
      },
      logout: () => {
        clearToken();
        localStorage.removeItem('refreshToken');
      },
    };
    // User API
export const userAPI = {
    getUserInfo: async () => {
      try {
        const response = await api.get('/user-info/');
        return response.data;
      } catch (error) {
        throw error.response?.data || error.message;
      }
    },
    updateUserInfo: async (userData) => {
        try {
          const response = await api.put('/user-info/edit/', userData);
          return response.data;
        } catch (error) {
          throw error.response?.data || error.message;
        }
      },
    };
    // Department API
export const departmentAPI = {
    getDepartments: async () => {
      try {
        const response = await api.get('/departments/');
        return response.data;
      } catch (error) {
        throw error.response?.data || error.message;
      }
    },
    createDepartment: async (departmentData) => {
        try {
          const response = await api.post('/departments/', departmentData);
          return response.data;
        } catch (error) {
          throw error.response?.data || error.message;
        }
      },
    };
    // Course API
export const courseAPI = {
    getCourses: async () => {
      try {
        const response = await api.get('/courses/');
        return response.data;
      } catch (error) {
        throw error.response?.data || error.message;
      }
    },
  

