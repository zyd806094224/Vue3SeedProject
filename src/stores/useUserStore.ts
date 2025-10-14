import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// 用户信息类型定义
export interface UserInfo {
  id: number
  name: string
  email: string
  avatar?: string
  role: string
  createdAt: string
}

// 用户状态类型定义
export interface UserState {
  userInfo: UserInfo | null
  isAuthenticated: boolean
  token: string | null
  permissions: string[]
}

// 定义用户 store
export const useUserStore = defineStore('user', () => {
  // 状态 - 使用 ref 来定义响应式数据
  const state = ref<UserState>({
    userInfo: null,
    isAuthenticated: false,
    token: null,
    permissions: []
  })

  // 计算属性 - 根据状态计算出新值
  const isLoggedIn = computed(() => state.value.isAuthenticated)
  const userRole = computed(() => state.value.userInfo?.role || '')
  const hasPermission = (permission: string) =>
    computed(() => state.value.permissions.includes(permission))

  // 操作方法 - 修改状态的函数
  const setUserInfo = (userInfo: UserInfo) => {
    state.value.userInfo = userInfo
  }

  const setAuthentication = (isAuthenticated: boolean) => {
    state.value.isAuthenticated = isAuthenticated
  }

  const setToken = (token: string | null) => {
    state.value.token = token
  }

  const setPermissions = (permissions: string[]) => {
    state.value.permissions = permissions
  }

  const login = (token: string, userInfo: UserInfo) => {
    state.value.token = token
    state.value.userInfo = userInfo
    state.value.isAuthenticated = true
  }

  const logout = () => {
    state.value.token = null
    state.value.userInfo = null
    state.value.isAuthenticated = false
    state.value.permissions = []
  }

  const clearUser = () => {
    state.value.userInfo = null
    state.value.isAuthenticated = false
    state.value.token = null
    state.value.permissions = []
  }

  // 返回 store 的状态和方法
  return {
    // 状态
    ...state.value,
    // 计算属性
    isLoggedIn,
    userRole,
    hasPermission,
    // 方法
    setUserInfo,
    setAuthentication,
    setToken,
    setPermissions,
    login,
    logout,
    clearUser
  }
})
