import request from '@/utils/request'

export function getPathList(params) {
    return request({
      url: BASE_API+'course/addUI',
      method: 'get',
      params
    })
  }