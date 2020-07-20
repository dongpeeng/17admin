import request from '@/utils/request'

// 根据id获取资料
export function getById(params) {
  return request({
    url: BASE_API+'material/getMaterialById',
    method: 'post',
    params
  })
}

// 添加资料
export function add(params) {
  return request({
    url: BASE_API+'material/add',
    method: 'post',
    params
  })
}

// 删除资料
export function del(params) {
  return request({
    url: BASE_API+'material/delete',
    method: 'post',
    params
  })
}

// 更新资料
export function update(params) {
  return request({
    url: BASE_API+'material/update',
    method: 'post',
    params
  })
}

// 获取资料列表
export function getList(params) {
  return request({
    url: BASE_API+'material/getMaterialList',
    method: 'get',
    params
  })
}
