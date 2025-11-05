import { defineStore } from 'pinia'
import { ref } from 'vue'

const USERNAME = 'demo'
const PASSWORD = 'demo'

export const useAuthStore = defineStore('auth', () => {
  const loggedIn = ref<boolean>(false)

  async function login(username: string, password: string) {
    // Simulate API call with 500ms delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Check credentials
    if (username === USERNAME && password === PASSWORD) {
      loggedIn.value = true
      return { success: true, message: 'Login successful' }
    } else {
      loggedIn.value = false
      throw new Error('Invalid username or password')
    }
  }

  function logout() {
    loggedIn.value = false
  }

  return { loggedIn, login, logout }
})
