<template>
  <div class="max-w-4xl mx-auto p-6">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-800 mb-2">Employee Details</h1>
      <div class="flex items-center gap-2">
        <div
          :class="[
            'px-3 py-1 rounded-full text-sm font-medium',
            isEditMode
              ? 'bg-blue-100 text-blue-700'
              : 'bg-gray-100 text-gray-700',
          ]"
        >
          {{ isEditMode ? 'Edit Mode' : 'View Mode' }}
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div
      v-if="!employee"
      class="bg-yellow-50 border-l-4 border-yellow-400 rounded-lg p-4"
    >
      <div class="flex items-center">
        <p class="text-yellow-800 font-medium">Employee not found ( ͡° ͜ʖ ͡°)</p>
      </div>
    </div>

    <!-- Employee Form/View -->
    <div
      v-else
      class="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
    >
      <!-- Card Header -->
      <div
        class="bg-linear-to-r from-blue-600 via-blue-700 to-indigo-700 px-6 py-4"
      >
        <h2 class="text-xl font-semibold text-white">Employee Information</h2>
      </div>

      <form @submit.prevent="handleSubmit" class="p-6">
        <div class="space-y-6">
          <!-- Employee Code (Always Readonly) -->
          <div class="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <label class="block text-sm font-semibold text-gray-700 mb-2"
              >Employee Code</label
            >
            <input
              type="text"
              :value="employee.code"
              disabled
              class="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white text-gray-500 cursor-not-allowed font-mono text-lg"
            />
          </div>

          <!-- Two Column Grid for Main Fields -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Full Name -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2"
                >Full Name <span class="text-red-500">*</span>
              </label>
              <input
                v-model="formData.fullName"
                type="text"
                :readonly="!isEditMode"
                :class="[
                  'w-full px-4 py-2.5 border rounded-lg transition-all',
                  isEditMode
                    ? 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white'
                    : 'border-gray-200 bg-gray-50 text-gray-700 cursor-default',
                ]"
                required
              />
            </div>

            <!-- Occupation -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2"
                >Occupation<span class="text-red-500">*</span>
              </label>
              <input
                v-model="formData.occupation"
                type="text"
                :readonly="!isEditMode"
                :class="[
                  'w-full px-4 py-2.5 border rounded-lg transition-all',
                  isEditMode
                    ? 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white'
                    : 'border-gray-200 bg-gray-50 text-gray-700 cursor-default',
                ]"
                required
              />
            </div>

            <!-- Department -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2"
                >Department <span class="text-red-500">*</span>
              </label>
              <input
                v-model="formData.department"
                type="text"
                :readonly="!isEditMode"
                :class="[
                  'w-full px-4 py-2.5 border rounded-lg transition-all',
                  isEditMode
                    ? 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white'
                    : 'border-gray-200 bg-gray-50 text-gray-700 cursor-default',
                ]"
                required
              />
            </div>

            <!-- Date of Employment -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2"
                >Date of Employment <span class="text-red-500">*</span>
              </label>
              <input
                v-model="formData.dateOfEmployment"
                type="date"
                :readonly="!isEditMode"
                :class="[
                  'w-full px-4 py-2.5 border rounded-lg transition-all',
                  isEditMode
                    ? 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white'
                    : 'border-gray-200 bg-gray-50 text-gray-700 cursor-default',
                ]"
                required
              />
            </div>
          </div>

          <!-- Termination Date (Full Width) -->
          <div class="bg-red-50 rounded-lg p-4 border border-red-200">
            <label class="block text-sm font-semibold text-gray-700 mb-2"
              >Termination Date
            </label>
            <div class="flex gap-3 flex-wrap">
              <input
                v-model="formData.terminationDate"
                type="date"
                :readonly="!isEditMode"
                :class="[
                  'flex-1 px-4 py-2.5 border rounded-lg transition-all',
                  isEditMode
                    ? 'border-red-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white'
                    : 'border-red-200 bg-red-50 text-gray-700 cursor-default',
                ]"
              />
              <button
                v-if="isEditMode && formData.terminationDate"
                type="button"
                @click="clearTerminationDate"
                class="px-4 py-2 w-full md:w-24 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all font-medium shadow-sm"
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

        <!-- Action Buttons (Edit Mode) -->
        <div
          v-if="isEditMode"
          class="flex flex-col sm:flex-row sm:justify-between gap-3 pt-6 mt-6 border-t border-gray-200"
        >
          <div class="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button
              type="submit"
              class="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all font-semibold shadow-sm flex items-center justify-center gap-2"
            >
              <span>Save Changes</span>
            </button>
            <button
              type="button"
              @click="$emit('cancel')"
              class="w-full sm:w-auto px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all font-semibold"
            >
              Cancel
            </button>
          </div>

          <button
            type="button"
            @click="$emit('delete', employee.code)"
            class="w-full sm:w-auto px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all font-semibold shadow-sm flex items-center justify-center gap-2"
          >
            <span>Delete</span>
          </button>
        </div>

        <!-- Action Buttons (View Mode) -->
        <div v-else class="flex gap-3 pt-6 mt-6 border-t border-gray-200">
          <button
            type="button"
            @click="$emit('edit')"
            class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all font-semibold shadow-sm flex items-center gap-2"
          >
            <span>Edit Employee</span>
          </button>
          <button
            type="button"
            @click="$emit('back')"
            class="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all font-semibold flex items-center gap-2"
          >
            <span>Back to List</span>
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
  isEditMode: boolean
}

const props = defineProps<Props>()

const formData = reactive<EmployeeFormData>({
  fullName: props.employee?.fullName ?? '',
  occupation: props.employee?.occupation ?? '',
  department: props.employee?.department ?? '',
  dateOfEmployment: (props.employee?.dateOfEmployment ?? '') as ISODate,
  terminationDate: props.employee?.terminationDate ?? null,
})

const emit = defineEmits<{
  save: [data: EmployeeFormData]
  cancel: []
  edit: []
  back: []
  delete: [id: string]
}>()

// Clear termination date
const clearTerminationDate = () => {
  formData.terminationDate = null
}

// Handle form submission
const handleSubmit = () => {
  const dataToSave: EmployeeFormData = {
    fullName: formData.fullName,
    occupation: formData.occupation,
    department: formData.department,
    dateOfEmployment: formData.dateOfEmployment,
    terminationDate: formData.terminationDate || null,
  }

  emit('save', dataToSave)
}
</script>
