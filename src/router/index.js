import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/LoginVue.vue';
import NavHeader from '../components/NavHeader.vue'; // Ensure this matches the actual file name

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '',
    component: NavHeader,
    meta: { requiresAuth: true },
    children: [
      {
        path: '/about',
        name: 'about',
        meta: { requiresAuth: true },
        component: () => import('../views/AboutView.vue')
      },
      {
        path: '/dashboard',
        name: 'dashboard',
        meta: { requiresAuth: true },
        component: () => import('../views/DashboardView.vue')
      },
      {
        path: '/create-manager',
        name: 'createmanager',
        meta: { requiresAuth: true },
        component: () => import('../views/CreateMange.vue')
      },
      {
        path: '/managers',
        name: 'managers',
        meta: { requiresAuth: true },
        component: () => import('../views/MangerView.vue')
      }
    ]
  }
  // Add other routes here
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next({ name: 'login' });
  } else {
    next();
  }
});

export default router;
