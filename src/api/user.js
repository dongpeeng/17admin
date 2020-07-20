import request from '@/utils/request'
import request2 from '@/utils/request2'

export function register(data) {
  return request({
    url: LOGIN_API+'createUser',
    method: 'post',
    data
  })
}

export function getUserInfo(data) {
  return request2({
    url: LOGIN_API+'getUserInfor',
    method: 'post',
    data
  })
}

export function personMessage(data) {
  return request({
    url: LOGIN_API+'personMessage',
    method: 'post',
    data
  })
}

export function getAllUserInfor(data) {
  return request({
    url: LOGIN_API+'getAllUserInfor',
    method: 'post',
    data
  })
}

export function getAllFenyeUserInfor(params) {
  return request({
    url: LOGIN_API+'getAllFenyeUserInfor',
    method: 'get',
    params
  })
}

export function searchUserMessage(data) {
  return request({
    url: LOGIN_API+'searchUserMessage',
    method: 'post',
    data
  })
}

export function getVipCourse(data) {
  return request({
    url: BASE_API+'course/getVipCourse',
    method: 'get',
    data
  })
}

export function insertVipCourse(data) {
  return request({
    url: BASE_API+'course/insertVipCourse',
    method: 'post',
    data
  })
}