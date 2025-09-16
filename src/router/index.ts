import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/home/index.vue';
import AOS from "aos";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition){
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/about/index.vue')
    },
    {
      path: '/hikingbook',
      name: 'hikingbook',
      component: () => import('../views/hikingbook/index.vue'),
      children: [
        {
          path: '/mountains',
          name: 'mountains',
          component: () => import('../views/hikingbook/mts/index.vue'),
        },
        {
          path: '/mountains/:id',
          name: 'mountains_view',
          component: () => import('../views/hikingbook/mts/view.vue'),
        },
        {
          path: '/routes',
          name: 'routes',
          component: () => import('../views/hikingbook/rts/index.vue'),
        },
        {
          path: '/routes/:id',
          name: 'routes_view',
          component: () => import('../views/hikingbook/rts/view.vue'),
        },
        {
          path: '/mtlogs',
          name: 'mtlogs',
          component: () => import('../views/hikingbook/mtlogs/index.vue'),
        },
        {
          path: '/mtlogs/:id',
          name: 'mtlogs_view',
          component: () => import('../views/hikingbook/mtlogs/[id].vue'),
          props: true
        },
        {
          path: '/gallery',
          name: 'gallery',
          component: () => import('../views/hikingbook/gallery/index.vue'),
        },
      ]
    },
    {
      path: '/learn',
      name: 'learn',
      component: () => import('../views/learn/index.vue'),
      children: [
        {
          path: ':id',
          name: 'learn_view',
          component: () => import('../views/learn/[id].vue'),
          props: true
        },
      ]
    },
    {
      path: '/workshop',
      name: 'workshop',
      component: () => import('../views/workshop/index.vue')
    },
    {
      path: '/resources',
      name: 'resources',
      component: () => import('../views/resources/index.vue')
    },
    {
      path: '/logodemo',
      name: 'logodemo',
      component: () => import('../views/_logodemo/index.vue')
    },
    { 
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/404.vue')
    },
  ]
});

router.beforeEach((to, from, next) => {
  AOS.init({
      once: true,
      easing: 'ease-in-out-sine',
  }); // Initialize AOS
  next();
});

export default router;
