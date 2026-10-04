import axios from 'axios';

// The URL for the real CropFresh AI backend hosted on AWS App Runner
export const API_BASE_URL = process.env.NEXT_PUBLIC_AI_API_URL || 'https://2udwjw3jxs.ap-south-1.awsapprunner.com/api/v1';

// Unified client for all requests
export const apiClient = axios.create({
  baseURL: API_BASE_URL.endsWith('/api/v1') ? API_BASE_URL : `${API_BASE_URL}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const aiClient = apiClient; // Alias for backward compatibility if imported elsewhere

// Interceptors to handle global errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

const clients = {
  api: apiClient,
  ai: aiClient,
};

export default clients;
