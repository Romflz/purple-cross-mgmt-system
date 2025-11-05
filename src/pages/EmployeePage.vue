<template>
  <DefaultLayout>
    <EmployeeForm :employee="employee" :is-edit-mode="isEditMode" @delete="deleteEmployee" @save="saveEmployee" @cancel="cancelEdit" @edit="goToEditMode" @back="goBack" />
  </DefaultLayout>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
import { useEmployeeStore } from '@/store/employee'
import EmployeeForm from '@/components/forms/EmployeeForm.vue'
import DefaultLayout from '@/components/layouts/DefaultLayout.vue'
import type { EmployeeFormData } from '@/types/employee'

const route = useRoute()
const router = useRouter()
const employeeStore = useEmployeeStore()

// Capture route data
const employeeId = computed(() => route.params.id as string)
const isEditMode = computed(() => route.query.edit === 'true')

// Find employee from store
const employee = computed(() => employeeStore.employees.find((emp) => emp.code === employeeId.value))

// Save employee changes
const saveEmployee = (data: EmployeeFormData) => {
  if (!employee.value) return

  employeeStore.updateEmployee(employee.value.code, data)

  // Navigate back to view mode
  router.push(`/employee/${employeeId.value}`)
}

const deleteEmployee = (employeeId: string) => {
  // TODO: Alert confirm modal
  // Go back after
  console.log('Delete Clicked', employeeId)
  goBack()
}

// Cancel editing
const cancelEdit = () => {
  // Navigate back to view mode
  router.push(`/employee/${employeeId.value}`)
}

// Switch to edit mode
const goToEditMode = () => {
  router.push({
    path: `/employee/${employeeId.value}`,
    query: { edit: 'true' },
  })
}

// Go back to employee list
const goBack = () => {
  router.push('/')
}
</script>
