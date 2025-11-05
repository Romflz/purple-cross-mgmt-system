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

export { isDateInFuture, formatDate, getInitials }
