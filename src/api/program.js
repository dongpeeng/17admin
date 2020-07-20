import request from '@/utils/request'

export function getDetails(params) {
  return request({
    url: BASE_API+'exercise/getProgramExerciseById',
    method: 'post',
    params
  })
}

export function update(params) {
  return request({
    url: BASE_API+'exercise/updateProgramExerciseById',
    method: 'post',
    params
  })
}

export function getList(params) {
  return request({
    url: BASE_API+'exercise/getProgramExerciseList',
    method: 'post',
    params
  })
}




