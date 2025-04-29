<script setup lang="ts">
import { ref } from 'vue'

// Form state
const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const isSubmitting = ref(false)
const hasSubmitted = ref(false)
const error = ref('')

// Subject options
const subjectOptions = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'prayer', label: 'Prayer Request' },
  { value: 'speaking', label: 'Speaking Engagement' },
  { value: 'feedback', label: 'Teaching Feedback' },
  { value: 'other', label: 'Other' }
]

// Submit form
const submitForm = async () => {
  // Validate form
  if (!form.value.name || !form.value.email || !form.value.subject || !form.value.message) {
    error.value = 'Please fill in all fields'
    return
  }
  
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
    error.value = 'Please enter a valid email address'
    return
  }
  
  error.value = ''
  isSubmitting.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Mark as submitted
    hasSubmitted.value = true
    
    // Reset form
    form.value = {
      name: '',
      email: '',
      subject: '',
      message: ''
    }
  } catch (e) {
    error.value = 'Failed to submit the form. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div>
    <!-- Hero Section -->
    <div class="bg-primary-800 text-white py-16">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
        <p class="text-xl text-white/90 max-w-2xl mx-auto">
          We'd love to hear from you. Reach out with questions, prayer requests, or feedback.
        </p>
      </div>
    </div>
    
    <!-- Main Content -->
    <div class="container mx-auto px-4 py-16">
      <div class="max-w-6xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <!-- Contact Form -->
          <div>
            <h2 class="text-2xl font-bold mb-6">Send Us a Message</h2>
            
            <div v-if="hasSubmitted" class="bg-success-50 text-success-700 p-6 rounded-xl animate-fade-in">
              <h3 class="text-xl font-bold mb-2">Thank You!</h3>
              <p>Your message has been sent successfully. We'll respond to you as soon as possible.</p>
            </div>
            
            <form v-else @submit.prevent="submitForm" class="space-y-6">
              <!-- Error Message -->
              <div v-if="error" class="bg-error-50 text-error-700 p-4 rounded-lg">
                {{ error }}
              </div>
              
              <!-- Name -->
              <div>
                <label for="name" class="form-label">Your Name</label>
                <input
                  id="name"
                  v-model="form.name"
                  type="text"
                  class="form-input"
                  required
                />
              </div>
              
              <!-- Email -->
              <div>
                <label for="email" class="form-label">Email Address</label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  class="form-input"
                  required
                />
              </div>
              
              <!-- Subject -->
              <div>
                <label for="subject" class="form-label">Subject</label>
                <select
                  id="subject"
                  v-model="form.subject"
                  class="form-input"
                  required
                >
                  <option value="" disabled>Select a subject</option>
                  <option 
                    v-for="option in subjectOptions"
                    :key="option.value"
                    :value="option.value"
                  >
                    {{ option.label }}
                  </option>
                </select>
              </div>
              
              <!-- Message -->
              <div>
                <label for="message" class="form-label">Message</label>
                <textarea
                  id="message"
                  v-model="form.message"
                  rows="6"
                  class="form-input resize-y"
                  required
                ></textarea>
              </div>
              
              <!-- Submit Button -->
              <div>
                <button
                  type="submit"
                  class="btn btn-primary w-full md:w-auto"
                  :disabled="isSubmitting"
                >
                  <span v-if="isSubmitting">Sending...</span>
                  <span v-else>Send Message</span>
                </button>
              </div>
            </form>
          </div>
          
          <!-- Contact Information -->
          <div>
            <h2 class="text-2xl font-bold mb-6">Get in Touch</h2>
            
            <div class="bg-white rounded-xl shadow-soft p-6 mb-8">
              <div class="space-y-6">
                <!-- Email -->
                <div class="flex items-start">
                  <div class="flex-shrink-0 p-2 bg-primary-100 text-primary-700 rounded-md mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-lg font-bold">Email</h3>
                    <p class="text-neutral-600">contact@pastorsteachings.com</p>
                  </div>
                </div>
                
                <!-- Phone -->
                <div class="flex items-start">
                  <div class="flex-shrink-0 p-2 bg-primary-100 text-primary-700 rounded-md mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-lg font-bold">Phone</h3>
                    <p class="text-neutral-600">(555) 123-4567</p>
                  </div>
                </div>
                
                <!-- Office Hours -->
                <div class="flex items-start">
                  <div class="flex-shrink-0 p-2 bg-primary-100 text-primary-700 rounded-md mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-lg font-bold">Office Hours</h3>
                    <p class="text-neutral-600">Monday - Friday: 9am - 5pm</p>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Social Media -->
            <h2 class="text-2xl font-bold mb-4">Connect With Us</h2>
            <div class="flex space-x-4 mb-8">
              <a href="#" class="p-3 bg-[#3b5998] hover:bg-[#324c82] text-white rounded-full transition-colors">
                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd"></path>
                </svg>
              </a>
              <a href="#" class="p-3 bg-[#1da1f2] hover:bg-[#0c85d0] text-white rounded-full transition-colors">
                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
              <a href="#" class="p-3 bg-[#E4405F] hover:bg-[#d62d50] text-white rounded-full transition-colors">
                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465.668.25 1.256.644 1.772 1.153a4.964 4.964 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.982 4.982 0 01-1.153 1.772 4.964 4.964 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.982 4.982 0 01-1.772-1.153 4.964 4.964 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.964 4.964 0 011.153-1.772A4.982 4.982 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd"></path>
                </svg>
              </a>
              <a href="#" class="p-3 bg-[#FF0000] hover:bg-[#cc0000] text-white rounded-full transition-colors">
                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill-rule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clip-rule="evenodd"></path>
                </svg>
              </a>
            </div>
            
            <!-- Google Map -->
            <h2 class="text-2xl font-bold mb-4">Our Location</h2>
            <div class="rounded-xl overflow-hidden shadow-lg h-80">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.9503398796587!2d-73.9858770!3d40.7488365!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1625848452749!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style="border:0;" 
                allowfullscreen="" 
                loading="lazy"
                title="Map location"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>