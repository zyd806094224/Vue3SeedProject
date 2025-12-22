<template>
  <!-- 主布局组件 -->
  <div class="main-layout">
    <!-- 顶部导航栏 -->
    <header class="main-header">
      <div class="container">
        <div class="header-content">
          <h1 class="logo">Vue3 种子项目</h1>

          <!-- 导航菜单 -->
          <nav class="nav-menu">
            <RouterLink to="/" class="nav-link">首页</RouterLink>
            <RouterLink to="/about" class="nav-link">关于</RouterLink>
            <RouterLink to="/user" class="nav-link">用户</RouterLink>
            <RouterLink to="/profile" class="nav-link">个人资料</RouterLink>
            <RouterLink to="/virtualList" class="nav-link">列表</RouterLink>
            <RouterLink to="/tableListView" class="nav-link">表格</RouterLink>
            <RouterLink to="/elTreeView" class="nav-link">ElTree</RouterLink>
            <RouterLink to="/mobilePhone" class="nav-link">移动端</RouterLink>
          </nav>
          <!-- 用户操作区域 -->
          <div class="user-actions">
            <button
              @click="toggleTheme"
              class="theme-toggle"
              :title="`切换到${isDarkTheme ? '亮色' : '暗色'}主题`"
            >
              {{ isDarkTheme ? '🌞' : '🌙' }}
            </button>
            <button v-if="isLoggedIn" @click="handleLogout" class="logout-btn">登出</button>
            <RouterLink v-else to="/user" class="login-link"> 登录</RouterLink>
            <button @click="handleFileUpload" class="file-upload-btn">文件上传</button>
          </div>
        </div>
      </div>
    </header>

    <!-- 主要内容区域 -->
    <main class="main-content">
      <div class="container">
        <slot />
      </div>
    </main>

    <!-- 页脚 -->
    <footer class="main-footer">
      <div class="container">
        <p>&copy; 2025 Vue3 种子项目. 保留所有权利.</p>
      </div>
    </footer>

    <!-- 通知组件 -->
    <div
      v-if="notification.show"
      class="notification"
      :class="`notification--${notification.type}`"
    >
      {{ notification.message }}
      <button @click="hideNotification" class="notification-close">×</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores/useAppStore'
import { useUserStore } from '@/stores/useUserStore'
import { fileApi } from '@/api'

// 使用 stores
const appStore = useAppStore()
const userStore = useUserStore()
const router = useRouter()

// 计算属性
const isDarkTheme = computed(() => appStore.isDarkTheme)
const isLoggedIn = computed(() => userStore.isLoggedIn)
const notification = computed(() => appStore.notification)

// 方法
const toggleTheme = () => {
  const newTheme = appStore.theme === 'light' ? 'dark' : 'light'
  appStore.setTheme(newTheme)
  document.documentElement.setAttribute('data-theme', newTheme)
}

const handleLogout = () => {
  userStore.logout()
  router.push('/user')
  appStore.showNotification('已成功登出', 'success')
}

/**
 * 文件上传处理函数
 */
const handleFileUpload = () => {
  // 创建文件输入元素
  const fileInput = document.createElement('input')
  fileInput.type = 'file'
  fileInput.accept = '*' // 接受所有文件类型
  fileInput.multiple = false // 单文件上传

  fileInput.onchange = async (event: Event) => {
    const target = event.target as HTMLInputElement
    const file = target.files?.[0]

    if (!file) {
      appStore.showNotification('请选择要上传的文件', 'warning')
      return
    }

    try {
      // 使用封装好的文件上传API
      const response = await fileApi.uploadFile(file)

      // 上传成功
      appStore.showNotification(`文件 "${file.name}" 上传成功`, 'success')
      console.log('文件上传响应:', response)
    } catch (error) {
      // 上传失败
      console.error('文件上传失败:', error)
      appStore.showNotification('文件上传失败，请重试', 'error')
    }
  }

  // 触发文件选择对话框
  fileInput.click()
}

const hideNotification = () => {
  appStore.hideNotification()
}

// 设置主题类到 HTML 元素
document.documentElement.setAttribute('data-theme', appStore.theme)
</script>

<style scoped>
.main-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-header {
  background-color: var(--header-bg, #f8f9fa);
  border-bottom: 1px solid var(--border-color, #dee2e6);
  padding: 1rem 0;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
  color: var(--primary-color, #007bff);
}

.nav-menu {
  display: flex;
  gap: 1.5rem;
}

.nav-link {
  text-decoration: none;
  color: var(--text-color, #333);
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.nav-link.router-link-active,
.nav-link:hover {
  background-color: var(--hover-bg, #e9ecef);
  color: var(--primary-color, #007bff);
}

.user-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.theme-toggle {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.theme-toggle:hover {
  background-color: var(--hover-bg, #e9ecef);
}

.file-upload-btn,
.logout-btn,
.login-link {
  background-color: var(--primary-color, #007bff);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  font-size: 0.9rem;
}

.logout-btn:hover,
.login-link:hover {
  background-color: var(--primary-hover, #0056b3);
}

.main-content {
  flex: 1;
  padding: 2rem 0;
}

.main-footer {
  background-color: var(--footer-bg, #f8f9fa);
  padding: 1.5rem 0;
  text-align: center;
  border-top: 1px solid var(--border-color, #dee2e6);
  margin-top: auto;
}

.notification {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 1rem 1.5rem;
  border-radius: 4px;
  color: white;
  z-index: 1000;
  display: flex;
  align-items: center;
  gap: 1rem;
  animation: slideIn 0.3s ease-out;
}

.notification--success {
  background-color: #28a745;
}

.notification--error {
  background-color: #dc3545;
}

.notification--warning {
  background-color: #ffc107;
  color: #212529;
}

.notification--info {
  background-color: #17a2b8;
}

.notification-close {
  background: none;
  border: none;
  color: inherit;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: 1rem;
  }

  .nav-menu {
    gap: 0.5rem;
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>
