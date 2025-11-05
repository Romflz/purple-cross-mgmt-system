<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Home Page</h1>
    <ul class="space-y-3">
      <li v-for="employee in employeeStore.employees" :key="employee.code" class="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
        <div class="flex flex-col gap-2">
          <h3 class="text-lg font-semibold text-gray-900">{{ employee.fullName }}</h3>
          <div class="grid grid-cols-2 gap-2 text-sm text-gray-600">
            <p><span class="font-medium">Code:</span> {{ employee.code }}</p>
            <p><span class="font-medium">Occupation:</span> {{ employee.occupation }}</p>
            <p><span class="font-medium">Department:</span> {{ employee.department }}</p>
            <p><span class="font-medium">Hired:</span> {{ employee.dateOfEmployment }}</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useEmployeeStore } from '@/store/employee'
const employeeStore = useEmployeeStore()
</script>
