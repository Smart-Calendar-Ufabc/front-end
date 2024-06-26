import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'

dayjs.locale('pt-br')

export const getBrazilianDate = (
  date: Date = new Date(),
  options?: {
    type?: 'short' | 'long'
    utc?: boolean
  },
) => {
  const dateX = options?.utc ? dayjs(date).utc() : dayjs(date)

  const format =
    options?.type === 'short' ? 'DD/MM/YYYY' : 'dddd, D [de] MMMM [de] YYYY'

  return dateX.format(format)
}

export const getBrazilianTime = (
  date: Date = new Date(),
  options?: {
    type?: 'short' | 'long'
    utc?: boolean
  },
) => {
  const dateX = options?.utc ? dayjs(date).utc() : dayjs(date)

  return dateX.locale('pt-br').format('HH:mm')
}
