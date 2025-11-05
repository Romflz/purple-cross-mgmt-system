<template>
  <DefaultLayout>
    <EmployeeGrid class="mt-4" />

    <!-- Floating Add Button -->
    <button
      @click="addEmployee"
      class="fixed bottom-6 left-6 w-14 h-14 bg-blue-600 hover:bg-blue-700 cursor-pointer text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group"
      aria-label="Add Employee"
    >
      <PlusIcon class="w-6 h-6 group-hover:scale-110 transition-transform" />
    </button>
  </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from '@/components/layouts/DefaultLayout.vue'
import EmployeeGrid from '@/components/EmployeeGrid.vue'

import PlusIcon from '@/icons/plus.svg'

const addEmployee = () => {
  console.log('Add employee clicked')
}
</script>
