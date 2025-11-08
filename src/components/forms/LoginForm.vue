<template>
  <div class="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md border border-gray-100">
    <!-- Header -->
    <div class="text-center mb-10">
      <div class="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-blue-500 to-blue-600 rounded-full mb-4">
        <LockIcon class="w-8 h-8 text-white" />
      </div>
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
      <p class="text-gray-500">Sign in to continue to your account</p>
    </div>

    <!-- Form -->
    <form @submit.prevent="handleSubmit" class="space-y-5">
      <!-- Username -->
      <div>
        <label for="username" class="block text-sm font-semibold text-gray-700 mb-2"> Username </label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <UserIcon class="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="username"
            v-model="username"
            type="text"
            required
            class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 hover:border-gray-400"
            placeholder="Enter your username"
          />
        </div>
      </div>

      <!-- Password -->
      <div>
        <label for="password" class="block text-sm font-semibold text-gray-700 mb-2"> Password </label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <LockIcon class="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="password"
            v-model="password"
            type="password"
            required
            class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 hover:border-gray-400"
            placeholder="Enter your password"
          />
        </div>
      </div>

      <!-- Error Message -->
      <div v-if="error" class="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl">
        <ErrorIcon class="w-5 h-5 text-red-500 shrink-0" />
        <span class="text-red-700 text-sm font-medium">{{ error }}</span>
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        :disabled="loading"
        class="w-full bg-linear-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 focus:ring-4 focus:ring-blue-300 transform transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
      >
        <span v-if="loading" class="flex items-center justify-center gap-2">
          <LoaderIcon class="animate-spin h-5 w-5" />
          Signing in...
        </span>
        <span v-else>Sign In</span>
      </button>
    </form>

    <!-- Demo Credentials -->
    <div class="mt-8 p-4 bg-linear-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
      <div class="flex items-start gap-3">
        <InfoIcon class="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
        <div class="text-sm">
          <p class="font-semibold text-gray-700 mb-1">Demo Credentials</p>
          <p class="text-gray-600">Username: <span class="font-mono font-semibold text-blue-600">demo</span></p>
          <p class="text-gray-600">Password: <span class="font-mono font-semibold text-blue-600">demo</span></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import LockIcon from '@/icons/lock.svg'
import UserIcon from '@/icons/user.svg'
import LoaderIcon from '@/icons/loader.svg'
import InfoIcon from '@/icons/info.svg'
import ErrorIcon from '@/icons/error.svg'

interface Props {
  loading?: boolean
  error?: string
}

defineProps<Props>()

const emit = defineEmits<{
  submit: [username: string, password: string]
}>()

const username = ref('')
const password = ref('')

const handleSubmit = () => {
  emit('submit', username.value, password.value)
}
</script>
