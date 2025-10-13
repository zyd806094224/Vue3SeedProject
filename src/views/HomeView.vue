<template>
  <div class="home-view">
    <h1>欢迎来到 Vue3 种子项目</h1>
    <p>这是一个开箱即用的 Vue3 + TypeScript + Vite 脚手架项目</p>

    <div class="features">
      <h2>项目特性</h2>
      <ul>
        <li>✅ Vue 3 with Composition API</li>
        <li>✅ TypeScript 支持</li>
        <li>✅ Vue Router 4 路由管理</li>
        <li>✅ Pinia 状态管理</li>
        <li>✅ Axios API 请求封装</li>
        <li>✅ 响应式设计</li>
        <li>✅ 预配置的 ESLint 和 Prettier</li>
        <li>✅ 模块化架构</li>
      </ul>
    </div>

    <div class="cta-section">
      <h2>开始使用</h2>
      <p>开发者可以在此基础上快速构建应用程序</p>

      <div class="buttons">
        <BaseButton @click="goToUser" variant="primary">用户管理</BaseButton>
        <BaseButton @click="goToProfile" variant="secondary" :disabled="!isLoggedIn">个人资料</BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import BaseButton from '@/components/BaseButton.vue'
import { useUserStore } from '@/stores/useUserStore'

// 使用路由和 store
const router = useRouter()
const userStore = useUserStore()

// 计算属性
const isLoggedIn = computed(() => userStore.isLoggedIn)

// 方法
const goToUser = () => {
  router.push('/user')
}

const goToProfile = () => {
  if (isLoggedIn.value) {
    router.push('/profile')
  }
}
</script>

<style scoped>
.home-view {
  padding: 2rem 0;
  text-align: center;
}

.features {
  margin: 2rem 0;
  padding: 1.5rem;
  background-color: var(--bg-secondary, #f8f9fa);
  border-radius: 8px;
  color: #1d3c4d;
}

.features h2 {
  margin-bottom: 1rem;
  color: var(--text-primary, #333);
}

.features ul {
  list-style: none;
  padding: 0;
  text-align: left;
  max-width: 500px;
  margin: 0 auto;
}

.features li {
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--border-color, #dee2e6);
}

.features li:last-child {
  border-bottom: none;
}

.cta-section {
  margin-top: 2rem;
}

.cta-section h2 {
  margin-bottom: 1rem;
  color: var(--text-primary, #333);
}

.buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 1rem;
}

/* 暗色主题样式 */
:root[data-theme="dark"] {
  --bg-secondary: #495057;
  --text-primary: #f8f9fa;
  --border-color: #6c757d;
}
</style>
