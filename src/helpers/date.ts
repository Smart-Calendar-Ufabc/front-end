export const getBrazilianDate = (
  date: Date = new Date(),
  options?: {
    type: 'short' | 'long'
  },
) => {
  const dateX = new Date(date)
  dateX.setUTCDate(dateX.getUTCDate() + 1)
  dateX.setUTCHours(date.getUTCHours() - 3)

  return dateX.toLocaleDateString('pt-BR', {
    weekday: options?.type || 'long',
    year: 'numeric',
    month: options?.type || 'long',
    day: 'numeric',
  })
}

export const getBrazilianTime = (date: Date = new Date()) => {
  const dateX = new Date(date)
  dateX.setUTCHours(date.getUTCHours() - 3)

  return dateX.toLocaleTimeString('pt-BR', {
    hour: 'numeric',
    minute: 'numeric',
  })
}
