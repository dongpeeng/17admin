import request from '@/utils/request'

export function getCategory() {
  return request({
    url: BASE_API+'category/getCategory',
    method: 'get'
  })
}

export function getPath(data) {
  return request({
    url: BASE_API+'path/getAllPathByCategoryId',
    method: 'post',
    data
  })
}

export function del(data) {
  return request({
    url: BASE_API+'exercise/delete',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: BASE_API+'exercise/update',
    method: 'post',
    data
  })
}

export function getAllExerciseByPathId(data) {
  return request({
    url: BASE_API+'exercise/getAllExerciseByPathId',
    method: 'post',
    data
  })
}

export function add(data) {
  return request({
    url: BASE_API+'exercise/add',
    method: 'post',
    data
  })
}

export function getAllExerciseBySecId(data) {
  return request({
    url: BASE_API+'exercise/getAllExerciseBySecId',
    method: 'post',
    data
  })
}