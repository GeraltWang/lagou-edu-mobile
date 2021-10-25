import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 用户登录信息
    user: JSON.parse(window.localStorage.getItem('lagou-edu-mobile-user') || null)
  },
  mutations: {
    // 用于修改user
    setUser (state, payload) {
      // payload 为请求到的数据，为JSON格式，需转换为对象
      state.user = JSON.parse(payload)
      // 本地存储user, 数据持久化
      window.localStorage.setItem('lagou-edu-mobile-user', payload)
    }
  },
  actions: {
  },
  modules: {
  }
})
