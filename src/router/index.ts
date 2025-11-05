import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/store/auth'

import HomePage from '@/pages/DashboardPage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import ExportPage from '@/pages/ExportPage.vue'
import ProfilePage from '@/pages/ProfilePage.vue'
import EmployeePage from '@/pages/EmployeePage.vue'

// By defualt, we always need auth, except login page
const routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/login',
    component: LoginPage,
    meta: { requiresAuth: false },
  },
  {
    path: '/import-export',
    component: ExportPage,
  },
  {
    path: '/profile',
    component: ProfilePage,
  },
  {
    path: '/employee/:id',
    component: EmployeePage,
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Check authentication before each route
router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore()
  const requiresAuth = to.meta.requiresAuth !== false // Default to true

  if (requiresAuth && !authStore.loggedIn) {
    // Not logged in, trying to access protected route, we redirect to login
    next('/login')
  } else if (to.path === '/login' && authStore.loggedIn) {
    // Logged in, trying to access login we redirect to home
    next('/')
  } else {
    // All good, proceed
    next()
  }
})
