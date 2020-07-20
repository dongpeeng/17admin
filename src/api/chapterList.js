import request from '@/utils/request'

export function getChapterList(params) {
  return request({
    url: BASE_API+'course/getChap',
    method: 'get',
    params
  })
}

export function delChapter(params) {
  return request({
    url: BASE_API+'course/delChapById',
    method: 'post',
    params
  })
}