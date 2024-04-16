export const getDuration = (date: Date) => {
  return `${date.getHours().toString().padStart(2, '0').toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
}
