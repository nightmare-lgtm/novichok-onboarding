export type Task = {
  id: number
  title: string
  description: string
  period: string
  done: boolean
}

export type Feedback = {
  id: number
  date: string
  clarity: string
  support: string
  comment: string
}

export type Employee = {
  id: number
  name: string
  role: string
  department: string
  mentor: string
  startedAt: string
  tasks: Task[]
  feedback: Feedback[]
}

export type NewEmployee = Pick<Employee, 'name' | 'role' | 'department' | 'mentor'>

export type FeedbackForm = Pick<Feedback, 'clarity' | 'support' | 'comment'>
