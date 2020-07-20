import request from '@/utils/request'

export function getTeacherlist() {
  return request({
    url: BASE_API+'course/addUI',
    method: 'get'
  })
}

export function del(data) {
    return request({
      url: BASE_API+'teacher/delete',
      method: 'post',
      data
    })
  }

  export function add(data) {
    return request({
      url: BASE_API+'teacher/add',
      method: 'post',
      data
    })
  }

  export function infor(data) {
    return request({
      url: BASE_API+'teacher/information',
      method: 'post',
      data
    })
  }
  export function update(data) {
    return request({
      url: BASE_API+'teacher/update',
      method: 'post',
      data
    })
  }