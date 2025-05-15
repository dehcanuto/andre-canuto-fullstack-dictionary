import axios from 'axios';

// TODO: Preferi para ajudar na hora de rodar o teste mas deveria ser algo como: baseURL: import.meta.env.VITE_API_BASE_URL
const api = axios.create({
  baseURL: 'http://localhost:3000',
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers['Authorization'] = token;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
