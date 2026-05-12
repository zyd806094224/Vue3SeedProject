/*
 * @Author: zhaoyudong
 * @Date: 2026-05-12 17:56:40
 * @LastEditors: zhaoyudong
 * @LastEditTime: 2026-05-12 17:56:40
 * @Description: ----
 *
 * 页面功能：
 *   ----
 */
import request from '@/utils/request'

// 查询密码账号列表
export function listAccount(query) {
  return request({
    url: '/api/accounts',
    method: 'get',
    params: query
  })
}

// 查询密码账号详情
export function getAccount(id) {
  return request({
    url: '/api/accounts/' + id,
    method: 'get'
  })
}

// 新增密码账号
export function addAccount(data) {
  return request({
    url: '/api/accounts',
    method: 'post',
    data: data
  })
}

// 修改密码账号
export function updateAccount(id, data) {
  return request({
    url: '/api/accounts/' + id,
    method: 'put',
    data: data
  })
}

// 删除密码账号
export function delAccount(id) {
  return request({
    url: '/api/accounts/' + id,
    method: 'delete'
  })
}