import { defineStore } from 'pinia'
import authService from '../services/authService'

interface User {
  id: string
  email: string
  name: string
  role: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: authService.getCurrentUser(),
    isAuthenticated: authService.isAuthenticated(),
    isLoading: false,
    error: null
  }),
  
  actions: {
    async login(email: string, password: string) {
      this.isLoading = true
      this.error = null
      
      try {
        const response = await authService.login({ email, password })
        this.user = response.user
        this.isAuthenticated = true
        return true
      } catch (error: any) {
        this.error = error.message || 'Login failed'
        return false
      } finally {
        this.isLoading = false
      }
    },
    
    logout() {
      authService.logout()
      this.user = null
      this.isAuthenticated = false
    }
  }
})