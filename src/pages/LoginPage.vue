<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <LoginForm :loading="loading" :error="error" @submit="handleLogin" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import LoginForm from '@/components/forms/LoginForm.vue'

const router = useRouter()
const authStore = useAuthStore()

const error = ref('')
const loading = ref(false)

const handleLogin = async (username: string, password: string) => {
  error.value = ''
  loading.value = true

  try {
    await authStore.login(username, password)
    router.push('/')
  } catch (err) {
    error.value = 'Invalid username or password'
  } finally {
    loading.value = false
  }
}
</script>
