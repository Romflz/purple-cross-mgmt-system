type ISODate = `${number}${number}${number}${number}-${number}${number}-${number}${number}`

export interface Employee {
  code: string
  fullName: string
  occupation: string
  department: string
  dateOfEmployment: ISODate
  terminationDate: ISODate | null
}

export type EmployeeStatus = 'starting' | 'active' | 'inactive' | 'leaving' | 'left'
