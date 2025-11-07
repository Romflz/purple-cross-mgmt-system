import z from 'zod'

export const employeeSchema = z.object({
  code: z
    .string()
    .trim()
    .min(3, 'Min 3 characters')
    .regex(/^[a-zA-Z0-9_-]+$/, 'No spaces allowed'),
  fullName: z.string().trim().min(3, 'Min 3 characters'),
  occupation: z.string().trim().min(2, 'Min 2 characters'),
  department: z.string().trim().min(2, 'Min 2 characters'),
  dateOfEmployment: z.string().min(1, 'Required'),
  terminationDate: z.string().nullable(),
})
