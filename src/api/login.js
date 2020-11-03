import request from '@/utils/request'
import request1 from '@/utils/request1'

export function login(data) {
  return request({
    // url: LOGIN_API+'tealogin',
    url: LOGIN_API+'admin/login',
    method: 'post',
    data
  })
}

export function getInfo(data) {
  // params = JSON.stringify(params)
  return request1({
    url: LOGIN_API+'getTeacherInfor',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
