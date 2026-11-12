<script setup lang="ts">
import { useRoute } from 'vue-router'
import AppAvatar from './AppAvatar.vue'
import { initials, riskOf } from '../utils/onboarding'
import type { Employee } from '../types/onboarding'

const props = defineProps<{ employees: Employee[]; selectedEmployeeId: number }>()
const emit = defineEmits<{
  selectEmployee: [id: number]
  resetDemo: []
}>()

const route = useRoute()
</script>

<template>
  <aside class="sidebar d-none d-lg-flex flex-column">
    <RouterLink class="brand-lockup" to="/hr">
      <span class="brand-mark"><i class="bi bi-compass-fill"></i></span>
      <span><strong>первый шаг</strong><small>АДАПТАЦИЯ СОТРУДНИКОВ</small></span>
    </RouterLink>

    <div class="sidebar-section-label">РАБОЧЕЕ ПРОСТРАНСТВО</div>
    <RouterLink class="side-link" :class="{ active: route.path === '/hr' }" to="/hr">
      <i class="bi bi-grid-1x2"></i><span>Обзор адаптации</span>
    </RouterLink>
    <RouterLink class="side-link" :class="{ active: route.path === '/newcomer' }" to="/newcomer">
      <i class="bi bi-person-check"></i><span>Кабинет новичка</span>
    </RouterLink>

    <div class="sidebar-section-label mt-4">БЫСТРЫЙ ПЕРЕХОД</div>
    <button
      v-for="employee in props.employees.slice(0, 4)"
      :key="employee.id"
      class="side-person"
      :class="{ selected: selectedEmployeeId === employee.id }"
      type="button"
      @click="emit('selectEmployee', employee.id)"
    >
      <AppAvatar :initials="initials(employee.name)" size="small" />
      <span class="side-person-name">{{ employee.name }}</span>
      <span class="online-dot" :class="{ warning: riskOf(employee) === 'attention' }"></span>
    </button>

    <div class="sidebar-bottom mt-auto">
      <div class="help-card">
        <div class="help-icon"><i class="bi bi-lightbulb"></i></div>
        <strong>Маленькие шаги — большой результат</strong>
        <p>Регулярная поддержка помогает новичку быстрее освоиться.</p>
      </div>
      <button class="side-link subtle" type="button" @click="emit('resetDemo')">
        <i class="bi bi-arrow-counterclockwise"></i><span>Сбросить демо-данные</span>
      </button>
      <div class="sidebar-version">ДЕМО-ПРОЕКТ · 1.0</div>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 254px;
  flex: 0 0 254px;
  min-height: 100vh;
  background: var(--sidebar);
  color: #fff;
  padding: 29px 18px 18px;
}

.brand-lockup {
  display: flex;
  align-items: center;
  gap: 11px;
  color: #fff;
  text-decoration: none;
  padding: 0 8px;
  margin-bottom: 48px;
}

.brand-mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  flex: 0 0 42px;
  color: #fff;
  background: #5a78e7;
  border-radius: 13px;
  font-size: 20px;
  box-shadow: 0 7px 18px #111b3466;
}

.brand-lockup strong {
  display: block;
  font: 800 19px "Manrope", sans-serif;
  letter-spacing: -.8px;
  line-height: 1.1;
}

.brand-lockup small {
  display: block;
  margin-top: 5px;
  color: #95a2bc;
  font-size: 8px;
  letter-spacing: 1.15px;
  font-weight: 700;
}

.sidebar-section-label {
  padding: 0 11px;
  margin: 0 0 12px;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 1.15px;
  color: #7f8ca8;
}

.side-link {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 13px;
  border: 0;
  background: transparent;
  color: #aab5c9;
  padding: 12px 13px;
  margin-bottom: 5px;
  border-radius: 10px;
  text-align: left;
  font-size: 12px;
  font-weight: 600;
  transition: .2s ease;
  text-decoration: none;
}

.side-link i {
  font-size: 16px;
}

.side-link:hover, .side-link.active {
  color: #fff;
  background: #ffffff14;
}

.side-link.active {
  box-shadow: inset 3px 0 #8298ff;
}

.side-person {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 8px 10px;
  border: 0;
  color: #bbc5d7;
  background: transparent;
  border-radius: 9px;
  text-align: left;
}

.side-person:hover, .side-person.selected {
  background: #ffffff10;
}

.side-person-name {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 11px;
}

.online-dot {
  width: 7px;
  height: 7px;
  display: inline-block;
  border-radius: 50%;
  background: #40b88a;
}

.online-dot.warning {
  background: #f0a44b;
}

.sidebar-bottom {
  margin-top: 35px;
}

.help-card {
  padding: 16px 14px 13px;
  border: 1px solid #ffffff15;
  border-radius: 13px;
  background: #ffffff09;
}

.help-icon {
  display: grid;
  place-items: center;
  width: 29px;
  height: 29px;
  margin-bottom: 12px;
  border-radius: 9px;
  background: #f2b85c20;
  color: #ffc46e;
}

.help-card strong {
  display: block;
  max-width: 170px;
  font: 700 11px/1.5 "Manrope", sans-serif;
}

.help-card p {
  margin: 7px 0 0;
  color: #9ba8bf;
  font-size: 10px;
  line-height: 1.6;
}

.side-link.subtle {
  margin-top: 14px;
  font-size: 10px;
  color: #8996af;
}

.sidebar-version {
  padding: 12px 12px 0;
  color: #687691;
  font-size: 8px;
  letter-spacing: 1px;
}
</style>
