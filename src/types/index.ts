/**
 * 项目公共类型定义
 * 包含项目中常用的 TypeScript 类型定义
 */

/**
 * API 响应基础类型
 */
export interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
}

/**
 * 分页数据类型
 */
export interface Pagination {
  page: number
  pageSize: number
  total: number
}

/**
 * 分页列表响应类型
 */
export interface PaginatedResponse<T> extends ApiResponse {
  data: {
    list: T[]
    pagination: Pagination
  }
}

/**
 * 用户信息类型
 */
export interface User {
  id: number
  name: string
  email: string
  avatar?: string
  role: string
  createdAt: string
  updatedAt?: string
}

/**
 * 请求选项类型
 */
export interface RequestOptions {
  headers?: Record<string, string>
  timeout?: number
  withCredentials?: boolean
}

/**
 * HTTP 方法类型
 */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS'

/**
 * 应用程序配置类型
 */
export interface AppConfig {
  apiUrl: string
  appTitle: string
  debug: boolean
  locale: string
}

/**
 * 通知类型
 */
export type NotificationType = 'success' | 'error' | 'warning' | 'info'

/**
 * 通知选项类型
 */
export interface NotificationOption {
  message: string
  type: NotificationType
  duration?: number
}