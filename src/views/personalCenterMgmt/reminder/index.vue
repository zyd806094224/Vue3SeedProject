<template>
  <div class="app-container">
    <!-- 搜索栏 -->
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch">
      <el-form-item label="标题" prop="title">
        <el-input v-model="queryParams.title" placeholder="请输入标题" clearable style="width: 200px"
          @keyup.enter="handleQuery" />
      </el-form-item>
      <el-form-item label="分类" prop="category">
        <el-select v-model="queryParams.category" placeholder="请选择分类" clearable style="width: 150px">
          <el-option v-for="item in categoryOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择状态" clearable style="width: 150px">
          <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
        <el-button icon="Refresh" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 操作按钮 -->
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" plain icon="Plus" @click="handleAdd">新增</el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList" />
    </el-row>

    <!-- 数据表格 -->
    <el-table v-loading="loading" :data="reminderList">
      <el-table-column label="标题" prop="title" min-width="150" show-overflow-tooltip />
      <el-table-column label="分类" prop="category" width="90" align="center">
        <template #default="scope">
          <el-tag :type="categoryTagType(scope.row.category)" size="small">
            {{ categoryMap[scope.row.category] || scope.row.category }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="到期日期" prop="dueDate" width="110" align="center" />
      <el-table-column label="剩余天数" width="100" align="center">
        <template #default="scope">
          <span :style="{ color: daysColor(scope.row) }">{{ daysText(scope.row) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="提前天数" prop="remindBeforeDays" width="85" align="center" />
      <el-table-column label="提醒时间" prop="remindTime" width="85" align="center" />
      <el-table-column label="状态" prop="status" width="85" align="center">
        <template #default="scope">
          <el-tag :type="statusTagType(scope.row.status)" size="small">
            {{ statusMap[scope.row.status] }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="续期次数" prop="renewalCount" width="85" align="center" />
      <el-table-column label="操作" width="320" fixed="right" align="center">
        <template #default="scope">
          <el-button link type="primary" icon="Edit" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button link type="success" icon="RefreshRight" @click="handleRenew(scope.row)"
            v-if="scope.row.status !== '3' && scope.row.status !== '4'">续期</el-button>
          <el-button link icon="Message" @click="handleSend(scope.row)">提醒</el-button>
          <el-button link type="warning" icon="Check" @click="handleComplete(scope.row)"
            v-if="scope.row.status !== '3'">完成</el-button>
          <el-button link type="danger" icon="Delete" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize" @pagination="getList" />

    <!-- 新增/编辑弹窗 -->
    <el-dialog :title="dialogTitle" v-model="dialogVisible" width="600px" destroy-on-close>
      <el-form ref="formRef" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="事项标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入事项标题" maxlength="200" />
        </el-form-item>
        <el-form-item label="事项描述" prop="description">
          <el-input v-model="form.description" type="textarea" :rows="3" placeholder="请输入事项描述" maxlength="1000" />
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="分类" prop="category">
              <el-select v-model="form.category" placeholder="请选择分类" style="width: 100%">
                <el-option v-for="item in categoryOptions" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="到期日期" prop="dueDate">
              <el-date-picker v-model="form.dueDate" type="date" value-format="YYYY-MM-DD" placeholder="选择到期日期"
                style="width: 100%" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="提前天数" prop="remindBeforeDays">
              <el-input-number v-model="form.remindBeforeDays" :min="0" :max="365" :controls-position="true" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="提醒时间" prop="remindTime">
              <el-time-picker v-model="form.remindTime" format="HH:mm" value-format="HH:mm:ss"
                placeholder="选择时间" style="width: 100%" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="过期频率(天)" prop="overdueFrequency">
              <el-input-number v-model="form.overdueFrequency" :min="0" :max="365" :controls-position="true" style="width: 100%" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="收件邮箱" prop="recipientEmail">
          <el-input v-model="form.recipientEmail" placeholder="为空则使用默认邮箱" maxlength="200" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入备注" maxlength="500" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </template>
    </el-dialog>

    <!-- 续期弹窗 -->
    <el-dialog title="续期提醒事项" v-model="renewDialogVisible" width="400px" destroy-on-close>
      <el-form ref="renewFormRef" :model="renewForm" :rules="renewRules" label-width="100px">
        <el-form-item label="事项标题">
          <span>{{ renewItem?.title }}</span>
        </el-form-item>
        <el-form-item label="当前到期日">
          <span>{{ renewItem?.dueDate }}</span>
        </el-form-item>
        <el-form-item label="新的到期日" prop="newDueDate">
          <el-date-picker v-model="renewForm.newDueDate" type="date" value-format="YYYY-MM-DD"
            placeholder="选择新的到期日期" style="width: 100%" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="renewDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitRenew">确认续期</el-button>
      </template>
    </el-dialog>

    <!-- 手动提醒弹窗 -->
    <el-dialog title="发送提醒" v-model="sendDialogVisible" width="500px" destroy-on-close>
      <el-form label-width="100px">
        <el-form-item label="事项标题">
          <span>{{ sendItem?.title }}</span>
        </el-form-item>
        <el-form-item label="到期日期">
          <span>{{ sendItem?.dueDate }}</span>
        </el-form-item>
        <el-form-item label="自定义内容">
          <el-input v-model="sendContent" type="textarea" :rows="4" placeholder="可输入额外的提醒内容（可选）" maxlength="500"
            show-word-limit />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="sendDialogVisible = false">取 消</el-button>
        <el-button type="primary" :loading="sendLoading" @click="submitSend">发送提醒</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  listReminder, getReminder, addReminder, updateReminder,
  delReminder, renewReminder, completeReminder, closeReminder, sendReminder
} from '@/api/personalCenterMgmt/reminderItem'

// 分类选项
const categoryOptions = [
  { value: 'work', label: '工作' },
  { value: 'life', label: '生活' },
  { value: 'finance', label: '财务' },
  { value: 'health', label: '健康' },
  { value: 'subscription', label: '订阅' },
  { value: 'license', label: '证件' },
  { value: 'other', label: '其他' }
]

const categoryMap = {}
categoryOptions.forEach(item => { categoryMap[item.value] = item.label })

// 状态选项
const statusOptions = [
  { value: '0', label: '待提醒' },
  { value: '1', label: '提醒中' },
  { value: '2', label: '已到期' },
  { value: '3', label: '已完成' },
  { value: '4', label: '已关闭' }
]

const statusMap = {}
statusOptions.forEach(item => { statusMap[item.value] = item.label })

// 列表相关
const loading = ref(false)
const reminderList = ref([])
const total = ref(0)
const showSearch = ref(true)
const queryParams = reactive({
  pageNum: 1,
  pageSize: 10,
  title: '',
  category: '',
  status: ''
})

function getList() {
  loading.value = true
  listReminder(queryParams).then(res => {
    reminderList.value = res.rows
    total.value = res.total
    loading.value = false
  })
}

function handleQuery() {
  queryParams.pageNum = 1
  getList()
}

function resetQuery() {
  queryParams.title = ''
  queryParams.category = ''
  queryParams.status = ''
  handleQuery()
}

// 表单相关
const dialogVisible = ref(false)
const dialogTitle = ref('')
const formRef = ref(null)
const form = ref({})
const isEdit = ref(false)
const editId = ref(null)

const rules = {
  title: [{ required: true, message: '请输入事项标题', trigger: 'blur' }],
  dueDate: [{ required: true, message: '请选择到期日期', trigger: 'change' }]
}

function resetForm() {
  form.value = {
    title: '',
    description: '',
    category: 'other',
    dueDate: '',
    remindBeforeDays: 7,
    remindTime: '09:00:00',
    overdueFrequency: 1,
    recipientEmail: '',
    remark: ''
  }
}

function handleAdd() {
  resetForm()
  isEdit.value = false
  editId.value = null
  dialogTitle.value = '新增提醒事项'
  dialogVisible.value = true
}

function handleEdit(row) {
  resetForm()
  isEdit.value = true
  editId.value = row.reminderId
  getReminder(row.reminderId).then(res => {
    form.value = res.data
    dialogTitle.value = '编辑提醒事项'
    dialogVisible.value = true
  })
}

function submitForm() {
  formRef.value.validate(valid => {
    if (!valid) return
    if (isEdit.value) {
      updateReminder(editId.value, form.value).then(res => {
        if (res.code === 200) {
          ElMessage.success('修改成功')
          dialogVisible.value = false
          getList()
        } else {
          ElMessage.error(res.msg || '修改失败')
        }
      })
    } else {
      addReminder(form.value).then(res => {
        if (res.code === 200) {
          ElMessage.success('新增成功')
          dialogVisible.value = false
          getList()
        } else {
          ElMessage.error(res.msg || '新增失败')
        }
      })
    }
  })
}

function handleDelete(row) {
  ElMessageBox.confirm('确认删除该提醒事项？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    delReminder(row.reminderId).then(res => {
      if (res.code === 200) {
        ElMessage.success('删除成功')
        getList()
      } else {
        ElMessage.error(res.msg || '删除失败')
      }
    })
  }).catch(() => {})
}

// 续期相关
const renewDialogVisible = ref(false)
const renewFormRef = ref(null)
const renewForm = ref({ newDueDate: '' })
const renewItem = ref(null)

const renewRules = {
  newDueDate: [{ required: true, message: '请选择新的到期日期', trigger: 'change' }]
}

function handleRenew(row) {
  renewItem.value = row
  renewForm.value.newDueDate = ''
  renewDialogVisible.value = true
}

function submitRenew() {
  renewFormRef.value.validate(valid => {
    if (!valid) return
    renewReminder(renewItem.value.reminderId, renewForm.value.newDueDate).then(res => {
      if (res.code === 200) {
        ElMessage.success('续期成功')
        renewDialogVisible.value = false
        getList()
      } else {
        ElMessage.error(res.msg || '续期失败')
      }
    })
  })
}

// 完成操作
function handleComplete(row) {
  ElMessageBox.confirm('确认标记该事项为已完成？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    completeReminder(row.reminderId).then(res => {
      if (res.code === 200) {
        ElMessage.success('操作成功')
        getList()
      } else {
        ElMessage.error(res.msg || '操作失败')
      }
    })
  }).catch(() => {})
}

// 手动提醒相关
const sendDialogVisible = ref(false)
const sendItem = ref(null)
const sendContent = ref('')
const sendLoading = ref(false)

function handleSend(row) {
  sendItem.value = row
  sendContent.value = ''
  sendDialogVisible.value = true
}

function submitSend() {
  sendLoading.value = true
  sendReminder(sendItem.value.reminderId, sendContent.value).then(res => {
    sendLoading.value = false
    if (res.code === 200) {
      ElMessage.success(res.msg || '提醒邮件已发送')
      sendDialogVisible.value = false
    } else {
      ElMessage.error(res.msg || '发送失败')
    }
  }).catch(() => {
    sendLoading.value = false
  })
}

// 辅助函数
function calculateDays(row) {
  if (!row.dueDate) return 0
  const due = new Date(row.dueDate)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  due.setHours(0, 0, 0, 0)
  return Math.ceil((due - today) / (1000 * 60 * 60 * 24))
}

function daysText(row) {
  const days = calculateDays(row)
  if (days > 0) return days + '天'
  if (days === 0) return '今天'
  return Math.abs(days) + '天'
}

function daysColor(row) {
  const days = calculateDays(row)
  if (days > 7) return '#67C23A'
  if (days > 0) return '#E6A23C'
  if (days === 0) return '#F56C6C'
  return '#F56C6C'
}

function statusTagType(status) {
  const map = { '0': 'info', '1': 'warning', '2': 'danger', '3': 'success', '4': '' }
  return map[status] || 'info'
}

function categoryTagType(category) {
  const map = {
    work: '', life: 'success', finance: 'warning',
    health: 'danger', subscription: 'info', license: '', other: 'info'
  }
  return map[category] || 'info'
}

// 初始化
getList()
</script>

<style scoped>
.app-container {
  padding: 20px;
}
</style>
