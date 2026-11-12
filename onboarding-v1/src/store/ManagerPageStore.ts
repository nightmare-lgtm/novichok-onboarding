import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { createTasks, seedEmployees } from '../mocks/onboarding'
import type { Employee, FeedbackForm, NewEmployee } from '../types/onboarding'
import { progressOf, riskOf } from '../utils/onboarding'

const STORAGE_KEY = 'first-step-demo-v1'

function cloneSeedEmployees(): Employee[] {
  return JSON.parse(JSON.stringify(seedEmployees)) as Employee[]
}

export const useManagerPageStore = defineStore('manager-page', () => {
  const employees = ref<Employee[]>(cloneSeedEmployees())
  const selectedEmployeeId = ref(1)
  const searchQuery = ref('')
  const showAddModal = ref(false)
  const toastMessage = ref('')

  let initialized = false
  let toastTimer: number | undefined

  watch(
    employees,
    (value) => {
      if (typeof window === 'undefined') return

      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
      } catch {
        notify('Не удалось сохранить изменения в браузере')
      }
    },
    { deep: true },
  )

  const selectedEmployee = computed(() =>
    employees.value.find((employee) => employee.id === selectedEmployeeId.value) ?? employees.value[0],
  )

  const totalEmployees = computed(() => employees.value.length)

  const averageProgress = computed(() => {
    if (!employees.value.length) return 0

    const totalProgress = employees.value.reduce(
      (sum, employee) => sum + progressOf(employee),
      0,
    )

    return Math.round(totalProgress / employees.value.length)
  })

  const needsAttention = computed(() =>
    employees.value.filter((employee) => riskOf(employee) === 'attention').length,
  )

  const filteredEmployees = computed(() => {
    const query = searchQuery.value.trim().toLocaleLowerCase('ru-RU')

    if (!query) return employees.value

    return employees.value.filter((employee) =>
      `${employee.name} ${employee.role} ${employee.department}`
        .toLocaleLowerCase('ru-RU')
        .includes(query),
    )
  })

  function initialize(): void {
    if (initialized) return

    if (typeof window !== 'undefined') {
      const savedEmployees = window.localStorage.getItem(STORAGE_KEY)

      if (savedEmployees) {
        try {
          const parsedEmployees = JSON.parse(savedEmployees) as Employee[]

          if (Array.isArray(parsedEmployees) && parsedEmployees.length) {
            employees.value = parsedEmployees
          }
        } catch {
          window.localStorage.removeItem(STORAGE_KEY)
        }
      }

      if (!employees.value.some((employee) => employee.id === selectedEmployeeId.value)) {
        selectedEmployeeId.value = employees.value[0]?.id ?? 1
      }
    }

    initialized = true
  }

  function notify(message: string): void {
    toastMessage.value = message

    if (typeof window === 'undefined') return

    if (toastTimer) window.clearTimeout(toastTimer)

    toastTimer = window.setTimeout(() => {
      if (toastMessage.value === message) {
        toastMessage.value = ''
      }
    }, 2800)
  }

  function selectEmployee(id: number): void {
    selectedEmployeeId.value = id
  }

  function toggleTask(employeeId: number, taskId: number): void {
    const employee = employees.value.find((item) => item.id === employeeId)
    const task = employee?.tasks.find((item) => item.id === taskId)

    if (task) {
      task.done = !task.done
    }
  }

  function addEmployee(data: NewEmployee): void {
    const name = data.name.trim()
    const mentor = data.mentor.trim()

    if (!name || !mentor) return

    const id = Math.max(0, ...employees.value.map((employee) => employee.id)) + 1
    const employee: Employee = {
      id,
      name,
      role: data.role,
      department: data.department,
      mentor,
      startedAt: new Date().toLocaleDateString('ru-RU'),
      tasks: createTasks().map((task) => ({ ...task, done: false })),
      feedback: [],
    }

    employees.value.unshift(employee)
    selectedEmployeeId.value = id
    searchQuery.value = ''
    showAddModal.value = false
    notify('Новый сотрудник добавлен')
  }

  function submitFeedback(employeeId: number, form: FeedbackForm): void {
    const employee = employees.value.find((item) => item.id === employeeId)

    if (!employee) return

    employee.feedback.unshift({
      id: Date.now(),
      date: new Date().toLocaleDateString('ru-RU'),
      ...form,
    })

    notify('Обратная связь отправлена руководителю')
  }

  function resetDemo(): void {
    employees.value = cloneSeedEmployees()
    selectedEmployeeId.value = employees.value[0]?.id ?? 1
    searchQuery.value = ''
    notify('Демо-данные восстановлены')
  }

  return {
    employees,
    selectedEmployeeId,
    selectedEmployee,
    searchQuery,
    filteredEmployees,
    showAddModal,
    toastMessage,
    totalEmployees,
    averageProgress,
    needsAttention,
    initialize,
    notify,
    selectEmployee,
    toggleTask,
    addEmployee,
    submitFeedback,
    resetDemo,
  }
})
