<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-50 px-4">
    <div class="text-center max-w-md">
      <h1 class="text-9xl font-extrabold text-blue-600 mb-4">404</h1>
      <h2 class="text-3xl font-bold text-gray-900 mb-4">Page Not Found</h2>
      <p class="text-lg text-gray-600 mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <button
        @click="goHome"
        class="px-6 py-3 text-base font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        {{ authStore.loggedIn ? 'Go to Dashboard' : 'Go to Login' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/store/auth'
import { goHome } from '@/helpers'

const authStore = useAuthStore()
</script>
