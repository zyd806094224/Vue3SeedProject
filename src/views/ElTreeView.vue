<template>
  <div class="root">
    <div class="left">
      <el-tree
        ref="tree"
        :data="data"
        :default-checked-keys="defaultCheckedKeys"
        :default-expanded-keys="defaultExpandedKeys"
        node-key="id"
        :props="defaultProps"
        @node-click="handleNodeClick"
      />
    </div>
    <div class="right">
      {{ content }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

interface Tree {
  id: string
  label: string
  children?: Tree[]
}

//接受组件传参props
const props = defineProps(['a', 'b'])

//defaultProps 是用于配置 el-tree 组件的属性映射对象
//children: 'children' 指定树节点的子节点属性名为 children
//label: 'label' 指定树节点的标签属性名为 label
const defaultProps = {
  children: 'children',
  label: 'label'
}

let content = ref('')
//默认选中
let defaultCheckedKeys = ['1', '3']
//默认展开
let defaultExpandedKeys = ref(['1', '3'])

onMounted(() => {
  defaultExpandedKeys.value = ['1-1', '3-1']
})

const handleNodeClick = (data: Tree) => {
  console.log(data)
  content.value = data.label
}

const data: Tree[] = [
  {
    id: '1',
    label: 'Level one 1',
    children: [
      {
        id: '1-1',
        label: 'Level two 1-1',
        children: [
          {
            id: '1-1-1',
            label: 'Level three 1-1-1'
          }
        ]
      }
    ]
  },
  {
    id: '2',
    label: 'Level one 2',
    children: [
      {
        id: '2-1',
        label: 'Level two 2-1',
        children: [
          {
            id: '2-1-1',
            label: 'Level three 2-1-1'
          }
        ]
      },
      {
        id: '2-2',
        label: 'Level two 2-2',
        children: [
          {
            id: '2-2-1',
            label: 'Level three 2-2-1'
          }
        ]
      }
    ]
  },
  {
    id: '3',
    label: 'Level one 3',
    children: [
      {
        id: '3-1',
        label: 'Level two 3-1',
        children: [
          {
            id: '3-1-1',
            label: 'Level three 3-1-1'
          }
        ]
      },
      {
        id: '3-2',
        label: 'Level two 3-2',
        children: [
          {
            id: '3-2-1',
            label: 'Level three 3-2-1'
          }
        ]
      }
    ]
  },
  {
    id: '4',
    label: 'Level one 4'
  }
]
</script>

<style scoped>
.root {
  display: flex;
  flex-direction: row;
  height: 100vh;
}

.left {
  background: #ffffff;
  width: 200px;
  margin-right: 10px; /* 与右侧区域的间距 */
  display: flex;
  flex-direction: column;
}

.right {
  flex: 1;
  background: #42d392;
}

/* 修改节点文本字体大小 */
.left :deep(.el-tree-node__label) {
  font-size: 16px;
  padding-left: 16px;
}

.left :deep(.el-tree-node__content) {
  height: 44px;
  line-height: 44px;
  background: #42d392;
}

/* 修改选中节点背景色 */
.left :deep(.el-tree-node.is-current > .el-tree-node__content) {
  background-color: #0dcaf0;
  color: #409eff;
}

/* 修改节点 hover 效果 */
.left :deep(.el-tree-node__content:hover) {
  background-color: #28a745;
}

/* 修改展开图标颜色 */
.left :deep(.el-tree-node__expand-icon) {
  color: #409eff;
}

.left :deep(.el-tree-node__expand-icon) {
  position: absolute;
  right: 10px; /* 距离右边的距离 */
  left: auto;
  color: #409eff;
}
</style>
