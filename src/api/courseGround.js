import request from '@/utils/request'
export function getCourseGround(data) {
    return request({
      url: BASE_API+'course/courseGround',
      method: 'post',
      data
    })
  }