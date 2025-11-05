<template>
  <!-- Desktop Layout -->
  <div class="hidden lg:grid lg:grid-cols-12 gap-4 px-6 py-4 hover:bg-blue-50/50 transition-all duration-200 items-center group">
    <!-- Employee Info -->
    <div class="col-span-3 flex items-center space-x-3">
      <div class="shrink-0">
        <div class="h-10 w-10 rounded-full bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold shadow-sm">
          {{ getInitials(employee.fullName) }}
        </div>
      </div>
      <div class="min-w-0 flex-1">
        <p class="text-sm font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
          {{ employee.fullName }}
        </p>
        <p class="text-xs text-gray-500 truncate">ID: {{ employee.code }}</p>
      </div>
    </div>

    <!-- Occupation -->
    <div class="col-span-2">
      <p class="text-sm text-gray-700 truncate">{{ employee.occupation }}</p>
    </div>

    <!-- Department -->
    <div class="col-span-2">
      <p class="text-sm text-gray-700 truncate">{{ employee.department }}</p>
    </div>

    <!-- Employment Status -->
    <div class="col-span-2">
      <span :class="employment.class">
        {{ employment.label }}
      </span>
      <p class="text-xs text-gray-500 mt-1">{{ formatDate(employee.dateOfEmployment) }}</p>
    </div>

    <!-- Termination Status -->
    <div class="col-span-2">
      <template v-if="termination">
        <span :class="termination.class">
          {{ termination.label }}
        </span>
        <p class="text-xs text-gray-500 mt-1">{{ formatDate(employee.terminationDate!) }}</p>
      </template>
      <span v-else class="text-sm text-gray-400">—</span>
    </div>

    <!-- Actions -->
    <div class="col-span-1 flex items-center justify-center gap-1">
      <button
        @click="$emit('view', employee.code)"
        class="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-100 rounded-lg transition-all duration-200 cursor-pointer"
        title="View"
      >
        <EyeIcon class="w-4 h-4" />
      </button>
      <button
        @click="$emit('edit', employee.code)"
        class="p-1.5 text-gray-500 hover:text-green-600 hover:bg-green-100 rounded-lg transition-all duration-200 cursor-pointer"
        title="Edit"
      >
        <PencilIcon class="w-4 h-4" />
      </button>
      <button
        @click="$emit('delete', employee.code)"
        class="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-100 rounded-lg transition-all duration-200 cursor-pointer"
        title="Delete"
      >
        <TrashIcon class="w-4 h-4" />
      </button>
    </div>
  </div>

  <!-- Mobile/Tablet Layout -->
  <div class="lg:hidden p-4 hover:bg-gray-50 transition-colors">
    <div class="flex items-start space-x-4">
      <!-- Avatar -->
      <div class="shrink-0">
        <div class="h-12 w-12 rounded-full bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold shadow-md">
          {{ getInitials(employee.fullName) }}
        </div>
      </div>

      <!-- Content -->
      <div class="min-w-0 flex-1">
        <div class="flex items-start justify-between">
          <div class="flex-1 min-w-0">
            <h3 class="text-base font-semibold text-gray-900 truncate">{{ employee.fullName }}</h3>
            <p class="text-sm text-gray-600 mt-0.5">{{ employee.occupation }}</p>
            <p class="text-sm text-gray-500">{{ employee.department }}</p>
          </div>

          <!-- Mobile Actions -->
          <div class="flex items-center gap-1 ml-4">
            <button @click="$emit('view', employee.code)" class="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View">
              <EyeIcon class="w-5 h-5" />
            </button>
            <button @click="$emit('edit', employee.code)" class="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Edit">
              <PencilIcon class="w-5 h-5" />
            </button>
            <button @click="$emit('delete', employee.code)" class="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
              <TrashIcon class="w-5 h-5" />
            </button>
          </div>
        </div>

        <!-- Status Badges -->
        <div class="flex flex-wrap items-center gap-2 mt-3">
          <span :class="employment.class">
            {{ employment.label }}
          </span>
          <template v-if="termination">
            <span :class="termination.class">
              {{ termination.label }}
            </span>
          </template>
        </div>

        <!-- Dates -->
        <div class="flex flex-wrap gap-4 mt-2 text-xs text-gray-500">
          <span>Started: {{ formatDate(employee.dateOfEmployment) }}</span>
          <span v-if="employee.terminationDate">Ended: {{ formatDate(employee.terminationDate) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Employee } from '@/types/employee'
import EyeIcon from '@/icons/eye.svg'
import PencilIcon from '@/icons/pencil.svg'
import TrashIcon from '@/icons/trash.svg'
import { formatDate, isDateInFuture, getInitials } from '@/helpers'

interface Props {
  employee: Employee
}

const props = defineProps<Props>()
defineEmits<{ view: [string]; edit: [string]; delete: [string] }>()

const employment = computed(() => {
  const startFuture = isDateInFuture(props.employee.dateOfEmployment)
  const hasEnd = !!props.employee.terminationDate
  const endFuture = hasEnd && isDateInFuture(props.employee.terminationDate!)
  const ended = hasEnd && !endFuture

  if (startFuture) return { label: 'Starting Soon', class: 'badge badge--starting' }
  if (ended) return { label: 'Inactive', class: 'badge badge--inactive' }
  return { label: 'Active', class: 'badge badge--active' }
})

const termination = computed(() => {
  const end = props.employee.terminationDate
  if (!end) return null
  return isDateInFuture(end) ? { label: 'Leaving', class: 'badge badge--leaving' } : { label: 'Left', class: 'badge badge--left' }
})
</script>
