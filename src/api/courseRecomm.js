import request from '@/utils/request'
export function getCourseRecomm(data) {
    return request({
      url: BASE_API+'course/courseRecomm',
      method: 'post',
      data
    })
  }