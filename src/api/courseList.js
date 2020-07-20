import request from '@/utils/request'

export function getCourseList(params) {
  return request({
    url: BASE_API+'course/getCourseList',
    method: 'post',
    params
  })
}

export function delCourse(params) {
  return request({
    url: BASE_API+'course/delete',
    method: 'post',
    params
  })
}