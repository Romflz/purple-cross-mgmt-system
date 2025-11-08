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
              :class="{ 'border-red-500': errors.code }"
              required
            />
            <p v-if="errors.code" class="text-xs text-red-600 mt-1">
              {{ errors.code }}
            </p>
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
                :class="{ 'border-red-500': errors.fullName }"
                required
              />
              <p v-if="errors.fullName" class="text-xs text-red-600 mt-1">
                {{ errors.fullName }}
              </p>
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
                :class="{ 'border-red-500': errors.occupation }"
                required
              />
              <p v-if="errors.occupation" class="text-xs text-red-600 mt-1">
                {{ errors.occupation }}
              </p>
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
                :class="{ 'border-red-500': errors.department }"
                required
              />
              <p v-if="errors.department" class="text-xs text-red-600 mt-1">
                {{ errors.department }}
              </p>
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
                :class="{ 'border-red-500': errors.dateOfEmployment }"
                required
              />
              <p
                v-if="errors.dateOfEmployment"
                class="text-xs text-red-600 mt-1"
              >
                {{ errors.dateOfEmployment }}
              </p>
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
                :class="{ 'border-red-500': errors.terminationDate }"
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
            <p v-if="errors.terminationDate" class="text-xs text-red-600 mt-2">
              {{ errors.terminationDate }}
            </p>
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
import type { Employee, ISODate } from '@/types/employee'
import InfoIcon from '@/icons/info.svg'
import { employeeSchema } from '@/schemas/schema'

interface Props {
  employee: Employee | null | undefined
}

const props = defineProps<Props>()

const emit = defineEmits<{
  create: [data: Employee & { code: string }]
  cancel: []
}>()

// Initialize
const form = reactive<Employee & { code: string }>({
  code: props.employee?.code ?? '',
  fullName: props.employee?.fullName ?? '',
  occupation: props.employee?.occupation ?? '',
  department: props.employee?.department ?? '',
  dateOfEmployment: props.employee?.dateOfEmployment ?? ('' as ISODate),
  terminationDate: props.employee?.terminationDate ?? null,
})

const errors = reactive<Record<string, string>>({})

const clearTerminationDate = () => {
  form.terminationDate = null
}

const handleSubmit = () => {
  const result = employeeSchema.safeParse(form)

  if (!result.success) {
    // Clear errors and set new ones
    Object.keys(errors).forEach((key) => delete errors[key])
    result.error.issues.forEach((issue) => {
      if (issue.path[0]) errors[issue.path[0] as string] = issue.message
    })
    return
  }

  emit('create', result.data as Employee & { code: string })
}
</script>
