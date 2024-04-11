import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: '',
          component: () => import('../views/HomepageView.vue')
        },
        {
          path: 'cacao',
          component: () => import('../views/CacaoView.vue')
        },
        {
          path: 'cacao-taza',
          component: () => import('../views/CacaoTazaView.vue')
        },
        {
          path: 'perfil',
          component: () => import('../views/PerfilView.vue')
        },
        {
          path: 'chats',
          component: () => import('../views/ChatView.vue')
        },
        {
          path: 'publicar',
          component: () => import('../views/PublicarView.vue')
        },
        {
          path: 'autorizar',
          component: () => import('../views/AutorizarView.vue')
        },
        {
          path: 'producto/:id',
          component: () => import('../views/ProductoView.vue')
        },
        {
          path: 'editar-producto/:id',
          component: () => import('../views/EditarProductoView.vue')
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/registro',
      name: 'registro',
      component: () => import('../views/RegistroView.vue')
    },
  ]
})

export default router
