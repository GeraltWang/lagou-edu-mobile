import request from '@/utils/request'

// 用户登录
export const userLogin = data => {
  return request({
    method: 'POST',
    url: '/front/user/login',
    data: new URLSearchParams(data).toString()
  })
}
