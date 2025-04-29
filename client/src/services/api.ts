import axios from 'axios'

// Create a reusable axios instance with common config
const api = axios.create({
  baseURL: "http://localhost:5000/api", // Change this to your actual API URL in production
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request interceptor for adding auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response interceptor for handling common errors
api.interceptors.response.use(
  response => response,
  error => {
    // Handle common errors like 401, 403, 500, etc.
    if (error.response) {
      if (error.response.status === 401) {
        // Handle unauthorized (e.g., redirect to login)
        localStorage.removeItem('auth_token')
      }
    }
    return Promise.reject(error)
  }
)

export default api