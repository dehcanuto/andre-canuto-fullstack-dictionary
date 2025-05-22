import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('@dicionary/token')
    if (token) config.headers['Authorization'] = token
    return config
  },
  (error) => Promise.reject(error),
)

export default api
