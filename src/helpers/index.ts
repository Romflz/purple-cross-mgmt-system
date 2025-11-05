import type { Employee } from '@/types/employee'

const isDateInFuture = (endOfEmploymentDate: string) => {
  return new Date(endOfEmploymentDate) > new Date()
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-MT', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

function getStatus(e: Employee): 'starting' | 'active' | 'inactive' | 'leaving' | 'left' {
  const startFuture = isDateInFuture(e.dateOfEmployment)
  const hasEnd = !!e.terminationDate
  const endFuture = hasEnd && isDateInFuture(e.terminationDate!)
  const ended = hasEnd && !endFuture

  if (startFuture) return 'starting'
  if (ended) return 'inactive'
  if (endFuture) return 'leaving'
  return 'active'
}

export { isDateInFuture, formatDate, getInitials, getStatus }
