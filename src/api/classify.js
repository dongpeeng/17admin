import request from '@/utils/request'

export function getCategory() {
  return request({
    url: BASE_API+'category/getCategory',
    method: 'get'
  })
}
export function delCategoryById(data) {
  return request({
    url: BASE_API+'category/delCategoryById',
    method: 'post',
    data
  })
}
export function updateCategoryById(data) {
  return request({
    url: BASE_API+'category/updateCategoryById',
    method: 'post',
    data
  })
}
export function addCategoryById(data) {
  return request({
    url: BASE_API+'category/addCategoryById',
    method: 'post',
    data
  })
}

export function getPath() {
  return request({
    url: BASE_API+'path/getPath',
    method: 'get'
  })
}
export function delPathById(data) {
  return request({
    url: BASE_API+'path/delPathById',
    method: 'post',
    data
  })
}
export function updatePathById(data) {
  return request({
    url: BASE_API+'path/updatePathById',
    method: 'post',
    data
  })
}
export function addPathById(data) {
  return request({
    url: BASE_API+'path/addPathById',
    method: 'post',
    data
  })
}

export function getCategoryById(data) {
  return request({
    url: BASE_API+'category/getCategoryById',
    method: 'post',
    data
  })
}

export function getPathById(data) {
  return request({
    url: BASE_API+'path/getPathById',
    method: 'post',
    data
  })
}
