import request from '@/utils/request'

export function getChapterDetails(params) {
  return request({
    url: BASE_API+'course/getChapByChapId',
    method: 'get',
    params
  })
}

export function addChapter(params) {
  return request({
    url: BASE_API+'course/addChapById',
    method: 'post',
    params
  })
}

export function updateChapter(params) {
  return request({
    url: BASE_API+'course/updateChapById',
    method: 'post',
    params
  })
}