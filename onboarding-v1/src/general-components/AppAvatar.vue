<script setup lang="ts">
withDefaults(defineProps<{
  initials: string
  size?: 'default' | 'small' | 'large'
}>(), {
  size: 'default',
})
</script>

<template>
  <span class="avatar" :class="`avatar--${size}`" aria-hidden="true">{{ initials }}</span>
</template>

<style scoped>
.avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  flex: 0 0 40px;
  color: #5268bb;
  background: #e9edff;
  border: 2px solid #fff;
  border-radius: 13px;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: .2px;
}

.avatar--small {
  width: 29px;
  height: 29px;
  flex-basis: 29px;
  border: 0;
  border-radius: 9px;
  font-size: 9px;
}

.avatar--large {
  width: 49px;
  height: 49px;
  flex-basis: 49px;
  border-radius: 15px;
  font-size: 13px;
}

@media (max-width: 575.98px) {
  .avatar--default {
    width: 35px;
    height: 35px;
    flex-basis: 35px;
    border-radius: 11px;
  }

  .avatar--large {
    width: 42px;
    height: 42px;
    flex-basis: 42px;
  }
}
</style>
