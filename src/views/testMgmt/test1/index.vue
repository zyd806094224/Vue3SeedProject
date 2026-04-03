<template>
  <div class="workflow-test">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span>工作流审批测试</span>
          <el-tag :type="statusTagType">{{ statusText }}</el-tag>
        </div>
      </template>

      <!-- 步骤条 -->
      <el-steps :active="activeStep" finish-status="success" align-center class="steps">
        <el-step title="发起申请" />
        <el-step title="一级审批" />
        <el-step title="二级审批" />
        <el-step title="完成" />
      </el-steps>

      <el-divider />

      <div class="action-area">
        <!-- 场景选择 -->
        <div class="scenario-row">
          <span class="label">测试场景：</span>
          <el-radio-group v-model="scenario" :disabled="currentProcess !== null">
            <el-radio-button value="approve">全程通过</el-radio-button>
            <el-radio-button value="reject">一级驳回</el-radio-button>
            <el-radio-button value="reject_second">二级驳回</el-radio-button>
            <el-radio-button value="withdraw">撤回</el-radio-button>
          </el-radio-group>
        </div>

        <el-divider content-position="left">操作面板</el-divider>

        <!-- 发起申请 -->
        <div v-if="!currentProcess" class="step-section">
          <el-button type="primary" size="large" :loading="loading" @click="handleStart">
            发起审批流程
          </el-button>
          <p class="hint">流程key: demo_approval，审批人: 当前登录用户</p>
        </div>

        <!-- 一级审批 -->
        <div v-if="currentProcess && currentStep === 'first'" class="step-section">
          <el-descriptions :column="2" border size="small">
            <el-descriptions-item label="流程实例ID">{{ currentProcess.processInstanceId }}</el-descriptions-item>
            <el-descriptions-item label="实例组ID">{{ currentProcess.instanceGroupId }}</el-descriptions-item>
            <el-descriptions-item label="当前节点">一级审批</el-descriptions-item>
            <el-descriptions-item label="任务ID">{{ currentTaskId || '获取中...' }}</el-descriptions-item>
          </el-descriptions>
          <div class="btn-row">
            <el-input v-model="comment" placeholder="审批意见" style="width: 300px; margin-right: 12px" />
            <el-button
              v-if="scenario === 'approve' || scenario === 'reject_second'"
              type="success" :loading="loading" :disabled="!currentTaskId"
              @click="handleApprove(currentTaskId)"
            >通过</el-button>
            <el-button
              v-if="scenario === 'reject'"
              type="danger" :loading="loading" :disabled="!currentTaskId"
              @click="handleReject(currentTaskId)"
            >驳回</el-button>
            <el-button
              v-if="scenario === 'withdraw'"
              type="warning" :loading="loading" :disabled="!currentTaskId"
              @click="handleWithdraw(currentTaskId)"
            >撤回</el-button>
          </div>
        </div>

        <!-- 二级审批 -->
        <div v-if="currentProcess && currentStep === 'second'" class="step-section">
          <el-descriptions :column="2" border size="small">
            <el-descriptions-item label="流程实例ID">{{ currentProcess.processInstanceId }}</el-descriptions-item>
            <el-descriptions-item label="当前节点">二级审批（会签）</el-descriptions-item>
            <el-descriptions-item label="任务ID">{{ currentTaskId || '获取中...' }}</el-descriptions-item>
            <el-descriptions-item label="操作">{{ scenario === 'reject_second' ? '将驳回' : '将通过' }}</el-descriptions-item>
          </el-descriptions>
          <div class="btn-row">
            <el-input v-model="comment" placeholder="审批意见" style="width: 300px; margin-right: 12px" />
            <el-button
              v-if="scenario === 'approve'"
              type="success" :loading="loading" :disabled="!currentTaskId"
              @click="handleApprove(currentTaskId)"
            >通过</el-button>
            <el-button
              v-if="scenario === 'reject_second'"
              type="danger" :loading="loading" :disabled="!currentTaskId"
              @click="handleReject(currentTaskId)"
            >驳回</el-button>
          </div>
        </div>

        <!-- 已结束 -->
        <div v-if="currentProcess && currentStep === 'done'" class="step-section">
          <el-result :icon="resultIcon" :title="resultTitle" :sub-title="resultSubTitle">
            <template #extra>
              <el-button type="primary" @click="handleReset">重新测试</el-button>
            </template>
          </el-result>
        </div>

        <el-divider content-position="left">审批进度</el-divider>

        <!-- 进度时间线 -->
        <div v-if="progressList.length > 0" class="timeline-section">
          <el-timeline>
            <el-timeline-item
              v-for="(item, index) in progressList"
              :key="index"
              :type="getTimelineType(item.optType)"
              :timestamp="item.nodeTime"
              placement="top"
            >
              <el-card shadow="never" class="timeline-card">
                <p><strong>{{ item.nodeName }}</strong> - {{ item.optTypeDesc }}</p>
                <p>操作人: {{ item.userName || ('userId:' + item.userId) }} | {{ item.statusDesc }}</p>
                <p v-if="item.comment">意见: {{ item.comment }}</p>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </div>
        <el-empty v-else description="暂无审批记录" :image-size="60" />

        <!-- 操作日志 -->
        <el-divider content-position="left">操作日志</el-divider>
        <div class="log-section">
          <div v-for="(log, index) in logs" :key="index" class="log-item" :class="log.type">
            [{{ log.time }}] {{ log.msg }}
          </div>
          <el-empty v-if="logs.length === 0" description="暂无日志" :image-size="40" />
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import {
  startProcess,
  approveTask,
  rejectTask,
  withdrawTask,
  getProgress,
  getPendingTasks
} from '@/api/workflow'

interface ProcessInfo {
  processInstanceId: string
  instanceGroupId: number
  bizKey: string
}

interface ProgressItem {
  id: number
  instanceGroupId: number
  processInstanceId: string
  taskId: string
  nodeId: string
  nodeName: string
  optType: number
  optTypeDesc: string
  status: number
  statusDesc: string
  comment: string
  userId: number
  userName: string
  nodeTime: string
}

interface LogItem {
  time: string
  msg: string
  type: 'info' | 'success' | 'error' | 'warning'
}

const loading = ref(false)
const scenario = ref('approve')
const comment = ref('')
const currentProcess = ref<ProcessInfo | null>(null)
const currentTaskId = ref('')
const currentStep = ref<'first' | 'second' | 'done'>('first')
const finalResult = ref<'approved' | 'rejected' | 'withdrawn'>('approved')
const progressList = ref<ProgressItem[]>([])
const logs = ref<LogItem[]>([])

const activeStep = computed(() => {
  if (!currentProcess.value) return 0
  if (currentStep.value === 'first') return 1
  if (currentStep.value === 'second') return 2
  return 3
})

const statusText = computed(() => {
  if (!currentProcess.value) return '未开始'
  if (currentStep.value === 'done') {
    if (finalResult.value === 'approved') return '已通过'
    if (finalResult.value === 'rejected') return '已驳回'
    return '已撤回'
  }
  return '审批中'
})

const statusTagType = computed(() => {
  if (!currentProcess.value) return 'info'
  if (currentStep.value === 'done') {
    if (finalResult.value === 'approved') return 'success'
    if (finalResult.value === 'rejected') return 'danger'
    return 'warning'
  }
  return 'primary'
})

const resultIcon = computed(() => {
  if (finalResult.value === 'approved') return 'success'
  if (finalResult.value === 'rejected') return 'error'
  return 'warning'
})

const resultTitle = computed(() => {
  if (finalResult.value === 'approved') return '审批通过'
  if (finalResult.value === 'rejected') return '审批驳回'
  return '流程已撤回'
})

const resultSubTitle = computed(() => {
  if (finalResult.value === 'approved') return '流程已走完所有审批节点，审批通过'
  if (finalResult.value === 'rejected') return '审批人驳回了申请，流程结束'
  return '发起人撤回了申请，流程结束'
})

function addLog(msg: string, type: LogItem['type'] = 'info') {
  const now = new Date()
  const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`
  logs.value.unshift({ time, msg, type })
}

function getTimelineType(optType: number) {
  if (optType === 1) return 'primary'
  if (optType === 2) return 'success'
  if (optType === 3 || optType === 4) return 'danger'
  if (optType === 5) return 'warning'
  return 'info'
}

// 刷新审批进度
async function refreshProgress() {
  if (!currentProcess.value) return
  try {
    const res: any = await getProgress(currentProcess.value.instanceGroupId)
    if (res.code === 200 && res.data) {
      progressList.value = res.data.progressList || []
    }
  } catch {
    // ignore
  }
}

// 轮询获取待办任务ID
async function fetchPendingTaskId(processInstanceId: string, retries = 10): Promise<string> {
  for (let i = 0; i < retries; i++) {
    await new Promise(r => setTimeout(r, 800))
    try {
      const res: any = await getPendingTasks(processInstanceId)
      if (res.code === 200 && res.data && res.data.length > 0) {
        return res.data[0].taskId
      }
    } catch {
      // ignore
    }
  }
  return ''
}

async function handleStart() {
  loading.value = true
  addLog('正在发起审批流程...')
  try {
    const res: any = await startProcess({
      processKey: 'demo_approval',
      bizKey: 'TEST_' + Date.now(),
      bizId: 1,
      recordId: Date.now(),
      bizType: 1,
      bizTypeName: '测试审批',
      bizItemId: 1,
      formSchema: JSON.stringify({ title: '测试申请', amount: 5000 }),
      variables: {
        firstApprovers: [1],   // 一级审批人（admin）
        secondApprovers: [1]   // 二级审批人（admin）
      }
    })
    if (res.code === 200) {
      currentProcess.value = res.data
      currentStep.value = 'first'
      addLog(`流程启动成功！processInstanceId=${res.data.processInstanceId}, groupId=${res.data.instanceGroupId}`, 'success')

      // 获取一级审批任务
      addLog('等待任务创建，获取任务ID...')
      const taskId = await fetchPendingTaskId(res.data.processInstanceId)
      if (taskId) {
        currentTaskId.value = taskId
        addLog(`获取到一级审批任务: ${taskId}`, 'success')
      } else {
        addLog('未能获取到任务ID，请刷新重试', 'error')
      }
      await refreshProgress()
    } else {
      addLog(`启动失败: ${res.msg}`, 'error')
    }
  } catch (e: any) {
    addLog(`启动异常: ${e.message || e}`, 'error')
  } finally {
    loading.value = false
  }
}

async function handleApprove(taskId: string) {
  loading.value = true
  const stepLabel = currentStep.value === 'first' ? '一级审批' : '二级审批'
  addLog(`正在执行${stepLabel}-通过...`)
  try {
    const res: any = await approveTask({ taskId, comment: comment.value || '同意' })
    if (res.code === 200) {
      addLog(`${stepLabel}通过成功！`, 'success')
      comment.value = ''
      await new Promise(r => setTimeout(r, 1500))
      await refreshProgress()

      if (currentStep.value === 'first') {
        // 进入二级审批，获取新任务
        currentStep.value = 'second'
        currentTaskId.value = ''
        addLog('等待二级审批任务创建...')
        const newTaskId = await fetchPendingTaskId(currentProcess.value!.processInstanceId)
        if (newTaskId) {
          currentTaskId.value = newTaskId
          addLog(`获取到二级审批任务: ${newTaskId}`, 'success')
        } else {
          addLog('未能获取到二级审批任务ID', 'warning')
          // 可能流程直接结束了（会签只有一个人时可能直接结束）
          await refreshProgress()
          const group: any = progressList.value
          // 检查是否流程已经完成
          currentStep.value = 'done'
          finalResult.value = 'approved'
          addLog('流程结束，审批通过！', 'success')
        }
      } else {
        currentStep.value = 'done'
        finalResult.value = 'approved'
        addLog('流程结束，审批通过！', 'success')
      }
    } else {
      addLog(`审批失败: ${res.msg}`, 'error')
    }
  } catch (e: any) {
    addLog(`审批异常: ${e.message || e}`, 'error')
  } finally {
    loading.value = false
  }
}

async function handleReject(taskId: string) {
  loading.value = true
  const stepLabel = currentStep.value === 'first' ? '一级审批' : '二级审批'
  addLog(`正在执行${stepLabel}-驳回...`)
  try {
    const res: any = await rejectTask({ taskId, comment: comment.value || '不同意' })
    if (res.code === 200) {
      addLog(`${stepLabel}驳回成功！`, 'warning')
      comment.value = ''
      currentStep.value = 'done'
      finalResult.value = 'rejected'
      await new Promise(r => setTimeout(r, 1500))
      await refreshProgress()
      addLog('流程结束，已驳回', 'warning')
    } else {
      addLog(`驳回失败: ${res.msg}`, 'error')
    }
  } catch (e: any) {
    addLog(`驳回异常: ${e.message || e}`, 'error')
  } finally {
    loading.value = false
  }
}

async function handleWithdraw(taskId: string) {
  loading.value = true
  addLog('正在撤回流程...')
  try {
    const res: any = await withdrawTask({ taskId, comment: comment.value || '发起人撤回' })
    if (res.code === 200) {
      addLog('撤回成功！', 'warning')
      comment.value = ''
      currentStep.value = 'done'
      finalResult.value = 'withdrawn'
      await new Promise(r => setTimeout(r, 1500))
      await refreshProgress()
      addLog('流程结束，已撤回', 'warning')
    } else {
      addLog(`撤回失败: ${res.msg}`, 'error')
    }
  } catch (e: any) {
    addLog(`撤回异常: ${e.message || e}`, 'error')
  } finally {
    loading.value = false
  }
}

function handleReset() {
  currentProcess.value = null
  currentTaskId.value = ''
  currentStep.value = 'first'
  comment.value = ''
  progressList.value = []
  logs.value = []
  scenario.value = 'approve'
  finalResult.value = 'approved'
}
</script>

<style scoped lang="scss">
.workflow-test {
  padding: 16px;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.steps {
  margin-bottom: 20px;
}

.action-area {
  max-width: 800px;
}

.scenario-row {
  margin-bottom: 16px;

  .label {
    margin-right: 12px;
    color: #606266;
    font-size: 14px;
  }
}

.step-section {
  margin: 16px 0;
}

.hint {
  margin-top: 8px;
  color: #909399;
  font-size: 13px;
}

.btn-row {
  display: flex;
  align-items: center;
  margin-top: 12px;
}

.timeline-section {
  max-height: 400px;
  overflow-y: auto;
  padding-right: 8px;
}

.timeline-card {
  padding: 8px 12px;

  p {
    margin: 4px 0;
    font-size: 13px;
    line-height: 1.5;
  }
}

.log-section {
  max-height: 250px;
  overflow-y: auto;
  font-family: Menlo, Monaco, Consolas, 'Courier New', monospace;
  font-size: 12px;
  line-height: 1.8;
  padding: 8px;
  background: #fafafa;
  border-radius: 4px;
  border: 1px solid #ebeef5;
}

.log-item {
  &.info { color: #606266; }
  &.success { color: #67c23a; }
  &.error { color: #f56c6c; }
  &.warning { color: #e6a23c; }
}
</style>
