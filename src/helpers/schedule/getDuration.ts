export const getDuration = (date: Date) => {
  return `${date.getUTCHours().toString().padStart(2, '0').toString().padStart(2, '0')}:${date.getUTCMinutes().toString().padStart(2, '0')}`
}
