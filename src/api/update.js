import request from '@/utils/request'
export function getUpdate(data) {
    return request({
      url: BASE_API+'course/updateUI',
      method: 'post',
      data
    })
  }