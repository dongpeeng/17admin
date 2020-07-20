import request from '@/utils/request'

export function add(params) {
  return request({
    url: BASE_API+'banner/add',
    method: 'post',
    params
  })
}

export function del(params) {
  return request({
    url: BASE_API+'banner/delete',
    method: 'post',
    params
  })
}

export function getBannerList(params) {
  return request({
    url: BASE_API+'banner/getBannerList',
    method: 'get',
    params
  })
}

export function getBannerById(params) {
  return request({
    url: BASE_API+'banner/getBannerById',
    method: 'get',
    params
  })
}

export function update(params) {
  return request({
    url: BASE_API+'banner/update',
    method: 'post',
    params
  })
}