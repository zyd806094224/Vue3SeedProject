import request from '@/utils/request'

// 查询提醒事项列表
export function listReminder(query) {
  return request({
    url: '/api/reminder/list',
    method: 'get',
    params: query
  })
}

// 查询提醒事项详情
export function getReminder(reminderId) {
  return request({
    url: '/api/reminder/' + reminderId,
    method: 'get'
  })
}

// 新增提醒事项
export function addReminder(data) {
  return request({
    url: '/api/reminder',
    method: 'post',
    data: data
  })
}

// 修改提醒事项
export function updateReminder(reminderId, data) {
  return request({
    url: '/api/reminder/' + reminderId,
    method: 'put',
    data: data
  })
}

// 删除提醒事项
export function delReminder(reminderId) {
  return request({
    url: '/api/reminder/' + reminderId,
    method: 'delete'
  })
}

// 续期提醒事项
export function renewReminder(reminderId, newDueDate) {
  return request({
    url: '/api/reminder/' + reminderId + '/renew',
    method: 'put',
    data: { newDueDate }
  })
}

// 标记完成
export function completeReminder(reminderId) {
  return request({
    url: '/api/reminder/' + reminderId + '/complete',
    method: 'put'
  })
}

// 关闭提醒
export function closeReminder(reminderId) {
  return request({
    url: '/api/reminder/' + reminderId + '/close',
    method: 'put'
  })
}

// 手动发送提醒邮件
export function sendReminder(reminderId, customContent) {
  return request({
    url: '/api/reminder/' + reminderId + '/send',
    method: 'post',
    data: { customContent }
  })
}
