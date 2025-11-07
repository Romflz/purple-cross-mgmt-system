<template>
  <DefaultLayout>
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h3 class="text-3xl font-bold text-gray-900 mb-8">
        Import / Export Employees
      </h3>

      <!-- Error/Success Messages -->
      <div
        v-if="message"
        class="mb-6 p-4 rounded-lg"
        :class="messageType === 'success' ? 'alert-success' : 'alert-error'"
      >
        <p class="font-medium">{{ message }}</p>
      </div>

      <div class="grid md:grid-cols-2 gap-6">
        <!-- Export Section -->
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center mb-4">
            <CloudUpIcon class="w-8 h-8 text-green-600 mr-3" />
            <h2 class="text-xl font-semibold text-gray-900">Export Data</h2>
          </div>
          <p class="text-gray-600 mb-4">
            Download all employee data as a JSON file. This includes all
            {{ employeeStore.employees.length }} employees currently in the
            system.
          </p>
          <button
            @click="exportData"
            class="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Export Employees
          </button>
        </div>

        <!-- Import Section -->
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center mb-4">
            <CloudDownIcon class="w-8 h-8 text-blue-600 mr-3" />
            <h2 class="text-xl font-semibold text-gray-900">Import Data</h2>
          </div>
          <p class="text-gray-600 mb-4">
            Upload a JSON file to replace all current employee data.
            <span class="text-red-600 font-medium"
              >Warning: This will overwrite all existing data!</span
            >
          </p>

          <input
            ref="fileInput"
            type="file"
            accept=".json"
            @change="handleFileSelect"
            class="hidden"
          />

          <button
            @click="triggerFileInput"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Select JSON File
          </button>

          <div
            v-if="selectedFile"
            class="mt-4 p-3 bg-gray-50 rounded border border-gray-200"
          >
            <p class="text-sm text-gray-700">
              <span class="font-medium">Selected:</span> {{ selectedFile.name }}
            </p>
            <button
              @click="importData"
              class="mt-2 w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Confirm Import
            </button>
          </div>
        </div>
      </div>

      <!-- Data Preview -->
      <div class="mt-8 bg-white rounded-lg shadow p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-3">
          Current Data Stats
        </h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="text-center p-4 bg-gray-50 rounded">
            <p class="text-2xl font-bold text-gray-900">
              {{ employeeStore.employees.length }}
            </p>
            <p class="text-sm text-gray-600">Total Employees</p>
          </div>
          <div class="text-center p-4 bg-gray-50 rounded">
            <p class="text-2xl font-bold text-gray-900">
              {{ employeeStore.activeEmployees }}
            </p>
            <p class="text-sm text-gray-600">Active</p>
          </div>
          <div class="text-center p-4 bg-gray-50 rounded">
            <p class="text-2xl font-bold text-gray-900">
              {{ employeeStore.terminatedEmployees }}
            </p>
            <p class="text-sm text-gray-600">Terminated</p>
          </div>
          <div class="text-center p-4 bg-gray-50 rounded">
            <p class="text-2xl font-bold text-gray-900">
              {{ employeeStore.departments.length }}
            </p>
            <p class="text-sm text-gray-600">Departments</p>
          </div>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useEmployeeStore } from '@/store/employee'
import DefaultLayout from '@/components/layouts/DefaultLayout.vue'
import type { Employee } from '@/types/employee'

const employeeStore = useEmployeeStore()
const fileInput = ref<HTMLInputElement | null>(null)
const selectedFile = ref<File | null>(null)
const message = ref('')
const messageType = ref<'success' | 'error' | ''>('')

const showMessage = (msg: string, type: 'success' | 'error') => {
  message.value = msg
  messageType.value = type
}

const exportData = () => {
  try {
    // Create Blod url with json data
    const dataStr = JSON.stringify(employeeStore.employees, null, 2)
    const blob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)

    // Attach it to body for download, trigger manual click and remove
    const link = document.createElement('a')
    link.href = url
    link.download = `employees-export.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    showMessage('Employee data exported successfully!', 'success')
  } catch (error) {
    showMessage('Failed to export data', 'error')
    console.error(error)
  }
}

const triggerFileInput = () => {
  fileInput.value?.click()
}

// Populate selectedFile everyone we upload a new file.
// Note: When user clicks 'Confirm Import', it will trigger importData() which does the importing
const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    selectedFile.value = target.files[0]
  }
}

// Import user data with basic validation
const importData = async () => {
  if (!selectedFile.value) return

  try {
    const text = await selectedFile.value.text()
    const data = JSON.parse(text)

    // Validate it's an array
    if (!Array.isArray(data)) {
      showMessage('Invalid format: JSON must be an array of employees', 'error')
      return
    }

    if (data.length === 0) {
      showMessage('Cannot import empty array', 'error')
      return
    }

    // Set data, show message and reset input
    employeeStore.employees = data as Employee[]
    showMessage(`Successfully imported ${data.length} employees.`, 'success')
    selectedFile.value = null
    if (fileInput.value) fileInput.value.value = ''
  } catch (error) {
    if (error instanceof SyntaxError) {
      showMessage('Invalid JSON format', 'error')
    } else {
      showMessage('Failed to import data', 'error')
    }
    console.error(error)
  }
}
</script>
