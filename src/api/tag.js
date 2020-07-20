import request from '@/utils/request'

export function add(params) {
  return request({
    url: BASE_API+'mark/add',
    method: 'post',
    params
  })
}

export function del(params) {
  return request({
    url: BASE_API+'mark/delete',
    method: 'post',
    params
  })
}

export function update(params) {
  return request({
    url: BASE_API+'mark/update',
    method: 'post',
    params
  })
}

export function getMarkById(params) {
  return request({
    url: BASE_API+'mark/getMarkById',
    method: 'post',
    params
  })
}

export function getMarkList(params) {
  return request({
    url: BASE_API+'mark/getMarkList',
    method: 'get',
    params
  })
}