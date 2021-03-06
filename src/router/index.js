import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import Course from '@/views/course'

Vue.use(VueRouter)

const routes = [
  // 登录
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: 'login' */'@/views/login/index')
  },
  // 课程
  {
    path: '/',
    name: 'course',
    component: Course
  },
  // 学习
  {
    path: '/learn',
    name: 'learn',
    component: () => import(/* webpackChunkName: 'learn' */'@/views/learn/index'),
    meta: { requireAuth: true }
  },
  // 我的
  {
    path: '/user',
    name: 'user',
    component: () => import(/* webpackChunkName: 'user' */'@/views/user/index'),
    meta: { requireAuth: true }
  },
  {
    path: '/course-info/:courseId',
    name: 'course-info',
    component: () => import(/* webpackChunkName: 'course-info' */'@/views/course-info/index'),
    props: true
  },
  {
    path: '/lesson-video/:lessonId',
    name: 'lesson-video',
    component: () => import(/* webpackChunkName: 'lesson-video' */'@/views/course-info/video'),
    props: true
  },
  // 支付
  {
    path: '/pay/:courseId',
    name: 'pay',
    component: () => import(/* webpackChunkName: 'pay' */'@/views/pay/index'),
    props: true
  },
  // 错误页
  {
    path: '*',
    name: 'error-page',
    component: () => import(/* webpackChunkName: 'error' */'@/views/error-page/index')
  }
]

const router = new VueRouter({
  routes
})

// 导航守卫进行登陆检测
router.beforeEach((to, from, next) => {
  // 判断目标路由是否需要认证
  // 验证 to
  if (to.matched.some(record => record.meta.requireAuth)) {
    // 验证 state.store 中是否有用户信息
    if (!store.state.user) {
      // 未登录，跳转登录页面
      return next({
        name: 'login',
        query: { redirect: to.fullPath }
      })
    }
    // 已登录，允许进入
    next()
  } else {
    next()
  }
})

export default router
