import { defineStore } from 'pinia'
import { ref } from 'vue'

const USERNAME = 'demo'
const PASSWORD = 'demo'
const AUTH_KEY = 'auth_user'

export const useAuthStore = defineStore('auth', () => {
  const loggedIn = ref<boolean>(!!localStorage.getItem(AUTH_KEY))

  const login = async (username: string, password: string) => {
    // Simulate API call with 500ms delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Check credentials
    if (username === USERNAME && password === PASSWORD) {
      loggedIn.value = true
      localStorage.setItem(
        AUTH_KEY,
        JSON.stringify({ username, jwt: 'example_token' })
      ) // Localstorage for persistent login
      return { success: true, message: 'Login successful' }
    } else {
      loggedIn.value = false
      throw new Error('Invalid username or password')
    }
  }

  const logout = () => {
    loggedIn.value = false
    localStorage.removeItem(AUTH_KEY)
  }

  const getUser = () => {
    const stored = localStorage.getItem(AUTH_KEY)
    return stored ? JSON.parse(stored) : null
  }

  return { loggedIn, login, logout, getUser }
})
