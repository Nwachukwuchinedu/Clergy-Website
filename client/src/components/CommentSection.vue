<script setup lang="ts">
import { ref } from 'vue'

const comments = ref([
  {
    id: 1,
    author: 'John Smith',
    date: '2023-03-15T14:22:00Z',
    content: 'Thank you for this teaching! It really helped me understand this passage better.',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2'
  },
  {
    id: 2,
    author: 'Sarah Johnson',
    date: '2023-03-14T09:15:00Z',
    content: 'I\'ve been struggling with this concept for a while, and your explanation brought clarity. God bless you for sharing this wisdom!',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2'
  }
])

const newComment = ref({
  name: '',
  email: '',
  content: ''
})

const isSubmitting = ref(false)
const showSuccess = ref(false)
const error = ref('')

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date)
}

const submitComment = async () => {
  // Validate form
  if (!newComment.value.name || !newComment.value.email || !newComment.value.content) {
    error.value = 'Please fill in all fields'
    return
  }
  
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newComment.value.email)) {
    error.value = 'Please enter a valid email address'
    return
  }
  
  error.value = ''
  isSubmitting.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Add new comment to the list (in a real app, this would come from the API)
    comments.value.unshift({
      id: comments.value.length + 1,
      author: newComment.value.name,
      date: new Date().toISOString(),
      content: newComment.value.content,
      avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2'
    })
    
    // Reset form
    newComment.value = {
      name: '',
      email: '',
      content: ''
    }
    
    showSuccess.value = true
    setTimeout(() => {
      showSuccess.value = false
    }, 3000)
  } catch (e) {
    error.value = 'Failed to submit comment. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="mt-12 pt-8 border-t border-neutral-200">
    <h3 class="text-2xl font-bold mb-6">Comments ({{ comments.length }})</h3>
    
    <!-- Comment Form -->
    <div class="bg-neutral-50 rounded-xl p-6 mb-8">
      <h4 class="text-lg font-bold mb-4">Leave a Comment</h4>
      
      <form @submit.prevent="submitComment" class="space-y-4">
        <!-- Success Message -->
        <div v-if="showSuccess" class="bg-success-50 text-success-700 p-4 rounded-lg animate-fade-in">
          Your comment has been posted successfully!
        </div>
        
        <!-- Error Message -->
        <div v-if="error" class="bg-error-50 text-error-700 p-4 rounded-lg">
          {{ error }}
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="name" class="form-label">Name</label>
            <input
              id="name"
              v-model="newComment.name"
              type="text"
              class="form-input"
              required
            />
          </div>
          
          <div>
            <label for="email" class="form-label">Email (will not be published)</label>
            <input
              id="email"
              v-model="newComment.email"
              type="email"
              class="form-input"
              required
            />
          </div>
        </div>
        
        <div>
          <label for="comment" class="form-label">Comment</label>
          <textarea
            id="comment"
            v-model="newComment.content"
            rows="4"
            class="form-input resize-y"
            required
          ></textarea>
        </div>
        
        <div>
          <button 
            type="submit" 
            class="btn btn-primary"
            :disabled="isSubmitting"
          >
            <span v-if="isSubmitting">Submitting...</span>
            <span v-else>Post Comment</span>
          </button>
        </div>
      </form>
    </div>
    
    <!-- Comments List -->
    <div class="space-y-6">
      <div v-if="comments.length === 0" class="text-center py-8 text-neutral-500">
        No comments yet. Be the first to comment!
      </div>
      
      <div v-for="comment in comments" :key="comment.id" class="flex space-x-4 p-4 rounded-lg hover:bg-neutral-50 transition-colors">
        <!-- Avatar -->
        <div class="flex-shrink-0">
          <img 
            :src="comment.avatar" 
            :alt="comment.author"
            class="w-10 h-10 rounded-full object-cover" 
          />
        </div>
        
        <!-- Comment Content -->
        <div class="flex-grow">
          <div class="flex flex-wrap justify-between mb-2">
            <h5 class="font-bold text-neutral-800">{{ comment.author }}</h5>
            <time class="text-sm text-neutral-500">{{ formatDate(comment.date) }}</time>
          </div>
          <p class="text-neutral-700">{{ comment.content }}</p>
        </div>
      </div>
    </div>
  </div>
</template>