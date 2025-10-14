<template>
  <!-- 根布局组件 -->
  <div id="app">
    <MainLayout>
      <RouterView />
    </MainLayout>
  </div>
</template>

<script setup lang="ts">
// 应用程序主组件
// 所有页面都将作为此组件的子组件呈现
import MainLayout from './layouts/MainLayout.vue'
import { onMounted } from 'vue'
import { useAppStore } from '@/stores'

// 初始化主题
onMounted(() => {
  const appStore = useAppStore()
  // 确保当前主题应用到文档根元素
  document.documentElement.setAttribute('data-theme', appStore.theme)
})
</script>

<style>
/* 全局样式将在 main.css 中定义 */
</style>
