import request from '@/utils/request'
// 获取套题页面列表
var baseUrl='http://excises.superlanlanlan.cn'
export function getchapterList(params) {
    return request({
      url: baseUrl+'/show_tao_names',
      method: 'get',
      params
    })
  }
// 添加套题名称
  export function insertchapterList(params) {
    return request({
      url: baseUrl+'/insertExerciseInfor',
      method: 'get',
      params
    })
  }
// 插入单选题
  export function insertSingle(params) {
    return request({
      url: baseUrl+'/insertSingleExercise',
      method: 'get',
      params
    })
  }
// 插入多选题
  export function insertMultiple(params) {
    return request({
      url: baseUrl+'/insertMultipleExercise',
      method: 'get',
      params
    })
  }
// 显示单选列表
  export function getSingleExerciseList(params) {
    return request({
      url: baseUrl+'/show_tao_single_by_parts',
      method: 'get',
      params
    })
  }
// 显示多选列表
  export function getMultipleExerciseList(params) {
    return request({
      url:baseUrl+'/show_tao_multiple_by_parts',
      method: 'get',
      params
    })
  }
// 删除单选
  export function delSingleList(params) {
    return request({
      url: baseUrl+'/deleSingleExercise',
      method: 'get',
      params
    })
  } 
  // 删除多选
  export function delMultipleList(params) {
    return request({
      url: baseUrl+'/deleMultipleExercise',
      method: 'get',
      params
    })
  } 
  // 修改单选
  export function updateSingleList(params) {
    return request({
      url: baseUrl+'/updateSingleExercise',
      method: 'get',
      params
    })
  } 
  // 修改多选
  export function updateMultipleList(params) {
    return request({
      url: baseUrl+'/updateMultipleExercise',
      method: 'get',
      params
    })
  } 