import axios from 'axios'
import store from '@/store'
import router from '../router'

const request = axios.create({
  baseURL: 'http://edufront.lagou.com'
})

// 请求拦截器
request.interceptors.request.use(config => {
  const { user } = store.state
  if (user && user.access_token) {
    config.headers.Authorization = user.access_token
  }
  return config
})

// 响应拦截器
// token 刷新状态
let isRefreshing = false
// 存储刷新时挂起的请求
let requests = []
// 跳转登录页函数
function redirectLogin () {
  router.push({ name: 'login', query: { redirect: router.currentRoute.fullPath } })
}
request.interceptors.response.use(response => {
  return response
}, async err => {
  // 有响应，但是出错
  if (err.response) {
    // 检测状态码是否为 401
    if (err.response.status === 401) {
      // 检测是否存在用户信息
      if (!store.state.user) {
        redirectLogin()
        // 不存在，结束
        return Promise.reject(err)
      }
      // 发送刷新请求前先判断是否已经存在刷新token的请求了
      if (isRefreshing) {
        return requests.push(() => {
          // err.config 是失败请求的配置对象
          request(err.config)
        })
      }
      isRefreshing = true
      // 到这一步说明token错误或者过期，需要请求刷新token
      const { data } = await request({
        method: 'POST',
        url: '/front/user/refresh_token',
        data: new window.URLSearchParams({
          refreshtoken: store.state.user.refresh_token
        }).toString()
      })
      if (data.state !== 1) {
        // 刷新token失败, 清空错误的用户信息
        store.commit('setUser', null)
        // 跳转登录页
        redirectLogin()
        return Promise.reject(err)
      }
      // 刷新token成功
      store.commit('setUser', data.content)
      // 将 requests 中所有请求重新发送
      requests.forEach(callback => callback())
      // 发送完毕后清空等待队列
      requests = []
      isRefreshing = false
      return request(err.config)
    }
  }
  return Promise.reject(err)
})

export default request
