<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useTeachingStore } from '../store/teachingStore'
import { useSeriesStore } from '../store/seriesStore'
import HeroBanner from '../components/HeroBanner.vue'
import TeachingCard from '../components/TeachingCard.vue'

const teachingStore = useTeachingStore()
const seriesStore = useSeriesStore()

const searchQuery = ref('')
const selectedSeries = ref('')
const selectedTags = ref<string[]>([])
const startDate = ref('')
const endDate = ref('')

// All possible tags extracted from teachings
const allTags = ref<string[]>([])

// Computed properties for UI state
const isLoading = computed(() => teachingStore.isLoading)
const hasResults = computed(() => teachingStore.teachings.length > 0)
const noResults = computed(() => !isLoading.value && !hasResults.value)
const currentPage = computed(() => teachingStore.pagination.page)
const totalPages = computed(() => teachingStore.pagination.totalPages)

// Initialize page
onMounted(async () => {
  // Fetch teachings
  await teachingStore.fetchTeachings()
  
  // Fetch series for filter dropdown
  await seriesStore.fetchAllSeries()
  
  // Extract all unique tags from teachings
  const tags = new Set<string>()
  teachingStore.teachings.forEach(teaching => {
    teaching.tags.forEach(tag => tags.add(tag))
  })
  allTags.value = Array.from(tags)
})

// Apply filters
const applyFilters = () => {
  const filters = {
    search: searchQuery.value,
    seriesId: selectedSeries.value,
    tags: selectedTags.value.length > 0 ? selectedTags.value : undefined,
    startDate: startDate.value,
    endDate: endDate.value
  }
  
  teachingStore.updateFilters(filters)
}

// Clear filters
const clearFilters = () => {
  searchQuery.value = ''
  selectedSeries.value = ''
  selectedTags.value = []
  startDate.value = ''
  endDate.value = ''
  
  teachingStore.clearFilters()
}

// Toggle tag selection
const toggleTag = (tag: string) => {
  const index = selectedTags.value.indexOf(tag)
  if (index === -1) {
    selectedTags.value.push(tag)
  } else {
    selectedTags.value.splice(index, 1)
  }
}

// Pagination
const goToPage = (page: number) => {
  teachingStore.goToPage(page)
  // Scroll to top of results
  window.scrollTo({
    top: document.getElementById('results')?.offsetTop || 0,
    behavior: 'smooth'
  })
}
</script>

<template>
  <div>
    <!-- Header -->
    <HeroBanner
      title="Teachings Archive"
      subtitle="Browse our collection of biblical teachings and spiritual insights"
    />
    
    <div class="container mx-auto px-4 py-12">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Sidebar with Filters -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-xl shadow-soft p-6 sticky top-24">
            <h2 class="text-xl font-bold mb-4">Search & Filter</h2>
            
            <!-- Search -->
            <div class="mb-6">
              <label for="search" class="form-label">Search</label>
              <div class="relative">
                <input
                  id="search"
                  v-model="searchQuery"
                  type="text"
                  placeholder="Search teachings..."
                  class="form-input pl-10"
                  @keyup.enter="applyFilters"
                />
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg class="w-5 h-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
              </div>
            </div>
            
            <!-- Series Filter -->
            <div class="mb-6">
              <label for="series" class="form-label">Series</label>
              <select
                id="series"
                v-model="selectedSeries"
                class="form-input"
              >
                <option value="">All Series</option>
                <option
                  v-for="series in seriesStore.allSeries"
                  :key="series.id"
                  :value="series.id"
                >
                  {{ series.title }}
                </option>
              </select>
            </div>
            
            <!-- Tags Filter -->
            <div class="mb-6">
              <label class="form-label mb-2">Tags</label>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="tag in allTags"
                  :key="tag"
                  @click="toggleTag(tag)"
                  class="px-3 py-1 text-sm rounded-full transition-colors"
                  :class="selectedTags.includes(tag)
                    ? 'bg-primary-600 text-white'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'"
                >
                  {{ tag }}
                </button>
              </div>
            </div>
            
            <!-- Date Range -->
            <div class="mb-6">
              <label class="form-label">Date Range</label>
              <div class="grid grid-cols-2 gap-2">
                <div>
                  <label for="startDate" class="form-label text-xs">From</label>
                  <input
                    id="startDate"
                    v-model="startDate"
                    type="date"
                    class="form-input"
                  />
                </div>
                <div>
                  <label for="endDate" class="form-label text-xs">To</label>
                  <input
                    id="endDate"
                    v-model="endDate"
                    type="date"
                    class="form-input"
                  />
                </div>
              </div>
            </div>
            
            <!-- Filter Buttons -->
            <div class="flex flex-col space-y-2">
              <button
                @click="applyFilters"
                class="btn btn-primary"
              >
                Apply Filters
              </button>
              <button
                @click="clearFilters"
                class="btn bg-neutral-200 hover:bg-neutral-300 text-neutral-800"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>
        
        <!-- Main Content -->
        <div id="results" class="lg:col-span-3">
          <!-- Loading State -->
          <div v-if="isLoading" class="flex justify-center py-20">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
          
          <!-- No Results -->
          <div v-else-if="noResults" class="bg-white rounded-xl shadow-soft p-8 text-center">
            <svg class="w-16 h-16 text-neutral-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <h3 class="text-xl font-bold mb-2">No Teachings Found</h3>
            <p class="text-neutral-600 mb-4">
              We couldn't find any teachings matching your search criteria.
            </p>
            <button
              @click="clearFilters"
              class="btn btn-primary"
            >
              Clear Filters
            </button>
          </div>
          
          <!-- Results Grid -->
          <div v-else>
            <!-- Results Count -->
            <p class="text-neutral-600 mb-6">
              Showing {{ teachingStore.teachings.length }} of {{ teachingStore.pagination.total }} teachings
            </p>
            
            <!-- Teachings Grid -->
            <div class="space-y-6">
              <TeachingCard
                v-for="teaching in teachingStore.teachings"
                :key="teaching.id"
                :teaching="teaching"
                size="medium"
              />
            </div>
            
            <!-- Pagination -->
            <div v-if="totalPages > 1" class="flex justify-center mt-12">
              <div class="flex space-x-1">
                <button
                  @click="goToPage(currentPage - 1)"
                  :disabled="currentPage === 1"
                  class="px-4 py-2 rounded-lg"
                  :class="currentPage === 1
                    ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
                    : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'"
                >
                  Previous
                </button>
                
                <button
                  v-for="page in totalPages"
                  :key="page"
                  @click="goToPage(page)"
                  class="px-4 py-2 rounded-lg"
                  :class="page === currentPage
                    ? 'bg-primary-600 text-white'
                    : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'"
                >
                  {{ page }}
                </button>
                
                <button
                  @click="goToPage(currentPage + 1)"
                  :disabled="currentPage === totalPages"
                  class="px-4 py-2 rounded-lg"
                  :class="currentPage === totalPages
                    ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
                    : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>