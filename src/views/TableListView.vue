<template>
  <div>
    <el-table :data="tableData" :header-cell-style="{background: '#f2f5fc',color: '#555'}" border>
      <el-table-column prop="phonenumber" label="电话号" width="180">
      </el-table-column>
      <el-table-column prop="content" label="短信内容" width="580">
      </el-table-column>
      <el-table-column prop="sendtime" label="发送时间" width="180">
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageNum"
      :page-sizes="[10, 20,50,100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

interface Item {
  phonenumber: string
  content: string
  sendtime: string
}

const tableData = ref<Item[]>([])

const pageNum = ref(1)
const pageSize = ref(10)
const total = ref(0)

onMounted(() => {
  getTableData()
})

async function getTableData() {
  // 模拟API延迟
  await new Promise(resolve => setTimeout(resolve, 500))

  // 生成500条测试数据
  const testData: Item[] = []
  for (let i = 1; i <= 500; i++) {
    testData.push({
      phonenumber: `138${Math.floor(Math.random() * 100000000).toString().padStart(8, '0')}`,
      content: `这是一条测试短信内容${i}，用于演示分页功能和数据展示效果。`,
      sendtime: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)).toLocaleString()
    })
  }

  // 分页处理
  const start = (pageNum.value - 1) * pageSize.value
  const end = start + pageSize.value
  tableData.value = testData.slice(start, end)
  total.value = testData.length
}
const handleSizeChange = (val: number) => {

}

const handleCurrentChange = (val: number) => {

}
</script>

<style scoped>

</style>
