<script setup lang="ts">
// Define core values for the pastor
const coreValues = [
  {
    title: 'Biblical Authority',
    description: 'Holding Scripture as the inspired, inerrant Word of God and the final authority for faith and practice.',
    icon: 'book'
  },
  {
    title: 'Christ-Centered Teaching',
    description: 'Focusing on Jesus Christ as the center of all Scripture and the foundation of true spiritual growth.',
    icon: 'cross'
  },
  {
    title: 'Practical Application',
    description: 'Providing clear, actionable ways to apply biblical truth in everyday life and relationships.',
    icon: 'hands'
  },
  {
    title: 'Authentic Community',
    description: 'Fostering genuine relationships where believers can grow together in faith, accountability, and support.',
    icon: 'people'
  }
]
</script>

<template>
  <div>
    <!-- Hero Section -->
    <div class="relative bg-neutral-900 text-white">
      <!-- Background Image with Overlay -->
      <div
        class="absolute inset-0 bg-cover bg-center"
        style="background-image: url('https://images.pexels.com/photos/3471423/pexels-photo-3471423.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')"
      ></div>
      <div class="absolute inset-0 bg-gradient-to-r from-primary-900/95 to-primary-800/90"></div>
      
      <!-- Content -->
      <div class="container mx-auto px-4 py-24 relative z-10">
        <div class="max-w-3xl">
          <h1 class="text-4xl md:text-5xl font-bold text-white mb-6">
            About Pastor Michael
          </h1>
          
          <p class="text-xl text-white/90">
            Meet the pastor behind the teachings and learn about his vision and ministry.
          </p>
        </div>
      </div>
    </div>
    
    <!-- Main Content -->
    <div class="container mx-auto px-4 py-16">
      <div class="max-w-6xl mx-auto">
        <!-- Pastor Bio Section -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <img 
              src="https://images.pexels.com/photos/5327584/pexels-photo-5327584.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Pastor Michael Johnson"
              class="rounded-xl shadow-lg w-full h-auto object-cover"
            />
          </div>
          <div>
            <h2 class="text-3xl font-bold mb-6">Pastor Michael Johnson</h2>
            
            <div class="space-y-4 text-neutral-700">
              <p>
                Pastor Michael Johnson has been teaching the Word of God for over 20 years, helping believers deepen their understanding of Scripture and apply biblical principles to everyday life.
              </p>
              
              <p>
                After receiving his Master of Divinity from Fuller Theological Seminary and Doctorate in Biblical Studies from Dallas Theological Seminary, Pastor Michael dedicated his life to making complex biblical truths accessible and practical for believers at all stages of their spiritual journey.
              </p>
              
              <p>
                His teaching style combines deep theological insights with practical applications, always focusing on how God's Word speaks to contemporary issues and challenges. Known for his warm, engaging approach and clear illustrations, Pastor Michael's teachings have touched thousands of lives across the country and internationally through his books, podcasts, and online ministry.
              </p>
              
              <p>
                When not studying or teaching, Pastor Michael enjoys hiking with his wife Sarah, spending time with their three adult children, and playing guitar. He is also an avid reader with a particular interest in church history and Christian biography.
              </p>
            </div>
          </div>
        </div>
        
        <!-- Core Values Section -->
        <div class="mb-16">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold mb-4">Core Values & Teaching Philosophy</h2>
            <p class="text-neutral-600 max-w-2xl mx-auto">
              The principles that guide Pastor Michael's teaching ministry and approach to Scripture.
            </p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div 
              v-for="(value, index) in coreValues" 
              :key="index"
              class="bg-white rounded-xl p-6 shadow-soft border border-neutral-100 hover:shadow-card transition-shadow"
            >
              <div class="flex items-start">
                <div v-if="value.icon === 'book'" class="flex-shrink-0 mr-4 p-3 bg-primary-100 text-primary-700 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div v-else-if="value.icon === 'cross'" class="flex-shrink-0 mr-4 p-3 bg-secondary-100 text-secondary-700 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m-8-8h16" />
                  </svg>
                </div>
                <div v-else-if="value.icon === 'hands'" class="flex-shrink-0 mr-4 p-3 bg-primary-100 text-primary-700 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                  </svg>
                </div>
                <div v-else-if="value.icon === 'people'" class="flex-shrink-0 mr-4 p-3 bg-secondary-100 text-secondary-700 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                
                <div>
                  <h3 class="text-xl font-bold mb-2">{{ value.title }}</h3>
                  <p class="text-neutral-600">{{ value.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Call to Action -->
        <div class="bg-primary-50 rounded-2xl p-8 md:p-12 text-center">
          <h2 class="text-2xl md:text-3xl font-bold text-primary-900 mb-4">
            Explore Pastor Michael's Teachings
          </h2>
          <p class="text-primary-700 max-w-2xl mx-auto mb-8">
            Dive into a wealth of biblical insights and practical wisdom through Pastor Michael's extensive collection of teachings.
          </p>
          <router-link to="/teachings" class="btn btn-primary px-8 py-3 text-lg">
            Browse Teachings
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>