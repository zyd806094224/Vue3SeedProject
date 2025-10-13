<template>
  <div class="user-view">
    <h1>用户管理</h1>

    <!-- 登录表单 -->
    <div v-if="!isLoggedIn" class="login-form">
      <h2>用户登录</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">用户名:</label>
          <input
            id="username"
            v-model="loginForm.username"
            type="text"
            placeholder="请输入用户名"
            required
            class="form-input"
          />
        </div>

        <div class="form-group">
          <label for="password">密码:</label>
          <input
            id="password"
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码"
            required
            class="form-input"
          />
        </div>

        <BaseButton
          type="submit"
          :loading="loading"
          variant="primary"
          size="large"
          class="submit-btn"
        >
          {{ loading ? '登录中...' : '登录' }}
        </BaseButton>
      </form>

      <div class="demo-info">
        <p><strong>演示信息:</strong></p>
        <p>用户名: demo</p>
        <p>密码: 123456</p>
      </div>
    </div>

    <!-- 用户信息显示 -->
    <div v-else class="user-info">
      <h2>用户信息</h2>
      <div class="info-card">
        <p><strong>姓名:</strong> {{ userInfo?.name || 'N/A' }}</p>
        <p><strong>邮箱:</strong> {{ userInfo?.email || 'N/A' }}</p>
        <p><strong>角色:</strong> {{ userInfo?.role || 'N/A' }}</p>
        <p><strong>创建时间:</strong> {{ userInfo?.createdAt || 'N/A' }}</p>
      </div>

      <div class="actions">
        <BaseButton @click="handleLogout" variant="danger">登出</BaseButton>
        <BaseButton @click="goToProfile" variant="secondary">查看个人资料</BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import BaseButton from '@/components/BaseButton.vue'
import { useUserStore } from '@/stores/useUserStore'
import { useAppStore } from '@/stores/useAppStore'
import { userApi } from '@/api'

// 定义登录表单类型
interface LoginForm {
  username: string
  password: string
}

// 使用路由和 stores
const router = useRouter()
const userStore = useUserStore()
const appStore = useAppStore()

// 响应式数据
const loginForm = ref<LoginForm>({
  username: '',
  password: ''
})

const loading = ref(false)

// 计算属性
const isLoggedIn = computed(() => userStore.isLoggedIn)
const userInfo = computed(() => userStore.userInfo)

// 方法
const handleLogin = async () => {
  if (!loginForm.value.username || !loginForm.value.password) {
    appStore.showNotification('请填写用户名和密码', 'error')
    return
  }

  loading.value = true

  try {
    // 模拟登录API调用
    // 在实际项目中，这里应该调用真实API
    const response = await userApi.login({
      username: loginForm.value.username,
      password: loginForm.value.password
    })

    // 更新用户状态
    userStore.login(response.token, response.userInfo)
    appStore.showNotification('登录成功', 'success')

    // 跳转到个人资料页
    router.push('/profile')
  } catch (error: any) {
    console.error('登录失败:', error)
    appStore.showNotification(error.message || '登录失败，请重试', 'error')
  } finally {
    loading.value = false
  }
}

const handleLogout = () => {
  userStore.logout()
  appStore.showNotification('已成功登出', 'success')
}

const goToProfile = () => {
  router.push('/profile')
}
</script>

<style scoped>
.user-view {
  padding: 2rem 0;
  max-width: 600px;
  margin: 0 auto;
}

.login-form, .user-info {
  background-color: var(--bg-secondary, #f8f9fa);
  padding: 2rem;
  border-radius: 8px;
  color: #28a745;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--text-primary, #333);
}

.form-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--border-color, #ced4da);
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.form-input:focus {
  outline: none;
  border-color: var(--primary-color, #0d6efd);
  box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.25);
}

.submit-btn {
  width: 100%;
  margin-top: 1rem;
}

.demo-info {
  margin-top: 1.5rem;
  padding: 1rem;
  background-color: var(--info-bg, #d1ecf1);
  border: 1px solid var(--info-border, #bee5eb);
  border-radius: 4px;
}

.user-info .info-card {
  background-color: white;
  padding: 1.5rem;
  border-radius: 6px;
  margin: 1.5rem 0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.user-info .info-card p {
  margin: 0.5rem 0;
  padding: 0.25rem 0;
}

.actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  flex-wrap: wrap;
}

/* 暗色主题样式 */
:root[data-theme="dark"] {
  --bg-secondary: #495057;
  --text-primary: #f8f9fa;
  --border-color: #6c757d;
  --primary-color: #0d6efc;
  --info-bg: #1d3c4d;
  --info-border: #22556f;
}
</style>
