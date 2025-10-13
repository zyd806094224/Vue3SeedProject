<template>
  <div class="profile-view">
    <h1>个人资料</h1>
    
    <div v-if="isLoggedIn" class="profile-content">
      <div class="profile-header">
        <div class="avatar">
          <img 
            :src="userInfo?.avatar || defaultAvatar" 
            :alt="userInfo?.name" 
            class="avatar-img"
          />
        </div>
        <div class="profile-basic-info">
          <h2>{{ userInfo?.name }}</h2>
          <p class="email">{{ userInfo?.email }}</p>
          <p class="role">角色: {{ userInfo?.role }}</p>
        </div>
      </div>
      
      <div class="profile-details">
        <h3>详细信息</h3>
        <div class="info-grid">
          <div class="info-item">
            <label>用户ID:</label>
            <span>{{ userInfo?.id }}</span>
          </div>
          <div class="info-item">
            <label>注册时间:</label>
            <span>{{ formattedCreatedAt }}</span>
          </div>
          <div class="info-item">
            <label>账户状态:</label>
            <span class="status active">活跃</span>
          </div>
        </div>
      </div>
      
      <div class="profile-actions">
        <BaseButton @click="editProfile" variant="primary">编辑资料</BaseButton>
        <BaseButton @click="changePassword" variant="secondary">修改密码</BaseButton>
        <BaseButton @click="deleteAccount" variant="danger">删除账户</BaseButton>
      </div>
    </div>
    
    <div v-else class="not-logged-in">
      <h2>请先登录</h2>
      <p>您需要登录后才能查看个人资料</p>
      <BaseButton @click="goToLogin" variant="primary">前往登录</BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import BaseButton from '@/components/BaseButton.vue'
import { useUserStore } from '@/stores/useUserStore'
import { useAppStore } from '@/stores/useAppStore'

// 使用路由和 stores
const router = useRouter()
const userStore = useUserStore()
const appStore = useAppStore()

// 默认头像
const defaultAvatar = 'https://via.placeholder.com/150x150/0d6efd/ffffff?text=U'

// 计算属性
const isLoggedIn = computed(() => userStore.isLoggedIn)
const userInfo = computed(() => userStore.userInfo)
const formattedCreatedAt = computed(() => {
  if (!userInfo.value?.createdAt) return 'N/A'
  return new Date(userInfo.value.createdAt).toLocaleString('zh-CN')
})

// 方法
const editProfile = () => {
  // 在实际项目中，这里会打开编辑模态框或跳转到编辑页面
  appStore.showNotification('编辑功能开发中', 'info')
}

const changePassword = () => {
  // 在实际项目中，这里会打开密码修改模态框
  appStore.showNotification('修改密码功能开发中', 'info')
}

const deleteAccount = () => {
  // 在实际项目中，这里会弹出确认对话框
  appStore.showNotification('删除账户功能开发中', 'info')
}

const goToLogin = () => {
  router.push('/user')
}
</script>

<style scoped>
.profile-view {
  padding: 2rem 0;
  max-width: 800px;
  margin: 0 auto;
}

.profile-content {
  background-color: var(--bg-secondary, #f8f9fa);
  padding: 2rem;
  border-radius: 8px;
}

.profile-header {
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--border-color, #dee2e6);
}

.avatar {
  margin-right: 1.5rem;
}

.avatar-img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid var(--primary-color, #0d6efd);
}

.profile-basic-info h2 {
  margin: 0 0 0.5rem 0;
  color: var(--text-primary, #333);
}

.email {
  color: var(--text-secondary, #6c757d);
  margin: 0.25rem 0;
}

.role {
  color: var(--primary-color, #0d6efd);
  font-weight: 500;
  margin: 0.25rem 0;
}

.profile-details h3 {
  margin: 0 0 1.5rem 0;
  color: var(--text-primary, #333);
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.info-item {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
}

.info-item label {
  font-weight: 500;
  color: var(--text-secondary, #6c757d);
}

.status {
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.875rem;
}

.status.active {
  background-color: #d4edda;
  color: #155724;
}

.profile-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  flex-wrap: wrap;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border-color, #dee2e6);
}

.not-logged-in {
  text-align: center;
  padding: 3rem 1rem;
  background-color: var(--bg-secondary, #f8f9fa);
  border-radius: 8px;
}

.not-logged-in h2 {
  color: var(--text-primary, #333);
  margin-bottom: 1rem;
}

/* 暗色主题样式 */
:root[data-theme="dark"] {
  --bg-secondary: #495057;
  --text-primary: #f8f9fa;
  --text-secondary: #adb5bd;
  --border-color: #6c757d;
  --primary-color: #0d6efc;
}
</style>