import { UnallocatedTask } from '@/entities/UnallocatedTask'

const durations = ['00:30', '01:00', '01:30', '02:00', '02:15', '03:00']

const priorities: ('low' | 'medium' | 'high')[] = [
  'low',
  'high',
  'medium',
  'high',
  'medium',
  'low',
]

const titles = [
  'Criar telas de autenticação',
  'Criar telas de calendário',
  'Criar telas para gerenciar tarefas',
  'Criar telas de recuparação de senha',
  'Criar modal de adicionar tarefa',
  'Criar modal de editar tarefa',
  'Criar modal de excluir tarefa',
  'Criar modal de adicionar rotina',
  'Criar modal de editar rotina',
  'Criar modal de gerenciar tags',
]

const getRandomElement = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)]
}

const getDateFromNowAndAddDaysAndSetHoursAndMinutes = (
  days: number,
  hours: number,
  minutes: number,
) => {
  const date = new Date()
  date.setUTCDate(date.getUTCDate() + days)
  date.setUTCHours(hours)
  date.setUTCMinutes(minutes)
  return date
}

export const unallocatedTasks: UnallocatedTask[] = [
  {
    id: crypto.randomUUID(),
    title: getRandomElement(titles),
    priority: getRandomElement(priorities),
    duration: '00:30',
    deadline: getDateFromNowAndAddDaysAndSetHoursAndMinutes(15, 23, 59),
  },
  {
    id: crypto.randomUUID(),
    title: getRandomElement(titles),
    priority: getRandomElement(priorities),
    duration: getRandomElement(durations),
    deadline: getDateFromNowAndAddDaysAndSetHoursAndMinutes(15, 23, 59),
  },
  {
    id: crypto.randomUUID(),
    title: getRandomElement(titles),
    priority: getRandomElement(priorities),
    duration: getRandomElement(durations),
    deadline: getDateFromNowAndAddDaysAndSetHoursAndMinutes(15, 23, 59),
  },
  {
    id: crypto.randomUUID(),
    title: getRandomElement(titles),
    priority: getRandomElement(priorities),
    duration: getRandomElement(durations),
    deadline: getDateFromNowAndAddDaysAndSetHoursAndMinutes(15, 23, 59),
  },
  {
    id: crypto.randomUUID(),
    title: getRandomElement(titles),
    priority: getRandomElement(priorities),
    duration: getRandomElement(durations),
    deadline: getDateFromNowAndAddDaysAndSetHoursAndMinutes(15, 23, 59),
  },
  {
    id: crypto.randomUUID(),
    title: getRandomElement(titles),
    priority: getRandomElement(priorities),
    duration: getRandomElement(durations),
    deadline: getDateFromNowAndAddDaysAndSetHoursAndMinutes(15, 23, 59),
  },
  {
    id: crypto.randomUUID(),
    title: getRandomElement(titles),
    priority: getRandomElement(priorities),
    duration: getRandomElement(durations),
    deadline: getDateFromNowAndAddDaysAndSetHoursAndMinutes(15, 23, 59),
  },
  {
    id: crypto.randomUUID(),
    title: getRandomElement(titles),
    priority: getRandomElement(priorities),
    duration: getRandomElement(durations),
    deadline: getDateFromNowAndAddDaysAndSetHoursAndMinutes(15, 23, 59),
  },
  {
    id: crypto.randomUUID(),
    title: getRandomElement(titles),
    priority: getRandomElement(priorities),
    duration: getRandomElement(durations),
    deadline: getDateFromNowAndAddDaysAndSetHoursAndMinutes(15, 23, 59),
  },
]
