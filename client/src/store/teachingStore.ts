import { defineStore } from 'pinia'
import teachingService from '../services/teachingService'
import type { Teaching, TeachingFilters, TeachingListResponse } from '../types'

interface TeachingState {
  teachings: Teaching[]
  currentTeaching: Teaching | null
  relatedTeachings: Teaching[]
  filters: TeachingFilters
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
  isLoading: boolean
  error: string | null
}

export const useTeachingStore = defineStore('teaching', {
  state: (): TeachingState => ({
    teachings: [],
    currentTeaching: null,
    relatedTeachings: [],
    filters: {},
    pagination: {
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 0
    },
    isLoading: false,
    error: null
  }),
  
  getters: {
    hasTeachings: (state) => state.teachings.length > 0,
    paginationInfo: (state) => state.pagination
  },
  
  actions: {
    async fetchTeachings(filters?: TeachingFilters, page = 1, limit = 10) {
      this.isLoading = true
      this.error = null
      
      try {
        const response: TeachingListResponse = await teachingService.getTeachings(filters, page, limit)
        this.teachings = response.teachings
        this.pagination = response.pagination
        this.filters = filters || {}
      } catch (error: any) {
        this.error = error.message || 'Failed to fetch teachings'
        console.error('Error fetching teachings:', error)
      } finally {
        this.isLoading = false
      }
    },
    
    async fetchTeachingBySlug(slug: string) {
      this.isLoading = true
      this.error = null
      
      try {
        const teaching = await teachingService.getTeachingBySlug(slug)
        this.currentTeaching = teaching
        
        // Fetch related teachings
        if (teaching) {
          this.relatedTeachings = await teachingService.getRelatedTeachings(teaching.id)
        }
        
        return teaching
      } catch (error: any) {
        this.error = error.message || `Failed to fetch teaching: ${slug}`
        console.error(`Error fetching teaching ${slug}:`, error)
        return null
      } finally {
        this.isLoading = false
      }
    },
    
    clearCurrentTeaching() {
      this.currentTeaching = null
      this.relatedTeachings = []
    },
    
    updateFilters(newFilters: TeachingFilters) {
      this.filters = { ...this.filters, ...newFilters }
      this.fetchTeachings(this.filters, 1, this.pagination.limit)
    },
    
    clearFilters() {
      this.filters = {}
      this.fetchTeachings({}, 1, this.pagination.limit)
    },
    
    goToPage(page: number) {
      if (page > 0 && page <= this.pagination.totalPages) {
        this.fetchTeachings(this.filters, page, this.pagination.limit)
      }
    }
  }
})