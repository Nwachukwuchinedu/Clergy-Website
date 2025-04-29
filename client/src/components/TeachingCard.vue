<script setup lang="ts">
import { computed } from 'vue'
import type { Teaching } from '../types'

const props = defineProps<{
  teaching: Teaching
  size?: 'small' | 'medium' | 'large'
}>()

const formattedDate = computed(() => {
  const date = new Date(props.teaching.publishedAt)
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date)
})

const excerpt = computed(() => {
  if (props.size === 'small') {
    return props.teaching.excerpt.length > 80 
      ? `${props.teaching.excerpt.substring(0, 80)}...` 
      : props.teaching.excerpt
  }
  return props.teaching.excerpt
})
</script>

<template>
  <div 
    class="card group hover:shadow-card transition-all duration-300"
    :class="{
      'p-4': size === 'small',
      'p-6': size === 'medium' || !size,
      'p-8': size === 'large'
    }"
  >
    <router-link :to="`/teaching/${teaching.slug}`" class="block">
      <div class="space-y-3">
        <div v-if="teaching.seriesName" class="badge badge-secondary">
          {{ teaching.seriesName }}
        </div>
        
        <h3 
          class="group-hover:text-primary-700 transition-colors"
          :class="{
            'text-lg': size === 'small',
            'text-xl': size === 'medium' || !size,
            'text-2xl': size === 'large'
          }"
        >
          {{ teaching.title }}
        </h3>
        
        <div class="flex items-center text-sm text-neutral-500">
          <span>{{ formattedDate }}</span>
          <span class="mx-2">•</span>
          <span>{{ teaching.readingTime }} min read</span>
        </div>
        
        <p class="text-neutral-600">{{ excerpt }}</p>
        
        <div class="pt-2">
          <span 
            class="text-primary-600 font-medium inline-flex items-center group-hover:text-primary-800"
          >
            Read More
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </span>
        </div>
      </div>
    </router-link>
  </div>
</template>