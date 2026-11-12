<script setup lang="ts">
import { reactive, watch } from 'vue'
import type { NewEmployee } from '../../../types/onboarding'

const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  submit: [employee: NewEmployee]
}>()

const form = reactive<NewEmployee>({
  name: '',
  role: 'Продавец-консультант',
  department: 'Магазин',
  mentor: '',
})

function close() {
  emit('update:modelValue', false)
}

function submit() {
  if (!form.name.trim() || !form.mentor.trim()) return
  emit('submit', { ...form, name: form.name.trim(), mentor: form.mentor.trim() })
  form.name = ''
  form.role = 'Продавец-консультант'
  form.department = 'Магазин'
  form.mentor = ''
}

watch(() => props.modelValue, (isOpen) => {
  if (!isOpen) return
  form.name = ''
  form.role = 'Продавец-консультант'
  form.department = 'Магазин'
  form.mentor = ''
})
</script>

<template>
  <div v-if="modelValue" class="modal-backdrop-custom" @click.self="close">
    <div class="modal-dialog modal-dialog-centered add-modal-dialog">
      <form class="modal-content add-modal" @submit.prevent="submit">
        <div class="modal-header border-0 pb-1">
          <div>
            <div class="detail-kicker">НОВЫЙ СОТРУДНИК</div>
            <h2 class="modal-title">Добавить новичка</h2>
          </div>
          <button type="button" class="btn-close" aria-label="Закрыть" @click="close"></button>
        </div>

        <div class="modal-body pt-3">
          <label class="form-label" for="employee-name">Имя и фамилия</label>
          <input id="employee-name" v-model="form.name" class="form-control mb-3" placeholder="Например, Дмитрий Иванов" required maxlength="70" />

          <label class="form-label" for="employee-role">Должность</label>
          <select id="employee-role" v-model="form.role" class="form-select mb-3">
            <option>Продавец-консультант</option>
            <option>Кладовщик</option>
            <option>Менеджер по продажам</option>
            <option>Бухгалтер</option>
            <option>Администратор магазина</option>
          </select>

          <label class="form-label" for="employee-department">Подразделение</label>
          <select id="employee-department" v-model="form.department" class="form-select mb-3">
            <option>Магазин</option><option>Склад</option><option>Отдел продаж</option><option>Офис</option>
          </select>

          <label class="form-label" for="employee-mentor">Наставник</label>
          <input id="employee-mentor" v-model="form.mentor" class="form-control" placeholder="Имя наставника" required maxlength="70" />
        </div>

        <div class="modal-footer border-0 pt-1">
          <button type="button" class="btn btn-light" @click="close">Отмена</button>
          <button type="submit" class="btn btn-primary" :disabled="!form.name.trim() || !form.mentor.trim()">Добавить сотрудника</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.form-label {
  margin-bottom: 6px;
  color: #59647a;
  font-size: 9px;
  font-weight: 700;
}

.modal-backdrop-custom {
  position: fixed;
  z-index: 1050;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
  padding: 18px;
  background: #17213980;
  backdrop-filter: blur(3px);
}

.add-modal-dialog {
  width: 100%;
  max-width: 440px;
  margin: auto;
}

.add-modal {
  padding: 9px;
  border: 0;
  border-radius: 15px;
  box-shadow: 0 20px 70px #17213935;
}

.add-modal .modal-title {
  margin: 0;
  color: #273249;
  font: 800 19px "Manrope", sans-serif;
}

.add-modal .modal-body {
  padding-right: 16px;
  padding-left: 16px;
}

.add-modal .modal-footer {
  padding-right: 16px;
  padding-bottom: 13px;
  padding-left: 16px;
}
</style>
