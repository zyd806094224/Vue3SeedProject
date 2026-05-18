<!--
 * @Author: zhaoyudong
 * @Date: 2026-05-12 17:58:06
 * @LastEditors: zhaoyudong 
 * @LastEditTime: 2026-05-12 18:03:10
 * @Description: ----
 *
 * 页面功能：
 *   ----
 -->
<template>
  <div class="app-container">
    <!-- 搜索栏 -->
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch">
      <el-form-item label="标题" prop="title">
        <el-input
          v-model="queryParams.title"
          placeholder="请输入标题搜索"
          clearable
          style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="分类" prop="category">
        <el-select
          v-model="queryParams.category"
          placeholder="请选择分类"
          clearable
          style="width: 200px"
        >
          <el-option
            v-for="item in categoryOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
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
      <el-col :span="1.5">
        <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete">
          删除
        </el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList" />
    </el-row>

    <!-- 数据表格 -->
    <el-table v-loading="loading" :data="accountList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="50" align="center" />
      <el-table-column label="标题" align="center" prop="title" :show-overflow-tooltip="true" />
      <el-table-column label="分类" align="center" prop="category" width="100">
        <template #default="scope">
          <el-tag :type="categoryTagType(scope.row.category)">
            {{ categoryLabel(scope.row.category) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="用户名"
        align="center"
        prop="username"
        :show-overflow-tooltip="true"
      />
      <el-table-column label="密码" align="center" width="150">
        <template #default="scope">
          <div class="password-cell">
            <span v-if="!scope.row._showPassword">••••••••</span>
            <span v-else class="password-text">{{ scope.row._password }}</span>
            <el-button
              link
              :type="scope.row._showPassword ? 'warning' : 'primary'"
              :icon="scope.row._showPassword ? 'Hide' : 'View'"
              @click="togglePassword(scope.row)"
            />
            <el-button
              v-if="scope.row._showPassword"
              link
              type="primary"
              icon="CopyDocument"
              @click="copyPassword(scope.row)"
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column label="网址" align="center" prop="url" :show-overflow-tooltip="true">
        <template #default="scope">
          <el-link v-if="scope.row.url" type="primary" :href="scope.row.url" target="_blank">
            {{ scope.row.url }}
          </el-link>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center" prop="remark" :show-overflow-tooltip="true" />
      <el-table-column label="创建时间" align="center" prop="createTime" width="160" />
      <el-table-column label="操作" align="center" width="150">
        <template #default="scope">
          <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)"
            >修改</el-button
          >
          <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <pagination
      v-show="total > 0"
      :total="total"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 新增/修改对话框 -->
    <el-dialog :title="title" v-model="open" width="550px" append-to-body>
      <el-form ref="accountRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入账号标题" maxlength="100" />
        </el-form-item>
        <el-form-item label="分类" prop="category">
          <el-select v-model="form.category" placeholder="请选择分类">
            <el-option
              v-for="item in categoryOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="form.username"
            placeholder="请输入用户名/邮箱/手机号"
            maxlength="200"
          />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="请输入密码"
            maxlength="200"
            show-password
          />
        </el-form-item>
        <el-form-item label="网址" prop="url">
          <el-input v-model="form.url" placeholder="请输入网站URL" maxlength="500" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input
            v-model="form.remark"
            type="textarea"
            placeholder="请输入备注"
            maxlength="500"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="PasswordMgmt">
import {
  listAccount,
  getAccount,
  addAccount,
  updateAccount,
  delAccount
} from '@/api/personalCenterMgmt/passwordMgmt'

const { proxy } = getCurrentInstance()

// 分类选项
const categoryOptions = [
  { value: 'social', label: '社交' },
  { value: 'work', label: '工作' },
  { value: 'finance', label: '金融' },
  { value: 'other', label: '其他' }
]

// 状态
const loading = ref(false)
const showSearch = ref(true)
const accountList = ref([])
const open = ref(false)
const title = ref('')
const total = ref(0)
const ids = ref([])
const multiple = ref(true)

// 查询参数
const queryParams = reactive({
  pageNum: 1,
  pageSize: 10,
  title: undefined,
  category: undefined
})

// 表单
const form = ref({})

// 校验规则
const rules = {
  title: [{ required: true, message: '标题不能为空', trigger: 'blur' }],
  username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
  password: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
}

// 分类标签
function categoryLabel(value) {
  const item = categoryOptions.find((o) => o.value === value)
  return item ? item.label : value
}

function categoryTagType(value) {
  const map = { social: 'success', work: '', finance: 'warning', other: 'info' }
  return map[value] || 'info'
}

// 查询列表
function getList() {
  loading.value = true
  listAccount(queryParams).then((response) => {
    accountList.value = response.rows.map((item) => ({
      ...item,
      _showPassword: false,
      _password: ''
    }))
    total.value = response.total
    loading.value = false
  })
}

// 搜索
function handleQuery() {
  queryParams.pageNum = 1
  getList()
}

// 重置搜索
function resetQuery() {
  proxy.resetForm('queryRef')
  handleQuery()
}

// 多选
function handleSelectionChange(selection) {
  ids.value = selection.map((item) => item.accountId)
  multiple.value = !selection.length
}

// 密码显示/隐藏
function togglePassword(row) {
  if (row._showPassword) {
    row._showPassword = false
    row._password = ''
    return
  }
  // 调用详情接口获取加密密码
  getAccount(row.accountId).then((response) => {
    row._password = response.data.password || response.password
    row._showPassword = true
  })
}

// 复制密码
function copyPassword(row) {
  navigator.clipboard.writeText(row._password).then(() => {
    proxy.$modal.msgSuccess('密码已复制到剪贴板')
  })
}

// 重置表单
function reset() {
  form.value = {
    title: undefined,
    category: 'other',
    username: undefined,
    password: undefined,
    url: undefined,
    remark: undefined
  }
  proxy.resetForm('accountRef')
}

// 新增
function handleAdd() {
  reset()
  open.value = true
  title.value = '新增密码账号'
}

// 修改
function handleUpdate(row) {
  reset()
  const accountId = row.accountId || ids.value[0]
  getAccount(accountId).then((response) => {
    form.value = response.data || response
    open.value = true
    title.value = '修改密码账号'
  })
}

// 提交表单
function submitForm() {
  proxy.$refs['accountRef'].validate((valid) => {
    if (valid) {
      if (form.value.accountId) {
        updateAccount(form.value.accountId, form.value).then(() => {
          proxy.$modal.msgSuccess('修改成功')
          open.value = false
          getList()
        })
      } else {
        addAccount(form.value).then(() => {
          proxy.$modal.msgSuccess('新增成功')
          open.value = false
          getList()
        })
      }
    }
  })
}

// 删除
function handleDelete(row) {
  const accountIds = row.accountId || ids.value
  proxy.$modal
    .confirm('是否确认删除选中的密码账号？')
    .then(() => {
      return delAccount(accountIds)
    })
    .then(() => {
      getList()
      proxy.$modal.msgSuccess('删除成功')
    })
    .catch(() => {})
}

// 取消
function cancel() {
  open.value = false
  reset()
}

// 初始化
getList()
</script>

<style scoped lang="scss">
.password-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;

  .password-text {
    font-family: monospace;
    word-break: break-all;
  }
}
</style>
