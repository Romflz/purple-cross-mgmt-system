<template>
  <div class="max-w-4xl mx-auto p-6">
    <div class="card">
      <form @submit.prevent="handleSubmit" class="p-6">
        <div class="space-y-6">
          <!-- Employee Code -->
          <div class="field-container">
            <label class="field-label">
              Employee Code
              <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.code"
              type="text"
              class="input-code-editable"
              required
            />
          </div>

          <!-- Main Fields -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Full Name -->
            <div>
              <label class="field-label"
                >Full Name <span class="text-red-500">*</span></label
              >
              <input
                v-model="form.fullName"
                type="text"
                class="input-editable"
                required
              />
            </div>

            <!-- Occupation -->
            <div>
              <label class="field-label"
                >Occupation <span class="text-red-500">*</span></label
              >
              <input
                v-model="form.occupation"
                type="text"
                class="input-editable"
                required
              />
            </div>

            <!-- Department -->
            <div>
              <label class="field-label"
                >Department <span class="text-red-500">*</span></label
              >
              <input
                v-model="form.department"
                type="text"
                class="input-editable"
                required
              />
            </div>

            <!-- Date of Employment -->
            <div>
              <label class="field-label"
                >Date of Employment <span class="text-red-500">*</span></label
              >
              <input
                v-model="form.dateOfEmployment"
                type="date"
                class="input-editable"
                required
              />
            </div>
          </div>

          <!-- Termination Date -->
          <div class="termination-container">
            <label class="field-label">Termination Date</label>
            <div class="flex gap-3 flex-wrap">
              <input
                v-model="form.terminationDate"
                type="date"
                class="input-termination-editable"
              />
              <button
                v-if="form.terminationDate"
                type="button"
                @click="clearTerminationDate"
                class="btn-danger-small"
                title="Clear termination date"
              >
                Clear
              </button>
            </div>
            <p class="text-xs text-red-600 mt-2 flex items-center gap-1">
              <InfoIcon class="w-4 h-4" />
              <span>Leave empty if employee is still active</span>
            </p>
          </div>
        </div>

        <!-- Actions: Create -->
        <div class="action-buttons">
          <button type="submit" class="btn-success">
            <span>Create Employee</span>
          </button>
          <button type="button" @click="$emit('cancel')" class="btn-secondary">
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import type { Employee, ISODate, EmployeeFormData } from '@/types/employee'
import InfoIcon from '@/icons/info.svg'

interface Props {
  employee: Employee | null | undefined
}

const props = defineProps<Props>()

const emit = defineEmits<{
  create: [data: EmployeeFormData & { code: string }]
  cancel: []
}>()

// Initialize
const form = reactive<EmployeeFormData & { code: string }>({
  code: props.employee?.code ?? '',
  fullName: props.employee?.fullName ?? '',
  occupation: props.employee?.occupation ?? '',
  department: props.employee?.department ?? '',
  dateOfEmployment: props.employee?.dateOfEmployment ?? ('' as ISODate),
  terminationDate: props.employee?.terminationDate ?? null,
})

const clearTerminationDate = () => {
  form.terminationDate = null
}

const handleSubmit = () => {
  emit('create', {
    code: form.code,
    fullName: form.fullName,
    occupation: form.occupation,
    department: form.department,
    dateOfEmployment: form.dateOfEmployment,
    terminationDate: form.terminationDate || null,
  })
}
</script>
