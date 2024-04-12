import { UnallocatedTask } from '@/entities/UnallocatedTask'

const sumRandomDaysFromNow = (): Date => {
  const date = new Date()
  const randomDays = Math.floor(Math.random() * 30)
  date.setUTCDate(date.getUTCDate() + randomDays)
  return date
}

const durations = [
  '00:30',
  '01:00',
  '02:00',
  '03:00',
  '04:00',
  '05:00',
  '06:00',
]

const priorities: ('low' | 'medium' | 'high')[] = [
  'low',
  'high',
  'medium',
  'high',
  'medium',
  'low',
]

const deadlines = [
  sumRandomDaysFromNow(),
  sumRandomDaysFromNow(),
  sumRandomDaysFromNow(),
  sumRandomDaysFromNow(),
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

export const unallocatedTasks: UnallocatedTask[] = [
  {
    id: crypto.randomUUID(),
    title: getRandomElement(titles),
    priority: getRandomElement(priorities),
    duration: getRandomElement(durations),
    deadline: getRandomElement(deadlines),
  },
  {
    id: crypto.randomUUID(),
    title: getRandomElement(titles),
    priority: getRandomElement(priorities),
    duration: getRandomElement(durations),
    deadline: getRandomElement(deadlines),
  },
  {
    id: crypto.randomUUID(),
    title: getRandomElement(titles),
    priority: getRandomElement(priorities),
    duration: getRandomElement(durations),
    deadline: getRandomElement(deadlines),
  },
  {
    id: crypto.randomUUID(),
    title: getRandomElement(titles),
    priority: getRandomElement(priorities),
    duration: getRandomElement(durations),
    deadline: getRandomElement(deadlines),
  },
  {
    id: crypto.randomUUID(),
    title: getRandomElement(titles),
    priority: getRandomElement(priorities),
    duration: getRandomElement(durations),
    deadline: getRandomElement(deadlines),
  },
  {
    id: crypto.randomUUID(),
    title: getRandomElement(titles),
    priority: getRandomElement(priorities),
    duration: getRandomElement(durations),
    deadline: getRandomElement(deadlines),
  },
  {
    id: crypto.randomUUID(),
    title: getRandomElement(titles),
    priority: getRandomElement(priorities),
    duration: getRandomElement(durations),
    deadline: getRandomElement(deadlines),
  },
  {
    id: crypto.randomUUID(),
    title: getRandomElement(titles),
    priority: getRandomElement(priorities),
    duration: getRandomElement(durations),
    deadline: getRandomElement(deadlines),
  },
]
