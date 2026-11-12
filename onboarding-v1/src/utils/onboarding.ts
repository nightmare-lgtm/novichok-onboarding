import type { Employee } from '../types/onboarding'

export function progressOf(employee: Employee): number {
  if (!employee.tasks.length) return 0

  const completedTasks = employee.tasks.filter((task) => task.done).length
  return Math.round((completedTasks / employee.tasks.length) * 100)
}

export function riskOf(employee: Employee): 'normal' | 'attention' {
  const lastFeedback = [...employee.feedback].sort((a, b) => b.id - a.id)[0]
  const needsHelp = lastFeedback && (
    lastFeedback.clarity === 'Есть вопросы' ||
    lastFeedback.support !== 'Да, помощи достаточно'
  )

  return needsHelp || progressOf(employee) < 35 ? 'attention' : 'normal'
}

export function initials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0] ?? '')
    .join('')
    .toUpperCase()
}
