<script setup lang="ts">
defineProps<{ message: string }>()
</script>

<template>
  <Transition name="toast">
    <div v-if="message" class="app-toast" role="status" aria-live="polite">
      <i class="bi bi-check-circle-fill"></i>{{ message }}
    </div>
  </Transition>
</template>

<style scoped>
.app-toast {
  position: fixed;
  z-index: 1100;
  right: 24px;
  bottom: 24px;
  display: flex;
  align-items: center;
  gap: 9px;
  max-width: calc(100vw - 32px);
  padding: 13px 16px;
  color: #fff;
  background: #263650;
  border-radius: 10px;
  box-shadow: 0 8px 28px #1b294333;
  font-size: 11px;
}

.app-toast i {
  color: #6bd0a5;
  font-size: 15px;
}

.toast-enter-active, .toast-leave-active {
  transition: all .2s ease;
}

.toast-enter-from, .toast-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

@media (max-width: 575.98px) {
  .app-toast {
    right: 12px;
    bottom: 12px;
    left: 12px;
    justify-content: center;
  }
}
</style>
