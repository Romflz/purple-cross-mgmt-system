<template>
  <DefaultLayout>
    <template v-if="error">
      <div>
        <p>{{ error }}</p>
      </div>
    </template>
    <template v-if="!employee && mode !== 'create'">
      <div class="alert-warning mt-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between gap-4">
          <p class="text-yellow-800 font-medium">Employee not found ( ͡° ͜ʖ ͡°)</p>
          <button class="btn-secondary">Go home</button>
        </div>
      </div>
    </template>
    <template v-else>
      <CreateEmployeeForm
        v-if="mode == 'create'"
        :employee="employee"
        @create="saveEmployee"
        @cancel="goHome"
      >
      </CreateEmployeeForm>
      <EditViewEmployeeForm
        v-else
        @delete="deleteEmployee"
        @back="goHome"
        @edit="goToEditMode"
        @save="saveEmployee"
        @cancel="cancelEdit"
        :employee="employee"
        :mode="mode"
      ></EditViewEmployeeForm>
    </template>
  </DefaultLayout>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { computed, ref } from 'vue'
import { useEmployeeStore } from '@/store/employee'
import CreateEmployeeForm from '@/components/forms/CreateEmployeeForm.vue'
import DefaultLayout from '@/components/layouts/DefaultLayout.vue'
import EditViewEmployeeForm from '@/components/forms/EditViewEmployeeForm.vue'
import type { EmployeeFormData, Modes } from '@/types/employee'

const props = defineProps<{
  mode: Modes
}>()

console.log('mode', props)
const route = useRoute()
const router = useRouter()
const employeeStore = useEmployeeStore()

const error = ref('')

// Capture route data
const employeeId = computed(() => route.params.id as string)

// Find employee from store
const employee = computed(() => {
  if (props.mode === 'create') return null
  return employeeStore.employees.find((emp) => emp.code === employeeId.value)
})

// Save employee changes
const saveEmployee = (data: EmployeeFormData) => {
  if (props.mode === 'create') {
    const response = employeeStore.createEmployee(data)

    if (!response.success) {
      error.value = response.error!
      return
    }

    router.push('/')
  } else {
    // Update existing employee
    if (!employee.value) return

    employeeStore.updateEmployee(employee.value.code, data)
    router.push(`/employee/${employeeId.value}`)
  }
}

const deleteEmployee = (employeeCode: string) => {
  // TODO: Alert confirm modal
  employeeStore.deleteEmployee(employeeCode)
  goHome()
}

// Cancel editing
const cancelEdit = () => {
  if (props.mode === 'create') {
    router.push('/')
  } else {
    router.push(`/employee/${employeeId.value}`)
  }
}

// Switch to edit mode
const goToEditMode = () => {
  router.push(`/employee/${employeeId.value}/edit`)
}

// Go back to employee list
const goHome = () => {
  router.push('/')
}
</script>
