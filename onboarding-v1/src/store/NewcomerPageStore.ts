import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { useManagerPageStore } from './ManagerPageStore'
import type { FeedbackForm } from '../types/onboarding'

export const useNewcomerPageStore = defineStore('newcomer-page', () => {
  const managerStore = useManagerPageStore()
  const selectedEmployeeId = ref(managerStore.employees[0]?.id ?? 1)

  const employees = computed(() => managerStore.employees)
  const selectedEmployee = computed(() =>
    employees.value.find((employee) => employee.id === selectedEmployeeId.value) ?? employees.value[0],
  )

  watch(
    () => managerStore.employees.map((employee) => employee.id),
    (employeeIds) => {
      if (!employeeIds.includes(selectedEmployeeId.value)) {
        selectedEmployeeId.value = employeeIds[0] ?? 0
      }
    },
    { immediate: true },
  )

  function selectEmployee(id: number): void {
    selectedEmployeeId.value = id
  }

  function toggleTask(taskId: number): void {
    if (!selectedEmployee.value) return

    managerStore.toggleTask(selectedEmployee.value.id, taskId)
  }

  function submitFeedback(form: FeedbackForm): void {
    if (!selectedEmployee.value) return

    managerStore.submitFeedback(selectedEmployee.value.id, form)
  }

  return {
    employees,
    selectedEmployeeId,
    selectedEmployee,
    selectEmployee,
    toggleTask,
    submitFeedback,
  }
})
