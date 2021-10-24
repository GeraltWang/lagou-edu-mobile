import Vue from 'vue'
import VueRouter from 'vue-router'
import Course from '@/views/course'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: 'login' */'@/views/login/index')
  },
  {
    path: '/',
    name: 'course',
    component: Course
  },
  {
    path: '/learn',
    name: 'learn',
    component: () => import(/* webpackChunkName: 'learn' */'@/views/learn/index')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import(/* webpackChunkName: 'user' */'@/views/user/index')
  },
  {
    path: '*',
    name: 'error-page',
    component: () => import(/* webpackChunkName: 'error' */'@/views/error-page/index')
  }
]

const router = new VueRouter({
  routes
})

export default router
