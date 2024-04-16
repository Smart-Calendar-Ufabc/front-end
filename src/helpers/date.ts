import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'

dayjs.locale('pt-br')

export const getBrazilianDate = (
  date: Date = new Date(),
  options?: {
    type: 'short' | 'long'
  },
) => {
  const dateX = dayjs(date).utc()

  const format =
    options?.type === 'short' ? 'DD/MM/YYYY' : 'dddd, D [de] MMMM [de] YYYY'

  return dateX.format(format)
}

export const getBrazilianTime = (date: Date = new Date()) => {
  const dateX = new Date(date)
  dateX.setHours(date.getHours())

  return dateX.toLocaleTimeString('pt-BR', {
    hour: 'numeric',
    minute: 'numeric',
  })
}
