<!--
 * @Author: zhaoyudong
 * @Date: 2026-05-18 15:50:00
 * @Description: 备忘录分类管理
 -->
<template>
  <div class="app-container">
    <!-- 搜索栏 -->
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch">
      <el-form-item label="分类名称" prop="categoryName">
        <el-input
          v-model="queryParams.categoryName"
          placeholder="请输入分类名称"
          clearable
          style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select
          v-model="queryParams.status"
          placeholder="分类状态"
          clearable
          style="width: 200px"
        >
          <el-option
            v-for="dict in sys_normal_disable"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
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
    <el-table v-loading="loading" :data="categoryList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="50" align="center" />
      <el-table-column
        label="分类名称"
        align="center"
        prop="categoryName"
        :show-overflow-tooltip="true"
      />
      <el-table-column label="图标" align="center" prop="categoryIcon" width="80">
        <template #default="scope">
          <svg-icon v-if="scope.row.categoryIcon" :icon-class="scope.row.categoryIcon" />
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column label="排序" align="center" prop="orderNum" width="80" />
      <el-table-column label="状态" align="center" prop="status" width="100">
        <template #default="scope">
          <dict-tag :options="sys_normal_disable" :value="scope.row.status" />
        </template>
      </el-table-column>
      <el-table-column label="字段数" align="center" width="80">
        <template #default="scope">
          <el-button link type="primary" @click="handleFieldDefs(scope.row)">
            {{ scope.row._fieldCount !== undefined ? scope.row._fieldCount : '-' }}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center" prop="createTime" width="160" />
      <el-table-column label="备注" align="center" prop="remark" :show-overflow-tooltip="true" />
      <el-table-column label="操作" align="center" width="220">
        <template #default="scope">
          <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)"
            >修改</el-button
          >
          <el-button link type="primary" icon="Setting" @click="handleFieldDefs(scope.row)"
            >管理字段</el-button
          >
          <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 新增/修改对话框 -->
    <el-dialog :title="title" v-model="open" width="500px" append-to-body>
      <el-form ref="categoryRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="分类名称" prop="categoryName">
          <el-input v-model="form.categoryName" placeholder="请输入分类名称" maxlength="100" />
        </el-form-item>
        <el-form-item label="分类图标" prop="categoryIcon">
          <el-input v-model="form.categoryIcon" placeholder="请输入图标名称" maxlength="100" />
        </el-form-item>
        <el-form-item label="显示排序" prop="orderNum">
          <el-input-number v-model="form.orderNum" controls-position="right" :min="0" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio v-for="dict in sys_normal_disable" :key="dict.value" :value="dict.value">{{
              dict.label
            }}</el-radio>
          </el-radio-group>
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

    <!-- 字段定义抽屉 -->
    <el-drawer
      :title="'字段管理 - ' + currentCategory.categoryName"
      v-model="fieldDrawerOpen"
      direction="rtl"
      size="650px"
    >
      <div class="field-drawer-content">
        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button type="primary" plain icon="Plus" @click="handleAddField">添加字段</el-button>
          </el-col>
        </el-row>

        <el-table :data="fieldDefs" border style="width: 100%">
          <el-table-column label="字段名称" prop="fieldName" min-width="120">
            <template #default="scope">
              <el-input
                v-if="scope.row._editing"
                v-model="scope.row.fieldName"
                placeholder="字段名称"
                size="small"
              />
              <span v-else>{{ scope.row.fieldName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="字段类型" prop="fieldType" width="120">
            <template #default="scope">
              <el-select
                v-if="scope.row._editing"
                v-model="scope.row.fieldType"
                placeholder="类型"
                size="small"
              >
                <el-option label="单行文本" value="text" />
                <el-option label="多行文本" value="textarea" />
                <el-option label="数字" value="number" />
                <el-option label="日期" value="date" />
                <el-option label="下拉选择" value="select" />
                <el-option label="单选" value="radio" />
              </el-select>
              <span v-else>{{ fieldTypeLabel(scope.row.fieldType) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="选项值" prop="fieldOptions" min-width="140">
            <template #default="scope">
              <el-input
                v-if="
                  scope.row._editing &&
                  (scope.row.fieldType === 'select' || scope.row.fieldType === 'radio')
                "
                v-model="scope.row.fieldOptions"
                placeholder='如: ["选项A","选项B"]'
                size="small"
              />
              <span v-else-if="scope.row.fieldType === 'select' || scope.row.fieldType === 'radio'">
                {{ scope.row.fieldOptions || '-' }}
              </span>
              <span v-else class="text-gray">-</span>
            </template>
          </el-table-column>
          <el-table-column label="必填" prop="isRequired" width="60" align="center">
            <template #default="scope">
              <el-switch
                v-if="scope.row._editing"
                v-model="scope.row.isRequired"
                active-value="1"
                inactive-value="0"
                size="small"
              />
              <span v-else>{{ scope.row.isRequired === '1' ? '是' : '否' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="160" align="center">
            <template #default="scope">
              <template v-if="scope.row._editing">
                <el-button link type="primary" size="small" @click="confirmField(scope.$index)"
                  >确定</el-button
                >
                <el-button link type="info" size="small" @click="cancelField(scope.$index)"
                  >取消</el-button
                >
              </template>
              <template v-else>
                <el-button
                  link
                  type="primary"
                  icon="Top"
                  size="small"
                  :disabled="scope.$index === 0"
                  @click="moveFieldUp(scope.$index)"
                />
                <el-button
                  link
                  type="primary"
                  icon="Bottom"
                  size="small"
                  :disabled="scope.$index === fieldDefs.length - 1"
                  @click="moveFieldDown(scope.$index)"
                />
                <el-button
                  link
                  type="primary"
                  icon="Edit"
                  size="small"
                  @click="editField(scope.$index)"
                  >编辑</el-button
                >
                <el-button
                  link
                  type="danger"
                  icon="Delete"
                  size="small"
                  @click="removeField(scope.$index)"
                  >删除</el-button
                >
              </template>
            </template>
          </el-table-column>
        </el-table>

        <div class="drawer-footer">
          <el-button @click="fieldDrawerOpen = false">取 消</el-button>
          <el-button type="primary" @click="saveFieldDefs">保 存</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script setup name="MemoCategory">
import {
  listCategory,
  getCategory,
  addCategory,
  updateCategory,
  delCategory,
  getCategoryFields,
  saveCategoryFields
} from '@/api/personalCenterMgmt/memoCategory'

const { proxy } = getCurrentInstance()
const { sys_normal_disable } = proxy.useDict('sys_normal_disable')

// 状态
const loading = ref(false)
const showSearch = ref(true)
const categoryList = ref([])
const open = ref(false)
const title = ref('')
const ids = ref([])
const multiple = ref(true)

// 字段定义相关
const fieldDrawerOpen = ref(false)
const currentCategory = ref({})
const fieldDefs = ref([])

// 查询参数
const queryParams = ref({
  categoryName: undefined,
  status: undefined
})

// 表单
const form = ref({})

// 校验规则
const rules = {
  categoryName: [{ required: true, message: '分类名称不能为空', trigger: 'blur' }],
  orderNum: [{ required: true, message: '显示排序不能为空', trigger: 'blur' }]
}

// 字段类型标签
function fieldTypeLabel(type) {
  const map = {
    text: '单行文本',
    textarea: '多行文本',
    number: '数字',
    date: '日期',
    select: '下拉选择',
    radio: '单选'
  }
  return map[type] || type
}

// 查询列表
function getList() {
  loading.value = true
  listCategory(queryParams.value).then((response) => {
    categoryList.value = response.data || []
    // 加载每个分类的字段数
    categoryList.value.forEach((cat) => {
      cat._fieldCount = undefined
      getCategoryFields(cat.categoryId).then((res) => {
        cat._fieldCount = (res.data || []).length
      })
    })
    loading.value = false
  })
}

// 搜索
function handleQuery() {
  getList()
}

// 重置搜索
function resetQuery() {
  proxy.resetForm('queryRef')
  handleQuery()
}

// 多选
function handleSelectionChange(selection) {
  ids.value = selection.map((item) => item.categoryId)
  multiple.value = !selection.length
}

// 重置表单
function reset() {
  form.value = {
    categoryId: undefined,
    categoryName: undefined,
    categoryIcon: undefined,
    orderNum: 0,
    status: '0',
    remark: undefined
  }
  proxy.resetForm('categoryRef')
}

// 新增
function handleAdd() {
  reset()
  open.value = true
  title.value = '新增分类'
}

// 修改
function handleUpdate(row) {
  reset()
  const categoryId = row.categoryId || ids.value[0]
  getCategory(categoryId).then((response) => {
    form.value = response.data
    open.value = true
    title.value = '修改分类'
  })
}

// 提交表单
function submitForm() {
  proxy.$refs['categoryRef'].validate((valid) => {
    if (valid) {
      if (form.value.categoryId) {
        updateCategory(form.value).then(() => {
          proxy.$modal.msgSuccess('修改成功')
          open.value = false
          getList()
        })
      } else {
        addCategory(form.value).then(() => {
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
  const categoryIds = row.categoryId || ids.value
  proxy.$modal
    .confirm('删除分类将同时删除该分类下的所有字段定义和备忘录数据，是否确认删除？')
    .then(() => {
      return delCategory(categoryIds)
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

// =========== 字段定义管理 ===========

// 打开字段定义抽屉
function handleFieldDefs(row) {
  currentCategory.value = row
  fieldDrawerOpen.value = true
  getCategoryFields(row.categoryId).then((response) => {
    fieldDefs.value = (response.data || []).map((item) => ({
      ...item,
      _editing: false,
      _backup: null
    }))
  })
}

// 添加字段
function handleAddField() {
  fieldDefs.value.push({
    fieldId: undefined,
    categoryId: currentCategory.value.categoryId,
    fieldName: '',
    fieldCode: '',
    fieldType: 'text',
    fieldOptions: '',
    defaultValue: '',
    placeholder: '',
    isRequired: '0',
    sortOrder: fieldDefs.value.length,
    _editing: true,
    _backup: null
  })
}

// 编辑字段
function editField(index) {
  const field = fieldDefs.value[index]
  field._backup = { ...field }
  field._editing = true
}

// 取消编辑字段
function cancelField(index) {
  const field = fieldDefs.value[index]
  if (field._backup) {
    // 恢复备份
    Object.assign(field, field._backup)
    field._editing = false
    field._backup = null
  } else {
    // 新添加的，直接移除
    fieldDefs.value.splice(index, 1)
  }
}

// 确认字段编辑
function confirmField(index) {
  const field = fieldDefs.value[index]
  if (!field.fieldName) {
    proxy.$modal.msgWarning('字段名称不能为空')
    return
  }
  field._editing = false
  field._backup = null
}

// 删除字段
function removeField(index) {
  fieldDefs.value.splice(index, 1)
}

// 上移
function moveFieldUp(index) {
  if (index === 0) return
  const arr = fieldDefs.value
  ;[arr[index - 1], arr[index]] = [arr[index], arr[index - 1]]
}

// 下移
function moveFieldDown(index) {
  if (index >= fieldDefs.value.length - 1) return
  const arr = fieldDefs.value
  ;[arr[index], arr[index + 1]] = [arr[index + 1], arr[index]]
}

// 保存字段定义
function saveFieldDefs() {
  // 检查是否有正在编辑的字段
  const editing = fieldDefs.value.find((f) => f._editing)
  if (editing) {
    proxy.$modal.msgWarning('请先完成正在编辑的字段')
    return
  }
  // 清理临时属性
  const data = fieldDefs.value.map((f, index) => ({
    fieldId: f.fieldId,
    categoryId: currentCategory.value.categoryId,
    fieldName: f.fieldName,
    fieldCode: f.fieldCode || f.fieldName,
    fieldType: f.fieldType,
    fieldOptions: f.fieldOptions,
    defaultValue: f.defaultValue,
    placeholder: f.placeholder,
    isRequired: f.isRequired,
    sortOrder: index
  }))
  saveCategoryFields(currentCategory.value.categoryId, data).then(() => {
    proxy.$modal.msgSuccess('保存成功')
    fieldDrawerOpen.value = false
    getList()
  })
}

// 初始化
getList()
</script>

<style scoped lang="scss">
.field-drawer-content {
  padding: 0 20px 20px;
}
.drawer-footer {
  margin-top: 20px;
  text-align: right;
}
.text-gray {
  color: #909399;
}
</style>
