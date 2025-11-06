<template>
  <div class="max-w-4xl mx-auto p-6">
    <div class="card">
      <form @submit.prevent="handleSubmit" class="p-6">
        <div class="space-y-6">
          <!-- Employee Code -->
          <div class="field-container">
            <label class="field-label"> Employee Code </label>
            <input
              v-model="form.code"
              type="text"
              readonly
              disabled
              class="input-code-readonly"
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
                :readonly="isView"
                :class="standardInputClass"
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
                :readonly="isView"
                :class="standardInputClass"
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
                :readonly="isView"
                :class="standardInputClass"
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
                :readonly="isView"
                :class="standardInputClass"
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
                :readonly="isView"
                :class="
                  isView
                    ? 'input-termination-readonly'
                    : 'input-termination-editable'
                "
              />
              <button
                v-if="!isView && form.terminationDate"
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

        <!-- Actions: Edit -->
        <div v-if="isEdit" class="action-buttons-edit">
          <div class="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button type="submit" class="btn-primary">
              <span>Save Changes</span>
            </button>
            <button
              type="button"
              @click="$emit('cancel')"
              class="btn-secondary"
            >
              Cancel
            </button>
          </div>
          <button
            type="button"
            @click="$emit('delete', employee?.code ?? '')"
            class="btn-danger"
          >
            <span>Delete</span>
          </button>
        </div>

        <!-- Actions: View -->
        <div v-else class="action-buttons">
          <button type="button" @click="$emit('edit')" class="btn-primary">
            <span>Edit Employee</span>
          </button>
          <button type="button" @click="$emit('back')" class="btn-secondary">
            <span>Back to List</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue'
import type { Employee, ISODate, EmployeeFormData } from '@/types/employee'
import InfoIcon from '@/icons/info.svg'

interface Props {
  employee: Employee | null | undefined
  mode: 'edit' | 'view'
}

const props = defineProps<Props>()

const emit = defineEmits<{
  save: [data: EmployeeFormData & { code: string }]
  cancel: []
  edit: []
  back: []
  delete: [id: string]
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

const isEdit = computed(() => props.mode === 'edit')
const isView = computed(() => props.mode === 'view')

const standardInputClass = computed(() =>
  isView.value ? 'input-readonly' : 'input-editable'
)

const clearTerminationDate = () => {
  form.terminationDate = null
}

const handleSubmit = () => {
  emit('save', {
    code: form.code,
    fullName: form.fullName,
    occupation: form.occupation,
    department: form.department,
    dateOfEmployment: form.dateOfEmployment,
    terminationDate: form.terminationDate || null,
  })
}
</script>
