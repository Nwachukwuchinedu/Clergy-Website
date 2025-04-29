<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

defineProps<{
  isScrolled: boolean
}>()

const router = useRouter()
const mobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}

const navigateTo = (path: string) => {
  router.push(path)
  closeMobileMenu()
}
</script>

<template>
  <header 
    class="fixed w-full z-50 transition-all duration-300"
    :class="{ 
      'bg-white shadow-md': isScrolled, 
      'bg-transparent': !isScrolled 
    }"
  >
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center py-4">
        <!-- Logo -->
        <router-link to="/" class="flex items-center space-x-2" @click="closeMobileMenu">
          <span class="text-2xl font-serif font-bold" :class="{ 'text-primary-800': isScrolled, 'text-white': !isScrolled }">Pastor's Teachings</span>
        </router-link>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex space-x-8">
          <router-link 
            v-for="item in [
              { name: 'Home', path: '/' },
              { name: 'Teachings', path: '/teachings' },
              { name: 'Series', path: '/series' },
              { name: 'About', path: '/about' },
              { name: 'Contact', path: '/contact' }
            ]" 
            :key="item.name"
            :to="item.path"
            class="font-medium transition-colors duration-200"
            :class="{ 
              'text-primary-700 hover:text-primary-900': isScrolled, 
              'text-white hover:text-secondary-200': !isScrolled 
            }"
            active-class="font-bold"
          >
            {{ item.name }}
          </router-link>
        </nav>

        <!-- Mobile Menu Button -->
        <button 
          class="md:hidden"
          @click="toggleMobileMenu"
          aria-label="Toggle menu"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            class="h-6 w-6" 
            :class="{ 'text-primary-800': isScrolled, 'text-white': !isScrolled }"
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              v-if="!mobileMenuOpen" 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              d="M4 6h16M4 12h16M4 18h16" 
            />
            <path 
              v-else 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              d="M6 18L18 6M6 6l12 12" 
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div 
      v-show="mobileMenuOpen" 
      class="md:hidden bg-white shadow-lg overflow-hidden transition-all duration-300"
      :class="{ 'max-h-96': mobileMenuOpen, 'max-h-0': !mobileMenuOpen }"
    >
      <div class="container mx-auto px-4 py-4 space-y-4">
        <a 
          v-for="item in [
            { name: 'Home', path: '/' },
            { name: 'Teachings', path: '/teachings' },
            { name: 'Series', path: '/series' },
            { name: 'About', path: '/about' },
            { name: 'Contact', path: '/contact' }
          ]" 
          :key="item.name"
          href="#"
          class="block font-medium text-primary-700 hover:text-primary-900"
          @click.prevent="navigateTo(item.path)"
        >
          {{ item.name }}
        </a>
      </div>
    </div>
  </header>
</template>