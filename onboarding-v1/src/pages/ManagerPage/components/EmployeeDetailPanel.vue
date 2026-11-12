<script setup lang="ts">
import { computed } from 'vue'
import { initials, progressOf, riskOf } from '../../../utils/onboarding'
import type { Employee } from '../../../types/onboarding'
import AppAvatar from '../../../general-components/AppAvatar.vue'

const props = defineProps<{ employee?: Employee }>()

const latestFeedback = computed(() =>
  [...(props.employee?.feedback ?? [])].sort((a, b) => b.id - a.id)[0],
)
const doneTasks = computed(() => props.employee?.tasks.filter((task) => task.done).length ?? 0)
const hasFeedbackAlert = computed(() => Boolean(
  latestFeedback.value && (
    latestFeedback.value.clarity === 'Есть вопросы' ||
    latestFeedback.value.support !== 'Да, помощи достаточно'
  ),
))
</script>

<template>
  <div v-if="employee" class="panel-card detail-panel">
    <div class="detail-topline">
      <div class="detail-person">
        <AppAvatar :initials="initials(employee.name)" size="large" />
        <div>
          <div class="detail-kicker">КАРТОЧКА СОТРУДНИКА</div>
          <h2>{{ employee.name }}</h2>
          <p>{{ employee.role }} <span>·</span> {{ employee.department }}</p>
        </div>
      </div>
      <span class="risk-badge" :class="riskOf(employee)">
        {{ riskOf(employee) === 'attention' ? 'Требует внимания' : 'Всё по плану' }}
      </span>
    </div>

    <div class="profile-facts row g-3">
      <div class="col-6 col-md-4"><span>Первый рабочий день</span><strong>{{ employee.startedAt }}</strong></div>
      <div class="col-6 col-md-4"><span>Наставник</span><strong>{{ employee.mentor }}</strong></div>
      <div class="col-12 col-md-4"><span>Этап адаптации</span><strong>Первые 90 дней</strong></div>
    </div>

    <div class="progress-block">
      <div class="d-flex justify-content-between align-items-end mb-2">
        <div><h3>Прогресс адаптации</h3><p>Выполнено задач по плану</p></div>
        <strong class="big-progress">{{ progressOf(employee) }}%</strong>
      </div>
      <div class="progress custom-progress" role="progressbar" :aria-valuenow="progressOf(employee)" aria-valuemin="0" aria-valuemax="100">
        <div class="progress-bar" :style="{ width: `${progressOf(employee)}%` }"></div>
      </div>
      <div class="progress-caption"><span>{{ doneTasks }} из {{ employee.tasks.length }} задач выполнено</span><span>Цель — 100%</span></div>
    </div>

    <div class="tasks-heading">
      <div><h3>План адаптации</h3><p>Ключевые шаги на первые три месяца</p></div>
      <span class="task-total">{{ doneTasks }}/{{ employee.tasks.length }}</span>
    </div>
    <div class="task-list">
      <div v-for="task in employee.tasks" :key="task.id" class="task-row" :class="{ completed: task.done }">
        <span class="task-check" :class="{ checked: task.done }">
          <i v-if="task.done" class="bi bi-check-lg"></i><i v-else class="bi bi-circle"></i>
        </span>
        <div class="task-copy"><strong>{{ task.title }}</strong><span>{{ task.description }}</span></div>
        <span class="task-period">{{ task.period }}</span>
      </div>
    </div>

    <div class="feedback-preview">
      <div class="feedback-preview-icon"><i class="bi bi-chat-left-text"></i></div>
      <div class="feedback-preview-copy">
        <strong>Последняя обратная связь</strong>
        <p v-if="latestFeedback">«{{ latestFeedback.comment || latestFeedback.clarity }}»</p>
        <p v-else>Сотрудник пока не оставлял обратную связь.</p>
        <span v-if="latestFeedback">{{ latestFeedback.date }} · {{ latestFeedback.support }}</span>
      </div>
      <span v-if="hasFeedbackAlert" class="feedback-alert"><i class="bi bi-exclamation-circle"></i></span>
    </div>
  </div>

  <div v-else class="panel-card empty-state detail-empty">Выберите сотрудника из списка.</div>
</template>

<style scoped>
.detail-panel {
  height: 100%;
  padding: 20px 21px;
}

.detail-topline {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
}

.detail-person {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
}

.detail-topline h2 {
  margin: 0;
  color: #283249;
  font: 800 16px "Manrope", sans-serif;
  letter-spacing: -.3px;
}

.detail-topline p {
  margin: 4px 0 0;
  color: #939daf;
  font-size: 10px;
}

.detail-topline p span {
  padding: 0 3px;
}

.risk-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 9px;
  border-radius: 7px;
  font-size: 8px;
  font-weight: 800;
  white-space: nowrap;
}

.risk-badge.normal {
  color: #339b76;
  background: #eaf7f1;
}

.risk-badge.attention {
  color: #bd7b2b;
  background: #fff3e4;
}

.profile-facts {
  margin: 17px 0 0;
  padding: 13px 0;
  border-top: 1px solid #f0f2f6;
  border-bottom: 1px solid #f0f2f6;
}

.profile-facts div {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.profile-facts span {
  color: #a0a9b8;
  font-size: 9px;
}

.profile-facts strong {
  color: #46516a;
  font-size: 10px;
  font-weight: 700;
}

.progress-block {
  padding: 16px 0 14px;
}

.progress-block h3, .tasks-heading h3 {
  margin: 0;
  color: #303b53;
  font: 800 12px "Manrope", sans-serif;
}

.progress-block p, .tasks-heading p {
  margin: 4px 0 0;
  color: #a0a9b8;
  font-size: 9px;
}

.big-progress {
  color: #506bd3;
  font: 800 20px "Manrope", sans-serif;
}

.progress-caption {
  display: flex;
  justify-content: space-between;
  margin-top: 7px;
  color: #a0a9b8;
  font-size: 8px;
}

.tasks-heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 13px 0 7px;
  border-top: 1px solid #f0f2f6;
}

.tasks-heading h3 {
  margin: 0;
}

.task-total {
  padding: 4px 9px;
  border-radius: 7px;
  color: #6378ce;
  background: #eff2ff;
  font-size: 10px;
  font-weight: 800;
}

.task-list {
  display: flex;
  flex-direction: column;
}

.task-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 0;
  border-bottom: 1px solid #f2f3f6;
}

.task-check {
  width: 19px;
  height: 19px;
  flex: 0 0 19px;
  display: grid;
  place-items: center;
  color: #b3bdcc;
  font-size: 13px;
}

.task-check.checked {
  color: #43ad87;
  background: #eaf7f1;
  border-radius: 6px;
  font-size: 12px;
}

.task-copy {
  min-width: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.task-copy strong {
  color: #505b70;
  font-size: 9px;
  font-weight: 700;
}

.task-copy span {
  color: #a2abba;
  font-size: 8px;
}

.task-row.completed .task-copy strong {
  color: #9099a9;
}

.task-period {
  color: #9ba5b5;
  padding: 4px 7px;
  border-radius: 6px;
  background: #f6f7fa;
  font-size: 8px;
  white-space: nowrap;
}

.feedback-preview {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-top: 14px;
  padding: 12px;
  border: 1px solid #edf0f5;
  border-radius: 10px;
  background: #fafbfe;
}

.feedback-preview-icon {
  width: 28px;
  height: 28px;
  flex: 0 0 28px;
  display: grid;
  place-items: center;
  color: #7185dd;
  background: #edf1ff;
  border-radius: 8px;
}

.feedback-preview-copy {
  min-width: 0;
  flex: 1;
}

.feedback-preview-copy strong {
  color: #4b5770;
  font-size: 9px;
}

.feedback-preview-copy p {
  margin: 4px 0;
  color: #68748a;
  font-size: 9px;
  line-height: 1.5;
}

.feedback-preview-copy span {
  color: #a2aaba;
  font-size: 8px;
}

.feedback-alert {
  color: #e2a04f;
  font-size: 14px;
}

.detail-empty {
  min-height: 250px;
  display: grid;
  place-items: center;
}

@media (max-width: 991.98px) {
  .detail-panel {
    height: auto;
  }
}

@media (max-width: 575.98px) {
  .detail-panel {
    padding: 15px 13px;
  }

  .detail-topline h2 {
    font-size: 14px;
  }

  .detail-topline p {
    max-width: 180px;
    font-size: 9px;
    line-height: 1.5;
  }

  .risk-badge {
    padding: 5px 7px;
    font-size: 7px;
  }

  .profile-facts {
    margin-top: 13px;
    padding: 11px 0;
  }

  .profile-facts span {
    font-size: 8px;
  }

  .profile-facts strong {
    font-size: 9px;
  }

  .task-row {
    gap: 7px;
    padding: 9px 0;
  }

  .task-copy strong {
    font-size: 8px;
  }

  .task-copy span {
    font-size: 7px;
  }

  .task-period {
    padding: 4px 5px;
    font-size: 7px;
  }

  .feedback-preview {
    padding: 9px;
  }
}
</style>
