import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

// Import page components
import Home from '../views/Home.vue'

// Define routes
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Home - Pastor\'s Teachings'
    }
  },
  {
    path: '/teachings',
    name: 'Teachings',
    component: () => import('../views/Teachings.vue'),
    meta: {
      title: 'Teachings Archive'
    }
  },
  {
    path: '/teaching/:slug',
    name: 'Teaching',
    component: () => import('../views/SingleTeaching.vue'),
    meta: {
      title: 'Teaching'
    }
  },
  {
    path: '/series',
    name: 'Series',
    component: () => import('../views/Series.vue'),
    meta: {
      title: 'Teaching Series'
    }
  },
  {
    path: '/series/:slug',
    name: 'SeriesDetail',
    component: () => import('../views/SeriesDetail.vue'),
    meta: {
      title: 'Series Detail'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
    meta: {
      title: 'About the Pastor'
    }
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('../views/Contact.vue'),
    meta: {
      title: 'Contact Us'
    }
  },
  {
    path: '/privacy-policy',
    name: 'PrivacyPolicy',
    component: () => import('../views/PrivacyPolicy.vue'),
    meta: {
      title: 'Privacy Policy'
    }
  },
  {
    path: '/terms-of-service',
    name: 'TermsOfService',
    component: () => import('../views/TermsOfService.vue'),
    meta: {
      title: 'Terms of Service'
    }
  },
  // Catch-all route for 404
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue'),
    meta: {
      title: 'Page Not Found'
    }
  }
]

// Create router instance
const router = createRouter({
  history: createWebHistory(),
  routes,
  // Smooth scrolling to top when navigating between pages
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  }
})

// Update document title based on route meta
router.beforeEach((_to, _from, next) => {
  document.title = _to.meta.title as string || 'Pastor\'s Teaching Website'
  next()
})

export default router