import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import SignIn from '../views/SignIn.vue'
import SignUp from '../views/SignUp.vue'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: HomeView, meta: { requiresAuth: true } },
    { path: '/signin', component: SignIn },
    { path: '/signup', component: SignUp },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true },
    },
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    console.log('nao autenticado')
    next('/signin')
  } else {
    next()
  }
})

export default router
