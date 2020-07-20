import request from '@/utils/request'

export function getSectionList(params) {
  return request({
    url: BASE_API+'course/getAllSection',
    method: 'post',
    params
  })
}

export function delSection(params) {
  return request({
    url: BASE_API+'course/deleteSection',
    method: 'post',
    params
  })
}