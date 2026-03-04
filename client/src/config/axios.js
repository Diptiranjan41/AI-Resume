// config/axios.js
import axios from 'axios';

// Set base URL
axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Add request interceptor for debugging
axios.interceptors.request.use(
  config => {
    console.log(`🚀 ${config.method.toUpperCase()} ${config.url}`);
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Add response interceptor
axios.interceptors.response.use(
  response => {
    console.log('✅ Response received:', response.status);
    return response;
  },
  error => {
    console.error('❌ Response error:', error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);