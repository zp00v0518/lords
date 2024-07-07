import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/First',
      name: 'home',
      component: () => import('../components/organism/Main/Main.vue'),
    },
  ],
});

export default router;
