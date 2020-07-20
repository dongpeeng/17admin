import request from '@/utils/request'

export function getList(params) {
  return request({
    url: BLOG_API+'blog/getBlogListByKey',
    method: 'post',
    params
  })
}

export function delBlog(params) {
  return request({
    url: BLOG_API+'blog/delBlog',
    method: 'post',
    params
  })
}

export function getBlogDetail(params) {
  return request({
    url: BLOG_API+'blog/getBlogDetail',
    method: 'post',
    params
  })
}

export function delComment(params) {
  return request({
    url: BLOG_API+'blog/delComment',
    method: 'post',
    params
  })
}


