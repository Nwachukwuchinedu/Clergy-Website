// import api from './api'

// User interface
interface User {
  id: string
  email: string
  name: string
  role: string
}

// Login credentials interface
interface LoginCredentials {
  email: string
  password: string
}

// Login response interface
interface AuthResponse {
  user: User
  token: string
}

// Login user
export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  try {
    // For demo purposes, we'll simulate a successful login if credentials match our mock data
    // In production, this would be:
    // const response = await api.post('/auth/login', credentials)
    // return response.data
    
    return mockLogin(credentials)
  } catch (error) {
    console.error('Login error:', error)
    throw error
  }
}

// Logout user
export const logout = (): void => {
  // Remove token from localStorage
  localStorage.removeItem('auth_token')
  localStorage.removeItem('auth_user')
}

// Get current user
export const getCurrentUser = (): User | null => {
  const userJson = localStorage.getItem('auth_user')
  if (userJson) {
    return JSON.parse(userJson)
  }
  return null
}

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return localStorage.getItem('auth_token') !== null
}

// Mock login implementation for demo purposes
const mockLogin = (credentials: LoginCredentials): AuthResponse => {
  // Mock admin credentials
  const validCredentials = {
    email: 'admin@example.com',
    password: 'password123'
  }
  
  if (credentials.email === validCredentials.email && credentials.password === validCredentials.password) {
    const user: User = {
      id: '1',
      email: 'admin@example.com',
      name: 'Admin User',
      role: 'admin'
    }
    
    const token = 'mock-jwt-token-' + Math.random().toString(36).substring(2)
    
    // Store in localStorage
    localStorage.setItem('auth_token', token)
    localStorage.setItem('auth_user', JSON.stringify(user))
    
    return {
      user,
      token
    }
  } else {
    throw new Error('Invalid credentials')
  }
}

export default {
  login,
  logout,
  getCurrentUser,
  isAuthenticated
}