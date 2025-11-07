import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Employee } from '@/types/employee'
import { isDateInFuture } from '@/helpers'

// Static, bundled. Avoiding fetch requests. If the file was in
// public or an actual api call, would be best to make a fetch action
import data from '@/db/employees.json'

export const useEmployeeStore = defineStore('employee', () => {
  const employees = ref<Employee[]>(data as Employee[])

  const departments = computed(() => {
    const set = new Set<string>()
    for (const e of employees.value) set.add(e.department)
    return Array.from(set).sort()
  })

  // Active employee count that dont have a termiantion date or to be terminated
  const activeEmployees = computed(() => {
    return employees.value.filter(
      (emp) => !emp.terminationDate || isDateInFuture(emp.terminationDate)
    ).length
  })

  // Terminated employees that already been terminated, not to be terminated
  const terminatedEmployees = computed(() => {
    return employees.value.filter(
      (emp) => emp.terminationDate && !isDateInFuture(emp.terminationDate)
    ).length
  })

  const updateEmployee = (
    code: string,
    updatedData: Partial<Omit<Employee, 'code'>>
  ) => {
    const employee = employees.value.find((emp) => emp.code === code)

    if (!employee) {
      console.error(`Employee with code ${code} not found`)
      return false
    }

    Object.assign(employee, updatedData)

    return true
  }

  const createEmployee = (data: Employee) => {
    // Check if employee with this code already exists
    const exists = employees.value.some((emp) => emp.code === data.code)

    if (exists) {
      return {
        success: false,
        error: `Employee with code ${data.code} already exists`,
      }
    }

    employees.value.push(data)
    return {
      success: true,
    }
  }
  const deleteEmployee = (code: string) => {
    const index = employees.value.findIndex((emp) => emp.code === code)

    if (index === -1) {
      console.error(`Employee with code ${code} not found`)
      return false
    }

    employees.value.splice(index, 1)

    return true
  }

  return {
    employees,
    departments,
    activeEmployees,
    terminatedEmployees,
    updateEmployee,
    deleteEmployee,
    createEmployee,
  }
})
