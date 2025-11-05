import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Employee } from '@/types/employee'

// Static, bundled. Avoiding fetch requests. If the file was in
// public or an actual api call, would be best to make a fetch action
import data from '@/db/employees.json'

export const useEmployeeStore = defineStore('employee', () => {
  const employees = ref<Employee[]>(data as Employee[])
  return { employees }
})
