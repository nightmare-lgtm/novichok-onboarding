<script setup lang="ts">
import FeedbackForm from './components/FeedbackForm.vue'
import MentorCard from './components/MentorCard.vue'
import TaskChecklist from './components/TaskChecklist.vue'
import { useNewcomerPageStore } from '../../store/NewcomerPageStore'

const newcomerStore = useNewcomerPageStore()

function changeEmployee(value: string) {
  newcomerStore.selectEmployee(Number(value))
}
</script>

<template>
  <template v-if="newcomerStore.selectedEmployee">
    <section class="page-heading newcomer-heading">
      <div class="eyebrow">ТВОЙ ПЕРВЫЙ ШАГ В КОМАНДЕ</div>
      <h1>Добро пожаловать, {{ newcomerStore.selectedEmployee.name.split(' ')[0] }}!</h1>
      <p class="page-subtitle">
        Здесь собраны твои задачи на первые три месяца. Двигайся в своём темпе — мы поможем.
      </p>
    </section>

    <section class="row g-3 newcomer-layout">
      <div class="col-lg-8">
        <TaskChecklist
          :employee="newcomerStore.selectedEmployee"
          @toggle-task="newcomerStore.toggleTask"
        />
      </div>
      <div class="col-lg-4">
        <MentorCard :mentor="newcomerStore.selectedEmployee.mentor" />
        <FeedbackForm
          :key="newcomerStore.selectedEmployee.id"
          @submit="newcomerStore.submitFeedback"
        />
      </div>
    </section>

    <div class="newcomer-switcher mt-3">
      <span>Демо: можно посмотреть адаптацию другого сотрудника</span>
      <select
        class="form-select"
        :value="newcomerStore.selectedEmployeeId"
        @change="changeEmployee(($event.target as HTMLSelectElement).value)"
      >
        <option
          v-for="employee in newcomerStore.employees"
          :key="employee.id"
          :value="employee.id"
        >
          {{ employee.name }} — {{ employee.role }}
        </option>
      </select>
    </div>
  </template>

  <div v-else class="panel-card empty-state detail-empty">
    Пока нет сотрудников. Попросите HR добавить вас в систему.
  </div>
</template>

<style scoped>
.newcomer-heading {
  margin-bottom: 22px;
}

.newcomer-heading h1 {
  font-size: 29px;
}

.newcomer-layout {
  align-items: flex-start;
}

.newcomer-switcher {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 14px;
  border: 1px dashed #dce2ef;
  border-radius: 10px;
  color: #9aa4b4;
  font-size: 9px;
}

.newcomer-switcher .form-select {
  width: auto;
  min-width: 220px;
}

@media (max-width: 575.98px) {
  .newcomer-heading h1 {
    font-size: 23px;
  }

  .newcomer-switcher {
    align-items: stretch;
    flex-direction: column;
  }

  .newcomer-switcher .form-select {
    width: 100%;
    min-width: 0;
  }
}
</style>
