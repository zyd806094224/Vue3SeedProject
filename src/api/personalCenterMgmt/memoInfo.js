/*
 * @Author: zhaoyudong
 * @Date: 2026-05-18 15:44:27
 * @LastEditors: zhaoyudong
 * @LastEditTime: 2026-05-18 15:44:27
 * @Description: ----
 *
 * 页面功能：
 *   ----
 */
import request from '@/utils/request'

// 查询备忘录列表
export function listMemoInfo(query) {
  return request({
    url: '/api/memo/info/list',
    method: 'get',
    params: query
  })
}

// 查询备忘录详情（含字段值和字段定义）
export function getMemoInfo(memoId) {
  return request({
    url: '/api/memo/info/' + memoId,
    method: 'get'
  })
}

// 新增备忘录
export function addMemoInfo(data) {
  return request({
    url: '/api/memo/info',
    method: 'post',
    data: data
  })
}

// 修改备忘录
export function updateMemoInfo(data) {
  return request({
    url: '/api/memo/info',
    method: 'put',
    data: data
  })
}

// 删除备忘录
export function delMemoInfo(memoIds) {
  return request({
    url: '/api/memo/info/' + memoIds,
    method: 'delete'
  })
}
