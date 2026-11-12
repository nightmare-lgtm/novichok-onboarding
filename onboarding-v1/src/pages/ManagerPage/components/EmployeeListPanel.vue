<script setup lang="ts">
import { initials, progressOf, riskOf } from '../../../utils/onboarding'
import AppAvatar from '../../../general-components/AppAvatar.vue'
import type { Employee } from '../../../types/onboarding'

const props = defineProps<{
  employees: Employee[]
  selectedEmployeeId: number
  modelValue: string
  totalEmployees: number
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  select: [id: number]
}>()
</script>

<template>
  <div class="panel-card employee-panel h-100">
    <div class="panel-heading">
      <div><h2>Новые сотрудники</h2><p>Выберите сотрудника, чтобы посмотреть план</p></div>
      <span class="count-pill">{{ totalEmployees }}</span>
    </div>

    <div class="employee-search position-relative">
      <i class="bi bi-search"></i>
      <input
        class="form-control"
        placeholder="Поиск по имени или должности"
        aria-label="Поиск сотрудников"
        :value="modelValue"
        @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      />
    </div>

    <div class="employee-list">
      <button
        v-for="employee in props.employees"
        :key="employee.id"
        class="employee-item"
        :class="{ chosen: selectedEmployeeId === employee.id }"
        type="button"
        @click="emit('select', employee.id)"
      >
        <AppAvatar :initials="initials(employee.name)" />
        <span class="employee-main">
          <span class="employee-name">{{ employee.name }}</span>
          <span class="employee-role">{{ employee.role }} · {{ employee.department }}</span>
          <span class="mini-progress"><span :style="{ width: `${progressOf(employee)}%` }"></span></span>
        </span>
        <span class="employee-meta">
          <span class="progress-number">{{ progressOf(employee) }}%</span>
          <span class="status-dot" :class="riskOf(employee)"></span>
        </span>
      </button>

      <div v-if="!props.employees.length" class="empty-state">
        {{ totalEmployees ? 'Ничего не найдено. Попробуйте изменить запрос.' : 'Пока нет сотрудников. Добавьте первого новичка.' }}
      </div>
    </div>

    <div class="panel-footer-note">
      <span class="status-dot normal"></span> В норме
      <span class="status-dot attention ms-3"></span> Требует внимания
    </div>
  </div>
</template>

<style scoped>
.employee-panel {
  padding: 19px 0 0;
  overflow: hidden;
}

.panel-heading {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 0 19px 15px;
}

.panel-heading h2 {
  margin: 0;
  color: #283249;
  font: 800 15px "Manrope", sans-serif;
  letter-spacing: -.3px;
}

.panel-heading p {
  margin: 5px 0 0;
  color: #99a2b3;
  font-size: 10px;
}

.count-pill {
  padding: 4px 9px;
  border-radius: 7px;
  color: #6378ce;
  background: #eff2ff;
  font-size: 10px;
  font-weight: 800;
}

.employee-search {
  padding: 0 19px 13px;
}

.employee-search i {
  position: absolute;
  left: 31px;
  top: 11px;
  z-index: 1;
  color: #a4adbd;
  font-size: 12px;
}

.employee-search .form-control {
  height: 35px;
  padding-left: 31px;
  border-color: #edf0f5;
  background: #fafbfe;
  border-radius: 8px;
  font-size: 10px;
  box-shadow: none;
}

.employee-search .form-control::placeholder {
  color: #adb5c3;
}

.employee-list {
  max-height: 510px;
  overflow-y: auto;
}

.employee-item {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 12px 19px;
  border: 0;
  border-top: 1px solid #f0f2f6;
  background: #fff;
  text-align: left;
  transition: background .15s;
}

.employee-item:hover {
  background: #fafbff;
}

.employee-item.chosen {
  background: #f4f6ff;
  box-shadow: inset 3px 0 #637ce5;
}

.employee-main {
  min-width: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.employee-name {
  color: #2e3850;
  font-size: 11px;
  font-weight: 800;
}

.employee-role {
  overflow: hidden;
  color: #98a1b1;
  font-size: 9px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.mini-progress {
  display: block;
  height: 3px;
  max-width: 140px;
  margin-top: 3px;
  overflow: hidden;
  background: #edf0f6;
  border-radius: 5px;
}

.mini-progress span {
  display: block;
  height: 100%;
  background: #8194e8;
  border-radius: inherit;
}

.employee-meta {
  display: flex;
  align-items: center;
  gap: 9px;
}

.progress-number {
  color: #68758f;
  font-size: 10px;
  font-weight: 800;
}

.status-dot {
  width: 7px;
  height: 7px;
  display: inline-block;
  border-radius: 50%;
  background: #40b88a;
}

.status-dot.attention {
  background: #f0a44b;
}

.panel-footer-note {
  display: flex;
  align-items: center;
  padding: 12px 19px;
  border-top: 1px solid #f0f2f6;
  color: #9aa3b3;
  font-size: 9px;
}

.panel-footer-note .status-dot {
  width: 6px;
  height: 6px;
  margin-right: 6px;
}

@media (max-width: 991.98px) {
  .employee-list {
    max-height: 300px;
  }

  .employee-item {
    padding-right: 15px;
    padding-left: 15px;
  }

  .panel-heading, .employee-search {
    padding-right: 15px;
    padding-left: 15px;
  }

  .employee-search i {
    left: 27px;
  }
}

@media (max-width: 575.98px) {
  .employee-panel {
    padding-top: 15px;
  }

  .panel-heading {
    padding-bottom: 12px;
  }

  .panel-heading h2 {
    font-size: 14px;
  }

  .employee-list {
    max-height: 275px;
  }

  .employee-item {
    gap: 9px;
    padding: 10px 13px;
  }

  .employee-name {
    font-size: 10px;
  }

  .employee-role {
    max-width: 185px;
    font-size: 8px;
  }

  .progress-number {
    font-size: 9px;
  }
}
</style>
