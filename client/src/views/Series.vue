<script setup lang="ts">
import { onMounted } from 'vue'
import { useSeriesStore } from '../store/seriesStore'
import HeroBanner from '../components/HeroBanner.vue'
import SeriesCard from '../components/SeriesCard.vue'

const seriesStore = useSeriesStore()

onMounted(async () => {
  // Fetch all series
  await seriesStore.fetchAllSeries()
})
</script>

<template>
  <div>
    <!-- Header -->
    <HeroBanner
      title="Teaching Series"
      subtitle="Explore our collections of thematic teachings on various biblical topics"
    />
    
    <div class="container mx-auto px-4 py-12">
      <!-- Loading State -->
      <div v-if="seriesStore.isLoading" class="flex justify-center py-16">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
      
      <!-- Empty State -->
      <div v-else-if="!seriesStore.hasSeries" class="text-center py-16">
        <svg class="w-16 h-16 text-neutral-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
        </svg>
        <h2 class="text-2xl font-bold mb-2">No Series Available</h2>
        <p class="text-neutral-600">Please check back later for new teaching series.</p>
      </div>
      
      <!-- Series Grid -->
      <div v-else>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <SeriesCard
            v-for="series in seriesStore.allSeries"
            :key="series.id"
            :series="series"
          />
        </div>
      </div>
    </div>
  </div>
</template>