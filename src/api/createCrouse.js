import request from '@/utils/request'
export function getCreateCrouse(data) {
    return request({
      url: BASE_API+'course/add',
      method: 'post',
      data
    })
  }

export function updateCourse(data) {
  return request({
    url: BASE_API+'course/updateCourse',
    method: 'post',
    data
  })
}