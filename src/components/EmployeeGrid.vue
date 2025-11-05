<template>
  <div class="bg-white rounded-xl overflow-hidden max-w-7xl mx-auto">
    <!-- Header -->
    <div class="border-b border-gray-200">
      <div class="px-6 py-4">
        <h2 class="text-lg font-semibold text-gray-900">Employee Management</h2>
        <p class="text-sm text-gray-600 mt-1">Manage your team members and their information</p>

        <!-- Filter Controls -->
        <EmployeeFilters
          v-model:search="search"
          v-model:department="filterDepartment"
          v-model:terminated="filterTerminated"
          v-model:sortBy="sortBy"
          v-model:sortDir="sortDir"
          :departments="departments"
          @reset="resetFilters"
        />
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
      <EmployeeCard v-for="employee in filteredSorted" :key="employee.code" :employee="employee" @view="viewEmployee" @edit="editEmployee" @delete="deleteEmployee" />
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
    <div v-if="filteredSorted.length > 0" class="px-6 py-3 bg-gray-50 border-t border-gray-200">
      <p class="text-sm text-gray-600">
        Showing <span class="font-medium text-gray-900">{{ filteredSorted.length }}</span> employee{{ filteredSorted.length !== 1 ? 's' : '' }}
      </p>
    </div>
    <div v-else>
      <p class="text-sm text-gray-600 text-center mt-4">No results found</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import EmployeeCard from './EmployeeCard.vue'
import EmployeeFilters from './FilterControls.vue'
import { useEmployeeStore } from '@/store/employee'
import { getStatus } from '@/helpers'
import type { EmployeeStatus } from '@/types/employee'

const employeeStore = useEmployeeStore()

// ---- Filter Control ----
const search = ref('')
const filterDepartment = ref<'all' | string>('all')
const filterTerminated = ref<'all' | 'yes' | 'no'>('all')
const sortBy = ref<'name' | 'start' | 'termination' | 'department' | 'status'>('name')
const sortDir = ref<'asc' | 'desc'>('asc')

// ---- Departments list derived from store ----
const departments = employeeStore.departments

const filteredSorted = computed(() => {
  let rows = employeeStore.employees.slice() // clone so sort doesn't mutate store

  // Search by name or code
  if (search.value.trim()) {
    const q = search.value.trim().toLowerCase()
    rows = rows.filter((e) => e.fullName.toLowerCase().includes(q) || e.code.toLowerCase().includes(q))
  }

  // Department filter
  if (filterDepartment.value !== 'all') {
    rows = rows.filter((e) => e.department === filterDepartment.value)
  }

  // Terminated filter
  if (filterTerminated.value !== 'all') {
    rows = rows.filter((e) => (filterTerminated.value === 'yes' ? !!e.terminationDate : !e.terminationDate))
  }

  // Sort
  const dir = sortDir.value === 'asc' ? 1 : -1
  rows.sort((a, b) => {
    switch (sortBy.value) {
      case 'name':
        return a.fullName.localeCompare(b.fullName) * dir
      case 'department':
        return a.department.localeCompare(b.department) * dir
      case 'start':
        return (a.dateOfEmployment > b.dateOfEmployment ? 1 : -1) * dir
      case 'termination': {
        // Nulls last
        const ta = a.terminationDate ?? '9999-12-31'
        const tb = b.terminationDate ?? '9999-12-31'
        return (ta > tb ? 1 : -1) * dir
      }
      case 'status': {
        const order = ['active', 'leaving', 'starting', 'inactive', 'left'] satisfies EmployeeStatus[]
        return (order.indexOf(getStatus(a)) - order.indexOf(getStatus(b))) * dir
      }
    }
  })

  return rows
})

function resetFilters() {
  search.value = ''
  filterDepartment.value = 'all'
  filterTerminated.value = 'all'
  sortBy.value = 'name'
  sortDir.value = 'asc'
}

// ---- existing handlers
const viewEmployee = (employeeCode: string) => {
  console.log('View employee:', employeeCode)
}
const editEmployee = (employeeCode: string) => {
  console.log('Edit employee:', employeeCode)
}
const deleteEmployee = (employeeCode: string) => {
  console.log('Delete employee:', employeeCode)
}
</script>
