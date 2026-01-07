import axios from 'axios';
import { getSession } from 'next-auth/react';

// Create axios instance
// Note: Currently using mock data. When backend is ready, set NEXT_PUBLIC_BACKEND_URL in .env
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add authorization token to requests
instance.interceptors.request.use(async (config) => {
  const session = await getSession();
  if (session?.user?.accessToken) {
    config.headers.Authorization = `Bearer ${session.user.accessToken}`;
  }
  return config;
});

// Handle response errors
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors
    if (error.response?.status === 401) {
      // Token expired or invalid - could trigger logout here
      console.error('Authentication error:', error.response?.data?.message);
    }
    return Promise.reject(error);
  }
);

export default instance;