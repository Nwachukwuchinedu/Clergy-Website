import { defineStore } from 'pinia'
import seriesService from '../services/seriesService'
import type { Series, SeriesDetailResponse } from '../types'

interface SeriesState {
  allSeries: Series[]
  currentSeries: Series | null
  seriesTeachings: any[] // Using any here, but would use Teaching[] in practice
  isLoading: boolean
  error: string | null
}

export const useSeriesStore = defineStore('series', {
  state: (): SeriesState => ({
    allSeries: [],
    currentSeries: null,
    seriesTeachings: [],
    isLoading: false,
    error: null
  }),
  
  getters: {
    hasSeries: (state) => state.allSeries.length > 0
  },
  
  actions: {
    async fetchAllSeries() {
      this.isLoading = true
      this.error = null
      
      try {
        const seriesList = await seriesService.getAllSeries()
        this.allSeries = seriesList
      } catch (error: any) {
        this.error = error.message || 'Failed to fetch series'
        console.error('Error fetching series:', error)
      } finally {
        this.isLoading = false
      }
    },
    
    async fetchSeriesBySlug(slug: string) {
      this.isLoading = true
      this.error = null
      
      try {
        const response: SeriesDetailResponse = await seriesService.getSeriesBySlug(slug)
        this.currentSeries = response.series
        this.seriesTeachings = response.teachings
        return response
      } catch (error: any) {
        this.error = error.message || `Failed to fetch series: ${slug}`
        console.error(`Error fetching series ${slug}:`, error)
        return null
      } finally {
        this.isLoading = false
      }
    },
    
    clearCurrentSeries() {
      this.currentSeries = null
      this.seriesTeachings = []
    }
  }
})