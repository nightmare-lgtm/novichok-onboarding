<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isNewcomerPage = computed(() => route.path === '/newcomer')
</script>

<template>
  <header class="topbar">
    <div class="d-flex align-items-center gap-2 d-lg-none">
      <span class="brand-mark brand-mark-small"><i class="bi bi-compass-fill"></i></span>
      <strong class="mobile-brand">первый шаг</strong>
    </div>

    <div class="topbar-context d-none d-lg-block">
      <span class="context-dot"></span>
      {{ isNewcomerPage ? 'ПРОСТРАНСТВО СОТРУДНИКА' : 'HR-ПРОСТРАНСТВО' }}
      <span class="context-divider">/</span>
      АДАПТАЦИЯ
    </div>

    <div class="ms-auto d-flex align-items-center gap-2 gap-sm-3">
      <div class="mode-switch" role="group" aria-label="Режим приложения">
        <RouterLink :class="{ selected: !isNewcomerPage }" to="/hr">
          <i class="bi bi-people d-sm-none"></i><span class="d-none d-sm-inline">Для HR</span><span class="d-sm-none">HR</span>
        </RouterLink>
        <RouterLink :class="{ selected: isNewcomerPage }" to="/newcomer">
          <i class="bi bi-person d-sm-none"></i><span class="d-none d-sm-inline">Для новичка</span><span class="d-sm-none">Я новичок</span>
        </RouterLink>
      </div>
      <div class="topbar-avatar d-none d-sm-flex">HR</div>
    </div>
  </header>
</template>

<style scoped>
.topbar {
  height: 76px;
  display: flex;
  align-items: center;
  padding: 0 42px;
  background: #fff;
  border-bottom: 1px solid #eef0f4;
}

.topbar-context {
  color: #8a94a7;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 1.1px;
}

.context-dot {
  width: 6px;
  height: 6px;
  display: inline-block;
  border-radius: 50%;
  background: #54bf92;
  vertical-align: 1px;
  margin-right: 7px;
}

.context-divider {
  padding: 0 9px;
  color: #d2d7e1;
}

.mode-switch {
  display: flex;
  gap: 3px;
  padding: 4px;
  background: #f3f5f9;
  border-radius: 10px;
}

.mode-switch a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  border: 0;
  border-radius: 7px;
  padding: 7px 13px;
  color: #8992a4;
  background: transparent;
  font-size: 10px;
  font-weight: 700;
  white-space: nowrap;
}

.mode-switch a.selected {
  color: #425fc8;
  background: #fff;
  box-shadow: 0 2px 7px #28395c12;
}

.topbar-avatar {
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  color: #fff;
  background: #293754;
  font-size: 10px;
  font-weight: 800;
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

.brand-mark-small {
  width: 33px;
  height: 33px;
  flex-basis: 33px;
  border-radius: 10px;
  font-size: 16px;
}

.mobile-brand {
  color: #273249;
  font: 800 15px "Manrope", sans-serif;
  letter-spacing: -.5px;
}

@media (max-width: 1199.98px) {
  .topbar {
    padding-right: 28px;
    padding-left: 28px;
  }
}

@media (max-width: 991.98px) {
  .topbar {
    height: 62px;
    padding: 0 18px;
  }
}

@media (max-width: 575.98px) {
  .topbar {
    padding: 0 13px;
  }

  .mode-switch {
    gap: 2px;
    padding: 3px;
  }

  .mode-switch a {
    min-width: 48px;
    padding: 7px 9px;
    font-size: 9px;
  }
}
</style>
