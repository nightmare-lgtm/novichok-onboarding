<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppSidebar from '../general-components/AppSidebar.vue'
import AppToast from '../general-components/AppToast.vue'
import AppTopbar from '../general-components/AppTopbar.vue'
import MobileNavigation from '../general-components/MobileNavigation.vue'
import { useManagerPageStore } from '../store/ManagerPageStore'

const router = useRouter()
const route = useRoute()
const isNewcomerPage = computed(() => route.path === '/newcomer')
const managerStore = useManagerPageStore()

onMounted(managerStore.initialize)

function openEmployee(id: number) {
  managerStore.selectEmployee(id)
  void router.push('/hr')
}
</script>

<template>
  <div class="app-shell">
    <AppSidebar
      v-if="!isNewcomerPage"
      :employees="managerStore.employees"
      :selected-employee-id="managerStore.selectedEmployeeId"
      @select-employee="openEmployee"
      @reset-demo="managerStore.resetDemo"
    />

    <main class="main-area">
      <AppTopbar />
      <MobileNavigation v-if="!isNewcomerPage" />
      <div class="page-content container-fluid">
        <RouterView />
      </div>
    </main>

    <AppToast :message="managerStore.toastMessage" />
  </div>
</template>

<style scoped>
.app-shell {
  min-height: 100vh;
  display: flex;
}

.main-area {
  min-width: 0;
  flex: 1;
}

.page-content {
  max-width: 1600px;
  padding: 34px 42px 28px;
  margin: 0 auto;
}

@media (max-width: 1199.98px) {
  .page-content {
    padding-right: 28px;
    padding-left: 28px;
  }
}

@media (max-width: 991.98px) {
  .page-content {
    padding: 25px 18px 26px;
  }
}

@media (max-width: 575.98px) {
  .page-content {
    padding: 21px 13px 22px;
  }
}
</style>
