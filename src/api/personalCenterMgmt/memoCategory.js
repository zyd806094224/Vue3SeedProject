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

// 查询分类列表
export function listCategory(query) {
  return request({
    url: '/api/memo/category/list',
    method: 'get',
    params: query
  })
}

// 查询分类详情
export function getCategory(categoryId) {
  return request({
    url: '/api/memo/category/' + categoryId,
    method: 'get'
  })
}

// 新增分类
export function addCategory(data) {
  return request({
    url: '/api/memo/category',
    method: 'post',
    data: data
  })
}

// 修改分类
export function updateCategory(data) {
  return request({
    url: '/api/memo/category',
    method: 'put',
    data: data
  })
}

// 删除分类
export function delCategory(categoryId) {
  return request({
    url: '/api/memo/category/' + categoryId,
    method: 'delete'
  })
}

// 获取分类的字段定义
export function getCategoryFields(categoryId) {
  return request({
    url: '/api/memo/category/' + categoryId + '/fields',
    method: 'get'
  })
}

// 保存分类的字段定义（全量替换）
export function saveCategoryFields(categoryId, data) {
  return request({
    url: '/api/memo/category/' + categoryId + '/fields',
    method: 'put',
    data: data
  })
}
