<template>
  <DefaultLayout>
    <div class="min-h-screen flex items-center justify-center p-4">
      <div
        class="max-w-md w-full bg-white border border-gray-200 rounded-xl shadow-sm p-8"
      >
        <div class="flex items-center space-x-4 mb-6">
          <div
            class="w-20 h-20 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-2xl font-bold text-white"
          >
            {{ vendorStore.userName[0] }}
          </div>
          <div>
            <h3 class="text-xl font-bold text-gray-900">
              {{ vendorStore.userName }}
            </h3>
            <p class="text-sm text-gray-500">{{ vendorStore.role }}</p>
          </div>
        </div>

        <div class="space-y-3 mb-6 pb-6 border-b border-gray-200">
          <div class="flex items-center text-sm text-gray-700">
            <span class="font-medium text-gray-900 w-24">Username:</span>
            <span class="text-gray-600">{{ vendorStore.userName }}</span>
          </div>
        </div>

        <div class="flex gap-3">
          <button
            @click="handleLogout"
            class="flex-1 cursor-pointer bg-white hover:bg-gray-50 text-gray-700 font-medium py-2.5 px-4 rounded-lg border border-gray-300 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from '@/components/layouts/DefaultLayout.vue'
import { useVendorStore } from '@/store/vendor'
import { useAuthStore } from '@/store/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const vendorStore = useVendorStore()
const router = useRouter()

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>
