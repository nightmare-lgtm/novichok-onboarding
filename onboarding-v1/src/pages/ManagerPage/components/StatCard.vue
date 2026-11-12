<script setup lang="ts">
defineProps<{
  icon: string
  iconClass: string
  label: string
  value: string | number
  unit?: string
  foot: string
}>()
</script>

<template>
  <div class="stat-card">
    <div class="stat-icon" :class="iconClass"><i :class="icon"></i></div>
    <div class="stat-label">{{ label }}</div>
    <div class="stat-value">{{ value }} <span v-if="unit">{{ unit }}</span></div>
    <div class="stat-foot">{{ foot }}</div>
  </div>
</template>

<style scoped>
.stat-card {
  background: var(--surface);
  border: 1px solid #edf0f5;
  border-radius: 14px;
  box-shadow: 0 3px 14px #26355005;
  min-height: 142px;
  padding: 16px 17px 13px;
  position: relative;
}

.stat-icon {
  width: 32px;
  height: 32px;
  display: grid;
  place-items: center;
  border-radius: 10px;
  margin-bottom: 11px;
  font-size: 15px;
}

.icon-blue {
  background: #edf1ff;
  color: #5a73dd;
}

.icon-green {
  background: #e8f7f1;
  color: #39a77c;
}

.icon-orange {
  background: #fff3e4;
  color: #e6a14c;
}

.icon-purple {
  background: #f1edff;
  color: #9274d5;
}

.stat-label {
  color: #8791a4;
  font-size: 10px;
  font-weight: 600;
}

.stat-value {
  margin-top: 2px;
  color: #263149;
  font: 800 25px "Manrope", sans-serif;
  letter-spacing: -.8px;
}

.stat-value span {
  color: #8d97aa;
  font: 600 10px "DM Sans", sans-serif;
  letter-spacing: 0;
}

.stat-foot {
  margin-top: 2px;
  color: #a3acbc;
  font-size: 9px;
}

@media (max-width: 1199.98px) {
  .stat-card {
    padding-right: 13px;
    padding-left: 13px;
  }
}

@media (max-width: 575.98px) {
  .stat-card {
    background: var(--surface);
    border: 1px solid #edf0f5;
    border-radius: 14px;
    box-shadow: 0 3px 14px #26355005;
    min-height: 126px;
    padding: 12px 11px 10px;
    border-radius: 11px;
  }

  .stat-icon {
    width: 28px;
    height: 28px;
    margin-bottom: 8px;
    font-size: 13px;
  }

  .stat-label {
    font-size: 9px;
  }

  .stat-value {
    font-size: 22px;
  }

  .stat-foot {
    font-size: 8px;
    line-height: 1.35;
  }
}
</style>
