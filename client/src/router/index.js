import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: HomeView },
    { path: '/menu', component: () => import('../views/MenuView.vue') },
    { path: '/product/:id', component: () => import('../views/ProductView.vue') },
    { path: '/cart', component: () => import('../views/CartView.vue') },
    { path: '/login', component: () => import('../views/LoginView.vue') },
    { path: '/account', component: () => import('../views/AccountView.vue') },
    { path: '/admin', component: () => import('../views/AdminView.vue') }
  ]
})

export default router