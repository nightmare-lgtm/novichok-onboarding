<script setup lang="ts">
import EmployeeDetailPanel from './components/EmployeeDetailPanel.vue'
import EmployeeListPanel from './components/EmployeeListPanel.vue'
import StatCard from './components/StatCard.vue'
import AddEmployeeModal from './components/AddEmployeeModal.vue'
import { useManagerPageStore } from '../../store/ManagerPageStore'

const managerStore = useManagerPageStore()
</script>

<template>
  <section class="page-heading d-flex flex-column flex-sm-row justify-content-between align-items-sm-end gap-3">
    <div>
      <div class="eyebrow">СРЕДА, 11 НОЯБРЯ 2026</div>
      <h1>Обзор адаптации</h1>
      <p class="page-subtitle">Помогаем новым коллегам уверенно начать работу.</p>
    </div>
    <button
      class="btn btn-primary add-button"
      type="button"
      @click="managerStore.showAddModal = true"
    >
      <i class="bi bi-plus-lg me-2"></i>Добавить новичка
    </button>
  </section>

  <section class="row g-3 stats-row">
    <div class="col-6 col-xl-3">
      <StatCard
        icon="bi bi-person-plus"
        icon-class="icon-blue"
        label="На адаптации"
        :value="managerStore.totalEmployees"
        unit="чел."
        foot="Демонстрационные данные"
      />
    </div>
    <div class="col-6 col-xl-3">
      <StatCard
        icon="bi bi-check2-circle"
        icon-class="icon-green"
        label="Средний прогресс"
        :value="managerStore.averageProgress"
        unit="%"
        foot="По всем планам адаптации"
      />
    </div>
    <div class="col-6 col-xl-3">
      <StatCard
        icon="bi bi-flag"
        icon-class="icon-orange"
        label="Нужно внимание"
        :value="managerStore.needsAttention"
        unit="чел."
        foot="Есть вопросы или низкий прогресс"
      />
    </div>
    <div class="col-6 col-xl-3">
      <StatCard
        icon="bi bi-calendar3"
        icon-class="icon-purple"
        label="Период адаптации"
        value="90"
        unit="дней"
        foot="От первого рабочего дня"
      />
    </div>
  </section>

  <section class="row g-3 dashboard-grid">
    <div class="col-lg-5 employee-column">
      <EmployeeListPanel
        v-model="managerStore.searchQuery"
        :employees="managerStore.filteredEmployees"
        :selected-employee-id="managerStore.selectedEmployeeId"
        :total-employees="managerStore.employees.length"
        @select="managerStore.selectEmployee"
      />
    </div>
    <div class="col-lg-7 detail-column">
      <EmployeeDetailPanel :employee="managerStore.selectedEmployee" />
    </div>
  </section>

  <p class="demo-disclaimer">
    <i class="bi bi-info-circle me-1"></i>Это демонстрационный прототип. Все сотрудники и данные вымышлены.
  </p>

  <AddEmployeeModal
    v-model="managerStore.showAddModal"
    @submit="managerStore.addEmployee"
  />
</template>

<style scoped>
.page-heading {
  margin-bottom: 23px;
}

.eyebrow {
  color: #929db1;
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 1.25px;
}

h1 {
  margin: 7px 0 5px;
  color: #20283a;
  font: 800 27px "Manrope", sans-serif;
  letter-spacing: -0.9px;
}

.page-subtitle {
  margin: 0;
  color: #8b95a8;
  font-size: 12px;
}

.add-button {
  min-height: 40px;
  white-space: nowrap;
}

.stats-row {
  margin-bottom: 17px;
}

.dashboard-grid {
  align-items: stretch;
}

.demo-disclaimer {
  margin: 14px 2px 0;
  color: #a3acba;
  font-size: 9px;
}

@media (max-width: 991.98px) {
  .employee-column {
    display: block;
  }

  .detail-column {
    margin-top: 0;
  }
}

@media (max-width: 575.98px) {
  h1 {
    font-size: 23px;
  }

  .page-subtitle {
    max-width: 340px;
    font-size: 10px;
    line-height: 1.5;
  }

  .page-heading {
    margin-bottom: 17px;
  }

  .add-button {
    width: 100%;
  }

  .stats-row {
    --bs-gutter-x: 9px;
    --bs-gutter-y: 9px;
    margin-bottom: 12px;
  }

  .dashboard-grid {
    --bs-gutter-y: 12px;
  }
}
</style>
