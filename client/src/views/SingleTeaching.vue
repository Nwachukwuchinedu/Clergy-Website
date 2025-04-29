<script setup lang="ts">
import { onMounted, onUnmounted, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTeachingStore } from '../store/teachingStore'
import HeroBanner from '../components/HeroBanner.vue'
import TeachingCard from '../components/TeachingCard.vue'
import CommentSection from '../components/CommentSection.vue'

const route = useRoute()
const router = useRouter()
const teachingStore = useTeachingStore()

const socialShare = ref({
  url: '',
  title: ''
})

const isLoading = computed(() => teachingStore.isLoading)
const teaching = computed(() => teachingStore.currentTeaching)
const relatedTeachings = computed(() => teachingStore.relatedTeachings)
const hasRelatedTeachings = computed(() => relatedTeachings.value.length > 0)

const formattedDate = computed(() => {
  if (!teaching.value) return ''
  const date = new Date(teaching.value.publishedAt)
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date)
})

onMounted(async () => {
  const slug = route.params.slug as string
  
  // Fetch teaching data
  const result = await teachingStore.fetchTeachingBySlug(slug)
  
  // If not found, redirect to 404
  if (!result) {
    router.push('/not-found')
    return
  }
  
  // Update page title
  document.title = `${teaching.value?.title} | Pastor's Teachings`
  
  // Set up social sharing info
  socialShare.value = {
    url: window.location.href,
    title: teaching.value?.title || 'Pastor\'s Teaching'
  }
  
  // Scroll to top
  window.scrollTo(0, 0)
})

onUnmounted(() => {
  // Clear teaching data when leaving the page
  teachingStore.clearCurrentTeaching()
})

const handleSocialShare = (platform: 'facebook' | 'twitter' | 'linkedin') => {
  let shareUrl = ''
  
  switch (platform) {
    case 'facebook':
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(socialShare.value.url)}`
      break
    case 'twitter':
      shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(socialShare.value.url)}&text=${encodeURIComponent(socialShare.value.title)}`
      break
    case 'linkedin':
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(socialShare.value.url)}`
      break
  }
  
  window.open(shareUrl, '_blank', 'width=600,height=400')
}
</script>

<template>
  <div>
    <!-- Loading State -->
    <div v-if="isLoading" class="flex justify-center items-center min-h-screen">
      <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600"></div>
    </div>
    
    <!-- Content -->
    <div v-else-if="teaching">
      <!-- Header -->
      <HeroBanner
        :title="teaching.title"
        :subtitle="teaching.seriesName ? `Part of the series: ${teaching.seriesName}` : undefined"
      />
      
      <div class="container mx-auto px-4 py-12">
        <div class="max-w-4xl mx-auto">
          <!-- Meta Information -->
          <div class="flex flex-wrap items-center text-neutral-600 mb-8">
            <span class="mr-4">By {{ teaching.authorName }}</span>
            <span class="mr-4">|</span>
            <span class="mr-4">{{ formattedDate }}</span>
            <span class="mr-4">|</span>
            <span>{{ teaching.readingTime }} min read</span>
          </div>
          
          <!-- Tags -->
          <div class="flex flex-wrap gap-2 mb-8">
            <router-link 
              v-for="tag in teaching.tags" 
              :key="tag"
              :to="`/teachings?tags=${tag}`"
              class="badge badge-primary"
            >
              {{ tag }}
            </router-link>
          </div>
          
          <!-- Content -->
          <div class="prose prose-lg max-w-none">
            <div v-html="teaching.content"></div>
          </div>
          
          <!-- Social Sharing -->
          <div class="mt-12 pt-6 border-t border-neutral-200">
            <h3 class="text-xl font-bold mb-4">Share This Teaching</h3>
            <div class="flex space-x-4">
              <button 
                @click="handleSocialShare('facebook')"
                class="bg-[#3b5998] hover:bg-[#324c82] text-white p-2 rounded-full transition-colors"
                aria-label="Share on Facebook"
              >
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd"></path>
                </svg>
              </button>
              <button 
                @click="handleSocialShare('twitter')"
                class="bg-[#1da1f2] hover:bg-[#0c85d0] text-white p-2 rounded-full transition-colors"
                aria-label="Share on Twitter"
              >
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </button>
              <button 
                @click="handleSocialShare('linkedin')"
                class="bg-[#0077b5] hover:bg-[#005582] text-white p-2 rounded-full transition-colors"
                aria-label="Share on LinkedIn"
              >
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill-rule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clip-rule="evenodd"></path>
                </svg>
              </button>
            </div>
          </div>
          
          <!-- Related Teachings -->
          <div v-if="hasRelatedTeachings" class="mt-12 pt-8 border-t border-neutral-200">
            <h3 class="text-2xl font-bold mb-6">Related Teachings</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <TeachingCard
                v-for="relatedTeaching in relatedTeachings"
                :key="relatedTeaching.id"
                :teaching="relatedTeaching"
                size="small"
              />
            </div>
          </div>
          
          <!-- Comments Section -->
          <CommentSection />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add styling for content (the v-html content) */
:deep(.prose) {
  @apply text-neutral-800;
}

:deep(.prose h2) {
  @apply text-2xl font-bold text-primary-800 mt-8 mb-4;
}

:deep(.prose h3) {
  @apply text-xl font-bold text-primary-700 mt-6 mb-3;
}

:deep(.prose p) {
  @apply mb-4 leading-relaxed;
}

:deep(.prose ul) {
  @apply list-disc pl-6 mb-4;
}

:deep(.prose li) {
  @apply mb-2;
}

:deep(.scripture-quote) {
  @apply italic pl-4 border-l-4 border-secondary-400 my-6 text-neutral-700 py-2;
}
</style>