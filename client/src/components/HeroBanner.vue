<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
  ctaText?: string
  ctaLink?: string | null
  bgImage?: string
  overlay?: boolean
}>()
</script>

<template>
  <div 
    class="relative min-h-[500px] flex items-center"
    :style="bgImage ? `background-image: url(${bgImage}); background-size: cover; background-position: center;` : ''"
  >
    <!-- Overlay -->
    <div 
      v-if="overlay || bgImage" 
      class="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-primary-800/80"
    ></div>
    
    <!-- No background image default styling -->
    <div 
      v-if="!bgImage" 
      class="absolute inset-0 bg-gradient-to-r from-primary-900 to-primary-700"
    ></div>
    
    <div class="container mx-auto px-4 py-16 relative z-10 text-white">
      <div class="max-w-3xl">
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight animate-slide-down">
          {{ title }}
        </h1>
        
        <p v-if="subtitle" class="text-xl md:text-2xl text-white/90 mb-8 animate-slide-down" style="animation-delay: 0.1s;">
          {{ subtitle }}
        </p>
        
        <div v-if="ctaText && ctaLink" class="animate-slide-down" style="animation-delay: 0.2s;">
          <router-link :to="ctaLink" class="btn bg-secondary-500 hover:bg-secondary-600 text-white shadow-lg hover:shadow-xl transition-all">
            {{ ctaText }}
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>