export function dateNow() {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// utils.js

export function formatSelectedDate(selectedDateValue) {
  // Create a new Date object using the selected date value
  const selectedDate = new Date(selectedDateValue)

  // Extract individual components of the date
  const year = selectedDate.getFullYear()
  const month = String(selectedDate.getMonth() + 1).padStart(2, '0') // Months are zero-indexed
  const day = String(selectedDate.getDate()).padStart(2, '0')
  const hours = String(selectedDate.getHours()).padStart(2, '0')
  const minutes = String(selectedDate.getMinutes()).padStart(2, '0')
  const seconds = String(selectedDate.getSeconds()).padStart(2, '0')

  // Format the date as 'YYYY-MM-DDTHH:mm:ss'
  const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`

  return formattedDate
}

export function formatSelectedDateNow() {
  // Create a new Date object for the current date and time
  const currentDate = new Date()

  // Extract individual components of the date
  const year = currentDate.getFullYear()
  const month = String(currentDate.getMonth() + 1).padStart(2, '0') // Months are zero-indexed
  const day = String(currentDate.getDate()).padStart(2, '0')
  const hours = String(currentDate.getHours()).padStart(2, '0')
  const minutes = String(currentDate.getMinutes()).padStart(2, '0')
  const seconds = String(currentDate.getSeconds()).padStart(2, '0')

  // Format the date as 'YYYY-MM-DDTHH:mm:ss'
  const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`

  return formattedDate
}
