<script setup lang="ts">
import { reactive } from 'vue'
import type { FeedbackForm as FeedbackFormData } from '../../../types/onboarding'

const emit = defineEmits<{ submit: [form: FeedbackFormData] }>()
const form = reactive<FeedbackFormData>({
  clarity: 'Всё понятно',
  support: 'Да, помощи достаточно',
  comment: '',
})

function submit() {
  emit('submit', { ...form })
  form.clarity = 'Всё понятно'
  form.support = 'Да, помощи достаточно'
  form.comment = ''
}
</script>

<template>
  <form class="panel-card feedback-form" @submit.prevent="submit">
    <div class="detail-kicker">ТВОЁ МНЕНИЕ ВАЖНО</div>
    <h2>Как твои дела?</h2>
    <p class="form-intro">Пара ответов поможет нам сделать адаптацию комфортнее.</p>

    <label class="form-label" for="feedback-clarity">Насколько понятны твои задачи?</label>
    <select id="feedback-clarity" v-model="form.clarity" class="form-select mb-3">
      <option>Всё понятно</option><option>Почти всё понятно</option><option>Есть вопросы</option>
    </select>

    <label class="form-label" for="feedback-support">Хватает ли помощи наставника?</label>
    <select id="feedback-support" v-model="form.support" class="form-select mb-3">
      <option>Да, помощи достаточно</option><option>Не всегда хватает помощи</option><option>Мне нужна дополнительная поддержка</option>
    </select>

    <label class="form-label" for="feedback-comment">Что хотелось бы улучшить? <span class="optional-label">необязательно</span></label>
    <textarea id="feedback-comment" v-model="form.comment" class="form-control" rows="3" placeholder="Напиши, что у тебя на уме..."></textarea>

    <button class="btn btn-primary w-100 mt-3" type="submit"><i class="bi bi-send me-2"></i>Отправить обратную связь</button>
    <div class="privacy-note"><i class="bi bi-lock"></i> Ответ увидит твой руководитель или HR.</div>
  </form>
</template>

<style scoped>
.feedback-form {
  padding: 19px;
}

.feedback-form h2 {
  margin: 0;
  color: #283249;
  font: 800 15px "Manrope", sans-serif;
  letter-spacing: -.3px;
}

.form-intro {
  margin: 6px 0 15px;
  color: #9aa4b4;
  font-size: 9px;
  line-height: 1.5;
}

.form-label {
  margin-bottom: 6px;
  color: #59647a;
  font-size: 9px;
  font-weight: 700;
}

.optional-label {
  color: #a6aebd;
  font-weight: 400;
}

.privacy-note {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-top: 11px;
  color: #a5adbb;
  font-size: 8px;
}

@media (max-width: 575.98px) {
  .feedback-form {
    padding: 15px;
  }
}
</style>
