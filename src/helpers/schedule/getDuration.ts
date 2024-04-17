export const getDuration = (
  date: Date,
  options?: {
    utc: boolean
  },
) => {
  const dateX = new Date(date)

  if (options?.utc === false) {
    return `${dateX.getHours().toString().padStart(2, '0').toString().padStart(2, '0')}:${dateX.getMinutes().toString().padStart(2, '0')}`
  }

  return `${dateX.getUTCHours().toString().padStart(2, '0').toString().padStart(2, '0')}:${dateX.getUTCMinutes().toString().padStart(2, '0')}`
}
