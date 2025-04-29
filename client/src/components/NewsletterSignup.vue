<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  color?: 'light' | 'dark'
}>()

const email = ref('')
const isSubscribing = ref(false)
const hasSubscribed = ref(false)
const error = ref('')

const subscribe = async () => {
  // Validate email
  if (!email.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    error.value = 'Please enter a valid email address'
    return
  }

  error.value = ''
  isSubscribing.value = true

  try {
    // Simulating API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    hasSubscribed.value = true
    email.value = ''
  } catch (e) {
    error.value = 'Failed to subscribe. Please try again.'
  } finally {
    isSubscribing.value = false
  }
}
</script>

<template>
  <div>
    <div v-if="!hasSubscribed" class="max-w-md">
      <form @submit.prevent="subscribe" class="flex flex-col space-y-3">
        <div>
          <input
            v-model="email"
            type="email"
            placeholder="Your email address"
            class="form-input"
            :class="{ 'bg-neutral-800 border-neutral-700 text-white placeholder-neutral-500': color === 'dark' }"
            required
          />
          <p v-if="error" class="form-error mt-1">{{ error }}</p>
        </div>
        <button
          type="submit"
          class="btn"
          :class="color === 'dark' ? 'bg-secondary-500 hover:bg-secondary-600 text-white' : 'btn-primary'"
          :disabled="isSubscribing"
        >
          <span v-if="isSubscribing">Subscribing...</span>
          <span v-else>Subscribe</span>
        </button>
      </form>
    </div>
    <div v-else class="bg-success-50 text-success-700 p-4 rounded-lg animate-fade-in">
      <p class="font-medium">Thank you for subscribing!</p>
      <p class="text-sm">You'll start receiving our weekly teachings in your inbox.</p>
    </div>
  </div>
</template>