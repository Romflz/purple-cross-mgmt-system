<template>
  <div class="bg-white rounded-xl overflow-hidden max-w-7xl mx-auto">
    <!-- Header -->
    <div class="border-b border-gray-200">
      <div class="px-6 py-4">
        <h2 class="text-lg font-semibold text-gray-900">Employee Management</h2>
        <p class="text-sm text-gray-600 mt-1">Manage your team members and their information</p>
      </div>
    </div>

    <!-- Column Headers - Desktop Only -->
    <div class="hidden lg:grid lg:grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider">
      <div class="col-span-3">Employee</div>
      <div class="col-span-2">Occupation</div>
      <div class="col-span-2">Department</div>
      <div class="col-span-2">Employment Status</div>
      <div class="col-span-2">Termination</div>
      <div class="col-span-1 text-center">Actions</div>
    </div>

    <!-- Employee List -->
    <div class="divide-y divide-gray-100">
      <EmployeeCard v-for="employee in employeeStore.employees" :key="employee.code" :employee="employee" @view="viewEmployee" @edit="editEmployee" @delete="deleteEmployee" />
    </div>

    <!-- Empty State -->
    <div v-if="employeeStore.employees.length === 0" class="px-6 py-16">
      <div class="text-center">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        <h3 class="mt-4 text-lg font-medium text-gray-900">No employees found</h3>
        <p class="mt-2 text-sm text-gray-500">Get started by adding your first team member</p>
        <button
          class="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          <svg class="mr-2 -ml-1 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Employee
        </button>
      </div>
    </div>

    <!-- Footer with count -->
    <div v-if="employeeStore.employees.length > 0" class="px-6 py-3 bg-gray-50 border-t border-gray-200">
      <p class="text-sm text-gray-600">
        Showing <span class="font-medium text-gray-900">{{ employeeStore.employees.length }}</span> employee{{ employeeStore.employees.length !== 1 ? 's' : '' }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import EmployeeCard from './EmployeeCard.vue'
import { useEmployeeStore } from '@/store/employee'

const employeeStore = useEmployeeStore()

const viewEmployee = (employeeCode: string) => {
  console.log('View employee:', employeeCode)
  // TODO: Navigate to employee profile
}

const editEmployee = (employeeCode: string) => {
  console.log('Edit employee:', employeeCode)
  // TODO: Navigate to employee profile in edit mode
}

const deleteEmployee = (employeeCode: string) => {
  console.log('Delete employee:', employeeCode)
  // TODO: Show confirmation dialog
}
</script>
