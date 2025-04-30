<script setup lang="ts">
import { onMounted, onUnmounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSeriesStore } from '../store/seriesStore'
import HeroBanner from '../components/HeroBanner.vue'
import TeachingCard from '../components/TeachingCard.vue'

const route = useRoute()
const router = useRouter()
const seriesStore = useSeriesStore()
console.log(seriesStore);

const isLoading = computed(() => seriesStore.isLoading)
const series = computed(() => seriesStore.currentSeries)
const teachings = computed(() => seriesStore.seriesTeachings)
const hasTeachings = computed(() => teachings.value && teachings.value.length > 0)

onMounted(async () => {
  const slug = route.params.slug as string
  
  // Fetch series data
  const result = await seriesStore.fetchSeriesBySlug(slug)
  console.log(result);
  
  // If not found, redirect to 404
  if (!result) {
    router.push('/not-found')
    return
  }
  
  // Update page title
  document.title = `${series.value?.title} | Pastor's Teachings`
  
  // Scroll to top
  window.scrollTo(0, 0)
})

onUnmounted(() => {
  // Clear series data when leaving the page
  seriesStore.clearCurrentSeries()
})
</script>

<template>
  <div>
    <!-- Loading State -->
    <div v-if="isLoading" class="flex justify-center items-center min-h-screen">
      <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600"></div>
    </div>
    
    <!-- Content -->
    <div v-else-if="series">
      <!-- Hero Section -->
      <div class="relative bg-neutral-900 text-white">
        <!-- Background Image with Overlay -->
        <div
          class="absolute inset-0 bg-cover bg-center"
          :style="`background-image: url(${series.coverImage})`"
        ></div>
        <div class="absolute inset-0 bg-gradient-to-r from-primary-900/95 to-primary-800/90"></div>
        
        <!-- Content -->
        <div class="container mx-auto px-4 py-20 relative z-10">
          <div class="max-w-3xl">
            <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              {{ series.title }}
            </h1>
            
            <p class="text-xl text-white/90 mb-6">
              {{ series.description }}
            </p>
            
            <div class="badge bg-white/20 text-white">
              {{ series.teachingCount }} {{ series.teachingCount === 1 ? 'teaching' : 'teachings' }}
            </div>
          </div>
        </div>
      </div>
      
      <!-- Teachings List -->
      <div class="container mx-auto px-4 py-12">
        <h2 class="text-2xl font-bold mb-8">Teachings in this Series</h2>
        
        <!-- Empty State -->
        <div v-if="!hasTeachings" class="bg-white rounded-xl shadow-soft p-8 text-center">
          <svg class="w-16 h-16 text-neutral-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          <h3 class="text-xl font-bold mb-2">No Teachings Yet</h3>
          <p class="text-neutral-600 mb-4">
            This series doesn't have any teachings yet. Please check back later.
          </p>
        </div>
        
        <!-- Teachings Grid -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <TeachingCard
            v-for="teaching in teachings"
            :key="teaching.id"
            :teaching="teaching"
          />
        </div>
      </div>
    </div>
  </div>
</template>