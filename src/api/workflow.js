import request from '@/utils/request'

// 启动流程
export function startProcess(data) {
  return request({
    url: '/workflow/process/start',
    method: 'post',
    data
  })
}

// 审批通过
export function approveTask(data) {
  return request({
    url: '/workflow/process/approve',
    method: 'post',
    data
  })
}

// 驳回
export function rejectTask(data) {
  return request({
    url: '/workflow/process/reject',
    method: 'post',
    data
  })
}

// 驳回至指定节点
export function rejectToNode(data) {
  return request({
    url: '/workflow/process/rejectTo',
    method: 'post',
    data
  })
}

// 撤回流程
export function withdrawTask(data) {
  return request({
    url: '/workflow/process/withdraw',
    method: 'post',
    data
  })
}

// 获取审批历史
export function getHistory(processInstanceId) {
  return request({
    url: '/workflow/process/history/' + processInstanceId,
    method: 'get'
  })
}

// 获取可驳回节点
export function getRejectableNodes(taskId) {
  return request({
    url: '/workflow/process/rejectableNodes/' + taskId,
    method: 'get'
  })
}

// 获取审批进度
export function getProgress(instanceGroupId) {
  return request({
    url: '/workflow/approval/progress/' + instanceGroupId,
    method: 'get'
  })
}

// 获取数据快照
export function getSnapshot(processInstanceId) {
  return request({
    url: '/workflow/approval/snapshot/' + processInstanceId,
    method: 'get'
  })
}

// 获取所有业务类型
export function listBizTypes() {
  return request({
    url: '/workflow/approval/bizTypes',
    method: 'get'
  })
}

// 查询指定流程实例的待办任务
export function getPendingTasks(processInstanceId) {
  return request({
    url: '/workflow/approval/pendingTasks/' + processInstanceId,
    method: 'get'
  })
}

// 查询当前用户待办任务
export function getMyPendingTasks() {
  return request({
    url: '/workflow/approval/myPendingTasks',
    method: 'get'
  })
}
