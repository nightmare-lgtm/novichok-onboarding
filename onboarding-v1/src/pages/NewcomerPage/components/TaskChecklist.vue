<script setup lang="ts">
import { progressOf } from '../../../utils/onboarding'
import type { Employee } from '../../../types/onboarding'

const props = defineProps<{ employee: Employee }>()
const emit = defineEmits<{ toggleTask: [taskId: number] }>()
</script>

<template>
  <div class="panel-card newcomer-plan">
    <div class="newcomer-plan-head">
      <div>
        <div class="detail-kicker">ТВОЙ ПЛАН</div>
        <h2>Адаптация шаг за шагом</h2>
        <p>Отмечай выполненные задачи — прогресс сохранится автоматически.</p>
      </div>
      <div class="newcomer-progress-ring"><strong>{{ progressOf(employee) }}%</strong><span>готово</span></div>
    </div>

    <div class="progress custom-progress mb-4">
      <div class="progress-bar" :style="{ width: `${progressOf(employee)}%` }"></div>
    </div>

    <div class="newcomer-task-list">
      <div v-for="task in employee.tasks" :key="task.id" class="newcomer-task" :class="{ done: task.done }">
        <button
          class="task-toggle"
          type="button"
          :aria-label="task.done ? 'Отменить выполнение' : 'Отметить выполненной'"
          @click="emit('toggleTask', task.id)"
        >
          <i :class="task.done ? 'bi bi-check-lg' : 'bi bi-circle'"></i>
        </button>
        <div class="newcomer-task-copy">
          <div class="newcomer-task-meta">{{ task.period }}</div>
          <strong>{{ task.title }}</strong>
          <p>{{ task.description }}</p>
        </div>
        <span v-if="task.done" class="done-label"><i class="bi bi-check2 me-1"></i>Готово</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.newcomer-plan {
  padding: 23px;
}

.newcomer-plan-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 18px;
}

.newcomer-plan h2 {
  margin: 0;
  color: #283249;
  font: 800 17px "Manrope", sans-serif;
  letter-spacing: -.3px;
}

.newcomer-plan-head p {
  margin: 6px 0 0;
  color: #97a1b2;
  font-size: 10px;
}

.newcomer-progress-ring {
  width: 65px;
  height: 65px;
  flex: 0 0 65px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 5px solid #e9edff;
  border-right-color: #6c82e5;
  border-bottom-color: #6c82e5;
  border-radius: 50%;
  transform: rotate(0deg);
}

.newcomer-progress-ring strong {
  color: #526bd0;
  font: 800 14px "Manrope", sans-serif;
}

.newcomer-progress-ring span {
  color: #9ba5b5;
  font-size: 7px;
}

.newcomer-task-list {
  display: flex;
  flex-direction: column;
}

.newcomer-task {
  display: flex;
  align-items: flex-start;
  gap: 13px;
  padding: 17px 2px;
  border-bottom: 1px solid #eff1f5;
}

.newcomer-task:last-child {
  border-bottom: 0;
}

.task-toggle {
  width: 25px;
  height: 25px;
  flex: 0 0 25px;
  display: grid;
  place-items: center;
  border: 1.5px solid #dce1ec;
  border-radius: 8px;
  color: #aab3c3;
  background: #fff;
  font-size: 13px;
}

.newcomer-task.done .task-toggle {
  color: #fff;
  background: #46b08a;
  border-color: #46b08a;
}

.newcomer-task-copy {
  min-width: 0;
  flex: 1;
}

.newcomer-task-meta {
  margin-bottom: 3px;
  color: #8293d9;
  font-size: 8px;
  font-weight: 800;
  letter-spacing: .4px;
  text-transform: uppercase;
}

.newcomer-task-copy strong {
  color: #3d4960;
  font-size: 11px;
  font-weight: 800;
}

.newcomer-task-copy p {
  margin: 4px 0 0;
  color: #99a3b3;
  font-size: 9px;
  line-height: 1.5;
}

.newcomer-task.done .newcomer-task-copy strong {
  color: #8b95a6;
  text-decoration: line-through;
  text-decoration-color: #bbc3d0;
}

.done-label {
  color: #43a77f;
  font-size: 8px;
  font-weight: 800;
  white-space: nowrap;
}

@media (max-width: 575.98px) {
  .newcomer-plan {
    padding: 16px 13px;
  }

  .newcomer-plan h2 {
    max-width: 210px;
    font-size: 14px;
  }

  .newcomer-plan-head p {
    max-width: 235px;
    font-size: 9px;
    line-height: 1.5;
  }

  .newcomer-progress-ring {
    width: 55px;
    height: 55px;
    flex-basis: 55px;
    border-width: 4px;
  }

  .newcomer-task {
    gap: 9px;
    padding: 14px 0;
  }

  .newcomer-task-copy strong {
    font-size: 10px;
  }

  .newcomer-task-copy p {
    font-size: 8px;
  }

  .done-label {
    font-size: 7px;
  }
}
</style>
