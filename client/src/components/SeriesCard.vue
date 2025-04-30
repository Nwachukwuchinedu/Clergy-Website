<script setup lang="ts">
import { computed } from "vue";
import type { Series } from "../types";

const props = defineProps<{
  series: Series;
}>();

const teachingCount = computed(() => {
  return props.series?.teachingCount === 1
    ? "1 teaching"
    : `${props.series?.teachingCount ?? 0} teachings`;
});
</script>

<template>
  <div
    class="card group hover:shadow-card transition-all duration-300 h-full flex flex-col"
  >
    <router-link :to="`/series/${series.slug}`" class="flex flex-col h-full">
      <div class="relative h-48 mb-4 rounded-lg overflow-hidden">
        <img
          :src="series?.coverImage || '/placeholder-image.jpg'"
          :alt="series?.title || 'Series cover image'"
          class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div class="flex-grow space-y-3">
        <h3
          class="text-xl font-bold group-hover:text-primary-700 transition-colors"
        >
          {{ series.title }}
        </h3>

        <p class="text-sm text-neutral-500">{{ teachingCount }}</p>

        <p class="text-neutral-600">{{ series.description }}</p>
      </div>

      <div class="mt-4 pt-4 border-t border-neutral-200">
        <span
          class="text-primary-600 font-medium inline-flex items-center group-hover:text-primary-800"
        >
          View Series
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </span>
      </div>
    </router-link>
  </div>
</template>
