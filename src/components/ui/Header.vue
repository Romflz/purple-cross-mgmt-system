<template>
  <header
    class="bg-linear-to-r from-blue-600 via-blue-700 to-indigo-700 shadow-lg sticky top-0 z-50"
  >
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <!-- Logo & Desktop Nav -->
        <div class="flex items-center">
          <!-- Logo -->
          <div class="shrink-0 flex items-center">
            <router-link to="/" class="flex items-center gap-3 group">
              <div
                class="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-200"
              >
                <span
                  class="text-xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                >
                  {{ vendoreStore.vendorName[0] }}</span
                >
              </div>
              <span class="text-xl font-bold text-white hidden sm:block">{{
                vendoreStore.vendorName
              }}</span>
            </router-link>
          </div>

          <!-- Desktop Navigation -->
          <div class="hidden lg:ml-10 lg:flex lg:space-x-1">
            <router-link
              to="/"
              class="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-blue-100 hover:bg-white/10 hover:text-white"
              active-class="bg-white/20 text-white shadow-md backdrop-blur-sm"
            >
              <DashboardIcon class="w-4 h-4 mr-2" />
              Dashboard
            </router-link>
            <router-link
              to="/import-export"
              class="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-blue-100 hover:bg-white/10 hover:text-white"
              active-class="bg-white/20 text-white shadow-md backdrop-blur-sm"
            >
              <ImportExportIcon class="w-4 h-4 mr-2" />
              Import/Export
            </router-link>
            <router-link
              to="/profile"
              class="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-blue-100 hover:bg-white/10 hover:text-white"
              active-class="bg-white/20 text-white shadow-md backdrop-blur-sm"
            >
              <UserIcon class="w-4 h-4 mr-2" />
              Profile
            </router-link>
          </div>
        </div>

        <!-- Desktop User & Logout -->
        <div class="hidden lg:flex lg:items-center lg:gap-4">
          <!-- User Info -->
          <div
            class="flex items-center gap-3 px-3 py-1.5 bg-white/10 rounded-lg backdrop-blur-sm"
          >
            <div
              class="w-8 h-8 bg-linear-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-md"
            >
              {{ vendoreStore.userName[0] }}
            </div>
            <span class="text-sm font-medium text-white">{{
              vendoreStore.userName
            }}</span>
          </div>

          <!-- Logout Button -->
          <button
            @click="handleLogout"
            class="inline-flex items-center gap-2 px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-all duration-200 text-sm font-medium backdrop-blur-sm shadow-md hover:shadow-lg hover:scale-105"
          >
            <LogoutIcon class="w-4 h-4" />
            Logout
          </button>
        </div>

        <!-- Mobile menu button -->
        <div class="flex items-center lg:hidden">
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="inline-flex items-center justify-center p-2 rounded-lg text-blue-100 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-all duration-200"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="h-6 w-6 transition-transform duration-200"
              :class="{ 'rotate-90': mobileMenuOpen }"
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
    </nav>

    <!-- Mobile menu -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-1"
    >
      <div
        v-show="mobileMenuOpen"
        class="lg:hidden border-t border-white/20 bg-linear-to-b from-blue-700 to-indigo-700"
      >
        <div class="px-2 pt-2 pb-3 space-y-1">
          <!-- User Info Mobile -->
          <div
            class="flex items-center gap-3 px-3 py-3 mb-2 bg-white/10 rounded-lg backdrop-blur-sm"
          >
            <div
              class="w-10 h-10 bg-linear-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-semibold shadow-md"
            >
              U
            </div>
            <div>
              <p class="text-sm font-semibold text-white">Demo User</p>
              <p class="text-xs text-blue-200">demo@example.com</p>
            </div>
          </div>

          <router-link
            to="/"
            @click="mobileMenuOpen = false"
            class="flex items-center px-3 py-3 rounded-lg text-base font-medium transition-all duration-200 text-blue-100 hover:bg-white/10 hover:text-white"
            active-class="bg-white/20 text-white shadow-md"
          >
            <DashboardIcon class="w-5 h-5 mr-3" />
            Dashboard
          </router-link>

          <router-link
            to="/import-export"
            @click="mobileMenuOpen = false"
            class="flex items-center px-3 py-3 rounded-lg text-base font-medium transition-all duration-200 text-blue-100 hover:bg-white/10 hover:text-white"
            active-class="bg-white/20 text-white shadow-md"
          >
            <ImportExportIcon class="w-5 h-5 mr-3" />
            Import/Export
          </router-link>

          <router-link
            to="/profile"
            @click="mobileMenuOpen = false"
            class="flex items-center px-3 py-3 rounded-lg text-base font-medium transition-all duration-200 text-blue-100 hover:bg-white/10 hover:text-white"
            active-class="bg-white/20 text-white shadow-md"
          >
            <UserIcon class="w-5 h-5 mr-3" />
            Profile
          </router-link>

          <!-- Mobile Logout -->
          <button
            @click="handleLogout"
            class="w-full flex items-center px-3 py-3 rounded-lg text-base font-medium text-red-200 hover:bg-red-600/30 hover:text-white transition-all duration-200 mt-2"
          >
            <LogoutIcon class="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import { useVendorStore } from '@/store/vendor'

import DashboardIcon from '@/icons/dashboard.svg'
import UserIcon from '@/icons/user.svg'
import LogoutIcon from '@/icons/logout.svg'
import ImportExportIcon from '@/icons/import-export.svg'

const router = useRouter()
const authStore = useAuthStore()
const vendoreStore = useVendorStore()

const mobileMenuOpen = ref(false)

function handleLogout() {
  authStore.logout()
  router.push('/login')
  mobileMenuOpen.value = false
}
</script>
