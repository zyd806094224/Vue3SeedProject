import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// 应用程序状态类型定义
export interface AppState {
  // 应用程序主题
  theme: 'light' | 'dark'
  // 加载状态
  loading: boolean
  // 通知消息
  notification: {
    show: boolean
    message: string
    type: 'success' | 'error' | 'warning' | 'info'
  }
  // 语言设置
  locale: string
}

// 定义应用程序主 store
export const useAppStore = defineStore('app', () => {
  // 状态 - 使用 ref 来定义响应式数据
  const state = ref<AppState>({
    theme: 'light',
    loading: false,
    notification: {
      show: false,
      message: '',
      type: 'info'
    },
    locale: 'zh-CN'
  })

  // 计算属性 - 根据状态计算出新值
  const isDarkTheme = computed(() => state.value.theme === 'dark')

  // 操作方法 - 修改状态的函数
  const setTheme = (theme: 'light' | 'dark') => {
    state.value.theme = theme
  }

  const setLoading = (loading: boolean) => {
    state.value.loading = loading
  }

  const showNotification = (
    message: string,
    type: 'success' | 'error' | 'warning' | 'info' = 'info'
  ) => {
    state.value.notification = {
      show: true,
      message,
      type
    }
  }

  const hideNotification = () => {
    state.value.notification.show = false
  }

  const setLocale = (locale: string) => {
    state.value.locale = locale
  }

  // 返回 store 的状态和方法
  const theme = computed(() => state.value.theme)

  return {
    // 状态
    state,
    theme, // This is now a reactive computed property
    loading: computed(() => state.value.loading),
    notification: computed(() => state.value.notification),
    locale: computed(() => state.value.locale),
    // 计算属性
    isDarkTheme,
    // 方法
    setTheme,
    setLoading,
    showNotification,
    hideNotification,
    setLocale
  }
})
