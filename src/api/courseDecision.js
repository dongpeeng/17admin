import request from '@/utils/request'
export function getCourseDecision(data) {
    return request({
      url: BASE_API+'course/courseDecision',
      method: 'post',
      data
    })
  }