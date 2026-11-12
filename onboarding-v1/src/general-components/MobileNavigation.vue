<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <nav class="mobile-nav d-lg-none" aria-label="Основная навигация">
    <RouterLink :class="{ active: route.path === '/hr' }" to="/hr">
      <i class="bi bi-grid-1x2"></i> Обзор
    </RouterLink>
    <RouterLink :class="{ active: route.path === '/newcomer' }" to="/newcomer">
      <i class="bi bi-person-check"></i> Мой план
    </RouterLink>
  </nav>
</template>

<style scoped>
.mobile-nav {
  display: flex;
  gap: 6px;
  overflow-x: auto;
  padding: 10px 16px;
  background: #fff;
  border-bottom: 1px solid #eef0f4;
}

.mobile-nav a {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  flex: 0 0 auto;
  padding: 8px 12px;
  color: #7b8598;
  border: 0;
  border-radius: 8px;
  background: transparent;
  text-decoration: none;
  font-size: 11px;
  font-weight: 700;
}

.mobile-nav a.active {
  color: #405ecb;
  background: #eef1ff;
}
</style>
