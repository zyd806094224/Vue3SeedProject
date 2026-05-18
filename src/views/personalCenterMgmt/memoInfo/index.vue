<!--
 * @Author: zhaoyudong
 * @Date: 2026-05-18 16:10:00
 * @Description: 备忘录管理
 -->
<template>
  <div class="app-container memo-container">
    <!-- 左侧分类侧边栏 -->
    <div class="category-sidebar">
      <div class="sidebar-header">
        <span class="sidebar-title">分类</span>
        <el-button link type="primary" icon="Plus" @click="handleAddCategory" />
      </div>
      <div
        class="category-item"
        :class="{ active: !queryParams.categoryId }"
        @click="selectCategory(null)"
      >
        <span>全部分类</span>
      </div>
      <div
        v-for="cat in categoryList"
        :key="cat.categoryId"
        class="category-item"
        :class="{ active: queryParams.categoryId === cat.categoryId }"
        @click="selectCategory(cat.categoryId)"
      >
        <span class="category-name">{{ cat.categoryName }}</span>
        <span class="category-actions">
          <el-button link icon="Edit" size="small" @click.stop="handleEditCategory(cat)" />
          <el-button
            link
            icon="Delete"
            size="small"
            type="danger"
            @click.stop="handleDeleteCategory(cat)"
          />
        </span>
      </div>
    </div>

    <!-- 右侧内容区 -->
    <div class="memo-main">
      <!-- 搜索栏 -->
      <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch">
        <el-form-item label="名称" prop="memoName">
          <el-input
            v-model="queryParams.memoName"
            placeholder="请输入备忘录名称"
            clearable
            style="width: 200px"
            @keyup.enter="handleQuery"
          />
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
      <el-table v-loading="loading" :data="memoList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="50" align="center" />
        <el-table-column
          label="名称"
          align="center"
          prop="memoName"
          :show-overflow-tooltip="true"
        />
        <el-table-column label="分类" align="center" prop="categoryName" width="120" />
        <el-table-column
          label="描述"
          align="center"
          prop="memoDesc"
          :show-overflow-tooltip="true"
        />
        <el-table-column label="创建时间" align="center" prop="createTime" width="160" />
        <el-table-column label="操作" align="center" width="200">
          <template #default="scope">
            <el-button link type="primary" icon="View" @click="handlePreview(scope.row)"
              >查看</el-button
            >
            <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)"
              >编辑</el-button
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
    </div>

    <!-- 新增/编辑备忘录弹窗 -->
    <el-dialog
      :title="dialogTitle"
      v-model="dialogOpen"
      width="800px"
      append-to-body
      destroy-on-close
    >
      <el-form ref="memoFormRef" :model="memoForm" :rules="memoRules" label-width="100px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="所属分类" prop="categoryId">
              <el-select
                v-model="memoForm.categoryId"
                placeholder="请选择分类"
                @change="onCategoryChange"
              >
                <el-option
                  v-for="cat in categoryList"
                  :key="cat.categoryId"
                  :label="cat.categoryName"
                  :value="cat.categoryId"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="名称" prop="memoName">
              <el-input v-model="memoForm.memoName" placeholder="请输入名称" maxlength="200" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="简要描述" prop="memoDesc">
          <el-input v-model="memoForm.memoDesc" placeholder="请输入简要描述" maxlength="500" />
        </el-form-item>

        <!-- 动态字段区域 -->
        <el-divider v-if="fieldDefs.length > 0">详细信息</el-divider>
        <el-row :gutter="20">
          <el-col :span="12" v-for="field in fieldDefs" :key="field.fieldId">
            <el-form-item
              :label="field.fieldName"
              :prop="'fieldValues.' + field.fieldId"
              :rules="
                field.isRequired === '1'
                  ? [{ required: true, message: field.fieldName + '不能为空', trigger: 'blur' }]
                  : []
              "
            >
              <!-- 单行文本 -->
              <el-input
                v-if="field.fieldType === 'text'"
                v-model="fieldValues[field.fieldId]"
                :placeholder="field.placeholder || '请输入' + field.fieldName"
              />
              <!-- 多行文本 -->
              <el-input
                v-else-if="field.fieldType === 'textarea'"
                v-model="fieldValues[field.fieldId]"
                type="textarea"
                :rows="3"
                :placeholder="field.placeholder || '请输入' + field.fieldName"
              />
              <!-- 数字 -->
              <el-input-number
                v-else-if="field.fieldType === 'number'"
                v-model="fieldValues[field.fieldId]"
                controls-position="right"
                :placeholder="field.placeholder || '请输入' + field.fieldName"
                style="width: 100%"
              />
              <!-- 日期 -->
              <el-date-picker
                v-else-if="field.fieldType === 'date'"
                v-model="fieldValues[field.fieldId]"
                type="date"
                value-format="YYYY-MM-DD"
                :placeholder="field.placeholder || '请选择日期'"
                style="width: 100%"
              />
              <!-- 下拉选择 -->
              <el-select
                v-else-if="field.fieldType === 'select'"
                v-model="fieldValues[field.fieldId]"
                :placeholder="'请选择' + field.fieldName"
                style="width: 100%"
              >
                <el-option
                  v-for="opt in parseOptions(field.fieldOptions)"
                  :key="opt"
                  :label="opt"
                  :value="opt"
                />
              </el-select>
              <!-- 单选 -->
              <el-radio-group
                v-else-if="field.fieldType === 'radio'"
                v-model="fieldValues[field.fieldId]"
              >
                <el-radio v-for="opt in parseOptions(field.fieldOptions)" :key="opt" :value="opt">{{
                  opt
                }}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 无字段提示 -->
        <el-empty
          v-if="memoForm.categoryId && fieldDefs.length === 0 && !fieldDefsLoading"
          description="该分类暂无字段定义，请先在分类管理中配置字段"
          :image-size="60"
        />
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitMemoForm">确 定</el-button>
          <el-button @click="dialogOpen = false">取 消</el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 预览弹窗 -->
    <el-dialog
      title="查看备忘录"
      v-model="previewOpen"
      width="700px"
      append-to-body
      destroy-on-close
    >
      <el-descriptions :column="2" border>
        <el-descriptions-item label="所属分类">{{ previewData.categoryName }}</el-descriptions-item>
        <el-descriptions-item label="名称">{{ previewData.memoName }}</el-descriptions-item>
        <el-descriptions-item label="简要描述" :span="2">{{
          previewData.memoDesc || '-'
        }}</el-descriptions-item>
      </el-descriptions>

      <el-divider v-if="previewFields.length > 0">详细信息</el-divider>
      <el-descriptions v-if="previewFields.length > 0" :column="2" border>
        <el-descriptions-item
          v-for="field in previewFields"
          :key="field.fieldId"
          :label="field.fieldName"
        >
          <template v-if="field.fieldType === 'textarea'">
            <div style="white-space: pre-wrap">{{ field.value || '-' }}</div>
          </template>
          <template v-else>
            {{ field.value || '-' }}
          </template>
        </el-descriptions-item>
      </el-descriptions>
    </el-dialog>

    <!-- 侧边栏快捷新增分类弹窗 -->
    <el-dialog title="新增分类" v-model="categoryDialogOpen" width="400px" append-to-body>
      <el-form
        ref="quickCategoryRef"
        :model="quickCategoryForm"
        :rules="quickCategoryRules"
        label-width="80px"
      >
        <el-form-item label="分类名称" prop="categoryName">
          <el-input
            v-model="quickCategoryForm.categoryName"
            placeholder="请输入分类名称"
            maxlength="100"
          />
        </el-form-item>
        <el-form-item label="显示排序" prop="orderNum">
          <el-input-number
            v-model="quickCategoryForm.orderNum"
            controls-position="right"
            :min="0"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitQuickCategory">确 定</el-button>
          <el-button @click="categoryDialogOpen = false">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="MemoInfo">
import {
  listCategory,
  addCategory,
  updateCategory,
  delCategory,
  getCategoryFields
} from '@/api/personalCenterMgmt/memoCategory'
import {
  listMemoInfo,
  getMemoInfo,
  addMemoInfo,
  updateMemoInfo,
  delMemoInfo
} from '@/api/personalCenterMgmt/memoInfo'

const { proxy } = getCurrentInstance()

// =========== 分类侧边栏 ===========
const categoryList = ref([])
const categoryDialogOpen = ref(false)
const quickCategoryForm = ref({})
const quickCategoryRules = {
  categoryName: [{ required: true, message: '分类名称不能为空', trigger: 'blur' }]
}

function loadCategories() {
  listCategory().then((response) => {
    categoryList.value = response.data || []
  })
}

function selectCategory(categoryId) {
  queryParams.value.categoryId = categoryId
  queryParams.value.pageNum = 1
  getList()
}

// 快捷新增分类
function handleAddCategory() {
  quickCategoryForm.value = {
    categoryName: '',
    orderNum: categoryList.value.length,
    status: '0'
  }
  categoryDialogOpen.value = true
}

function submitQuickCategory() {
  proxy.$refs['quickCategoryRef'].validate((valid) => {
    if (valid) {
      addCategory(quickCategoryForm.value).then(() => {
        proxy.$modal.msgSuccess('新增成功')
        categoryDialogOpen.value = false
        loadCategories()
      })
    }
  })
}

// 快捷编辑分类
function handleEditCategory(cat) {
  proxy
    .$prompt('请输入分类名称', '修改分类', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      inputValue: cat.categoryName
    })
    .then(({ value }) => {
      if (!value) {
        proxy.$modal.msgWarning('分类名称不能为空')
        return
      }
      updateCategory({ categoryId: cat.categoryId, categoryName: value }).then(() => {
        proxy.$modal.msgSuccess('修改成功')
        loadCategories()
      })
    })
    .catch(() => {})
}

// 快捷删除分类
function handleDeleteCategory(cat) {
  proxy.$modal
    .confirm('删除分类将同时删除该分类下的所有备忘录数据，是否确认删除？')
    .then(() => delCategory(cat.categoryId))
    .then(() => {
      proxy.$modal.msgSuccess('删除成功')
      // 如果删除的是当前选中的分类，切换到全部分类
      if (queryParams.value.categoryId === cat.categoryId) {
        queryParams.value.categoryId = undefined
      }
      loadCategories()
      getList()
    })
    .catch(() => {})
}

// =========== 备忘录列表 ===========
const loading = ref(false)
const showSearch = ref(true)
const memoList = ref([])
const total = ref(0)
const ids = ref([])
const multiple = ref(true)

const queryParams = ref({
  pageNum: 1,
  pageSize: 10,
  memoName: undefined,
  categoryId: undefined
})

function getList() {
  loading.value = true
  listMemoInfo(queryParams.value).then((response) => {
    memoList.value = response.rows
    total.value = response.total
    loading.value = false
  })
}

function handleQuery() {
  queryParams.value.pageNum = 1
  getList()
}

function resetQuery() {
  proxy.resetForm('queryRef')
  handleQuery()
}

function handleSelectionChange(selection) {
  ids.value = selection.map((item) => item.memoId)
  multiple.value = !selection.length
}

function handleDelete(row) {
  const memoIds = row.memoId || ids.value
  proxy.$modal
    .confirm('是否确认删除选中的备忘录？')
    .then(() => delMemoInfo(memoIds))
    .then(() => {
      getList()
      proxy.$modal.msgSuccess('删除成功')
    })
    .catch(() => {})
}

// =========== 动态表单 ===========
const dialogOpen = ref(false)
const dialogTitle = ref('')
const fieldDefs = ref([])
const fieldValues = ref({})
const fieldDefsLoading = ref(false)

const memoForm = ref({})
const memoRules = {
  categoryId: [{ required: true, message: '请选择分类', trigger: 'change' }],
  memoName: [{ required: true, message: '名称不能为空', trigger: 'blur' }]
}

// =========== 预览 ===========
const previewOpen = ref(false)
const previewData = ref({})
const previewFields = ref([])

function handlePreview(row) {
  getMemoInfo(row.memoId).then((response) => {
    const data = response.data
    previewData.value = {
      categoryName: data.memoInfo.categoryName,
      memoName: data.memoInfo.memoName,
      memoDesc: data.memoInfo.memoDesc
    }

    // 合并字段定义和字段值
    const defs = response.fieldDefs || []
    const vals = {}
    if (data.fieldValues) {
      data.fieldValues.forEach((fv) => {
        vals[fv.fieldId] = fv.fieldValue
      })
    }
    previewFields.value = defs.map((f) => ({
      ...f,
      value: vals[f.fieldId] || ''
    }))

    previewOpen.value = true
  })
}

// 解析字段选项
function parseOptions(jsonStr) {
  if (!jsonStr) return []
  try {
    return JSON.parse(jsonStr)
  } catch {
    return []
  }
}

// 分类变更时加载字段定义
function onCategoryChange(categoryId) {
  fieldDefs.value = []
  fieldValues.value = {}
  if (!categoryId) return

  fieldDefsLoading.value = true
  getCategoryFields(categoryId)
    .then((response) => {
      fieldDefs.value = response.data || []
      // 初始化字段值（使用默认值）
      fieldDefs.value.forEach((f) => {
        if (f.defaultValue) {
          fieldValues.value[f.fieldId] = f.defaultValue
        }
      })
    })
    .finally(() => {
      fieldDefsLoading.value = false
    })
}

// 新增
function handleAdd() {
  memoForm.value = {
    memoId: undefined,
    categoryId: queryParams.value.categoryId || undefined,
    memoName: '',
    memoDesc: ''
  }
  fieldDefs.value = []
  fieldValues.value = {}

  // 如果已选中分类，自动加载字段定义
  if (memoForm.value.categoryId) {
    onCategoryChange(memoForm.value.categoryId)
  }

  dialogTitle.value = '新增备忘录'
  dialogOpen.value = true
}

// 编辑
function handleUpdate(row) {
  const memoId = row.memoId
  getMemoInfo(memoId).then((response) => {
    const data = response.data
    memoForm.value = {
      memoId: data.memoInfo.memoId,
      categoryId: data.memoInfo.categoryId,
      memoName: data.memoInfo.memoName,
      memoDesc: data.memoInfo.memoDesc
    }

    // 加载字段定义
    fieldDefs.value = response.fieldDefs || []
    // 填充字段值
    fieldValues.value = {}
    if (data.fieldValues) {
      data.fieldValues.forEach((fv) => {
        fieldValues.value[fv.fieldId] = fv.fieldValue
      })
    }

    dialogTitle.value = '编辑备忘录'
    dialogOpen.value = true
  })
}

// 提交
function submitMemoForm() {
  proxy.$refs['memoFormRef'].validate((valid) => {
    if (valid) {
      // 构建字段值列表
      const fvs = Object.entries(fieldValues.value)
        .filter(([, value]) => value !== undefined && value !== null && value !== '')
        .map(([fieldId, value]) => ({
          fieldId: Number(fieldId),
          fieldValue: String(value)
        }))

      const data = {
        memoInfo: {
          memoId: memoForm.value.memoId || undefined,
          categoryId: memoForm.value.categoryId,
          memoName: memoForm.value.memoName,
          memoDesc: memoForm.value.memoDesc
        },
        fieldValues: fvs
      }

      if (data.memoInfo.memoId) {
        updateMemoInfo(data).then(() => {
          proxy.$modal.msgSuccess('修改成功')
          dialogOpen.value = false
          getList()
        })
      } else {
        addMemoInfo(data).then(() => {
          proxy.$modal.msgSuccess('新增成功')
          dialogOpen.value = false
          getList()
        })
      }
    }
  })
}

// =========== 初始化 ===========
loadCategories()
getList()
</script>

<style scoped lang="scss">
.memo-container {
  display: flex;
  gap: 16px;
}

.category-sidebar {
  width: 220px;
  flex-shrink: 0;
  border-right: 1px solid #e4e7ed;
  padding-right: 16px;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid #e4e7ed;

  .sidebar-title {
    font-size: 16px;
    font-weight: 600;
  }
}

.category-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f5f7fa;

    .category-actions {
      opacity: 1;
    }
  }

  &.active {
    background-color: #ecf5ff;
    color: #409eff;
  }

  .category-name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .category-actions {
    opacity: 0;
    transition: opacity 0.2s;
    white-space: nowrap;
  }
}

.memo-main {
  flex: 1;
  min-width: 0;
}
</style>
