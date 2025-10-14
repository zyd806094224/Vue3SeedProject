// src/api/apiClient.ts
// API 客户端配置文件
// 包含 axios 实例配置和请求/响应拦截器

import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig
} from 'axios'
import { useUserStore } from '@/stores/useUserStore'
import { useAppStore } from '@/stores/useAppStore'

// 创建 axios 实例
const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api', // API 基础路径
  timeout: 10000, // 请求超时时间（毫秒）
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 在发送请求之前做些什么
    console.log('发送请求:', config.method?.toUpperCase(), config.url)

    // 从用户 store 获取 token 并添加到请求头
    const userStore = useUserStore()
    if (userStore.token) {
      config.headers.Authorization = `Bearer ${userStore.token}`
    }

    // 显示加载状态
    const appStore = useAppStore()
    appStore.setLoading(true)

    return config
  },
  (error) => {
    // 对请求错误做些什么
    console.error('请求错误:', error)

    // 隐藏加载状态
    const appStore = useAppStore()
    appStore.setLoading(false)

    return Promise.reject(error)
  }
)

// 响应拦截器
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // 对响应数据做点什么
    console.log('收到响应:', response.status, response.config.url)

    // 隐藏加载状态
    const appStore = useAppStore()
    appStore.setLoading(false)

    return response
  },
  (error) => {
    // 对响应错误做点什么
    console.error('响应错误:', error.response?.status, error.message)

    // 隐藏加载状态
    const appStore = useAppStore()
    appStore.setLoading(false)

    // 根据错误状态码进行处理
    if (error.response?.status === 401) {
      // Token 过期或未授权，执行登出操作
      const userStore = useUserStore()
      userStore.logout()

      // 显示错误通知
      appStore.showNotification('登录已过期，请重新登录', 'error')
    } else if (error.response?.status >= 500) {
      // 服务器错误
      const appStore = useAppStore()
      appStore.showNotification('服务器错误，请稍后重试', 'error')
    }

    return Promise.reject(error)
  }
)

export default apiClient
