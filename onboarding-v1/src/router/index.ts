import { createRouter, createWebHashHistory } from 'vue-router'
import DefaultLayout from '../layouts/DefaultLayout.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        { path: '', redirect: '/hr' },
        {
          path: 'hr',
          component: () => import('../pages/ManagerPage/ManagerPage.vue'),
        },
        {
          path: 'newcomer',
          component: () => import('../pages/NewcomerPage/NewcomerPage.vue'),
        },
      ],
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
