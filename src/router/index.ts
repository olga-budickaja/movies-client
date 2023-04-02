import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'main',
    component: () => import('../views/MainPage.vue')
  },
  {
    path: '/store',
    name: 'main-store',
    component: () => import('../views/MainPageVuex.vue')
  },
  {
    path: '/genres/:genreName',
    name: 'genre-page',
    component: () => import('../views/GenrePage.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
