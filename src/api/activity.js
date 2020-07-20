import request from '@/utils/request'

export function add(params) {
  return request({
    url: BASE_API+'pass/add',
    method: 'post',
    params
  })
}

export function del(params) {
  return request({
    url: BASE_API+'pass/delete',
    method: 'post',
    params
  })
}

export function getPassList(params) {
  return request({
    url: BASE_API+'pass/getPassList',
    method: 'post',
    params
  })
}

export function getPassById(params) {
  return request({
    url: BASE_API+'pass/getPassById',
    method: 'post',
    params
  })
}

export function update(params) {
  return request({
    url: BASE_API+'pass/update',
    method: 'post',
    params
  })
}

export function insertExer(params) {
  return request({
    url: BASE_API+'pass/insertPassExercise',
    method: 'post',
    params
  })
}

export function delExer(params) {
  return request({
    url: BASE_API+'pass/deletePassExercise',
    method: 'post',
    params
  })
}

export function updateExer(params) {
  return request({
    url: BASE_API+'pass/updatePassExercise',
    method: 'post',
    params
  })
}

export function getPassMaterialList(params) {
  return request({
    url: BASE_API+'material/getPassMaterialList',
    method: 'get',
    params
  })
}

export function getUserList(params) {
  return request({
    url: BLOG_API+'user/vlogUserList',
    method: 'post',
    params
  })
}

export function updateUser(params) {
  return request({
    url: BLOG_API+'user/updateUser',
    method: 'post',
    params
  })
}
