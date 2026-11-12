<script setup lang="ts">
defineProps<{ mentor: string }>()
</script>

<template>
  <div class="panel-card mentor-card mb-3">
    <div class="mentor-card-icon"><i class="bi bi-person-heart"></i></div>
    <div class="detail-kicker">ТВОЙ НАСТАВНИК</div>
    <h2>{{ mentor }}</h2>
    <p>Твой главный помощник на старте. Не стесняйся задавать вопросы и просить о помощи.</p>
    <div class="mentor-tip"><i class="bi bi-chat-dots"></i><span>Лучше задать вопрос, чем долго искать ответ в одиночку.</span></div>
  </div>
</template>

<style scoped>
.mentor-card {
  padding: 19px;
}

.mentor-card h2 {
  margin: 0;
  color: #283249;
  font: 800 15px "Manrope", sans-serif;
  letter-spacing: -.3px;
}

.mentor-card-icon {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  margin-bottom: 14px;
  color: #6278d9;
  background: #edf0ff;
  border-radius: 11px;
  font-size: 17px;
}

.mentor-card > p {
  margin: 8px 0 14px;
  color: #929daf;
  font-size: 10px;
  line-height: 1.6;
}

.mentor-tip {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 10px;
  color: #7182c8;
  background: #f3f5ff;
  border-radius: 8px;
  font-size: 9px;
  line-height: 1.5;
}

.mentor-tip i {
  flex: 0 0 auto;
  font-size: 12px;
}
</style>
