import request from '@/utils/request'

export function getTeacherList(params) {
  return request({
    url: BASE_API+'course/addUI',
    method: 'get',
    params
  })
}

export function addSection(params) {
  return request({
    url: BASE_API+'course/addSection',
    method: 'post',
    params
  })
}

export function getSectionDetails(params) {
  return request({
    url: BASE_API+'course/updateSectionUI',
    method: 'post',
    params
  })
}

export function updateSkill(params) {
  return request({
    url: BASE_API+'course/updateSectionStatus',
    method: 'post',
    params
  })
}

export function addSkill(params) {
  return request({
    url: SKILL_API+'/receive_title_add_exercise',
    method: 'get',
    params
  })
}

export function updateSection(params) {
  return request({
    url: BASE_API+'course/updateSection',
    method: 'post',
    params
  })
}