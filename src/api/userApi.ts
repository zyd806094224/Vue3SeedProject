// src/api/userApi.ts
// 用户相关 API 服务
// 包含所有用户相关的 API 调用方法

import apiClient from './apiClient'
import type { UserInfo } from '@/stores/useUserStore'

// 定义用户登录请求参数类型
interface LoginRequest {
  username: string
  password: string
}

// 定义用户登录响应类型
interface LoginResponse {
  token: string
  userInfo: UserInfo
}

// 定义更新用户信息请求参数类型
interface UpdateUserRequest {
  name?: string
  email?: string
  avatar?: string
}

/**
 * 用户 API 服务类
 * 提供所有用户相关的 API 操作
 */
export const userApi = {
  /**
   * 用户登录
   * @param credentials 登录凭据
   * @returns 登录响应
   */
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    try {
      const response = await apiClient.post<LoginResponse>('/auth/login', credentials)
      return response.data
    } catch (error) {
      console.error('登录请求失败:', error)
      throw error
    }
  },

  /**
   * 用户登出
   * @returns 登出响应
   */
  logout: async (): Promise<void> => {
    try {
      await apiClient.post('/auth/logout')
    } catch (error) {
      console.error('登出请求失败:', error)
      // 即使登出 API 失败，也要清理本地状态
      throw error
    }
  },

  /**
   * 获取当前用户信息
   * @returns 用户信息
   */
  getCurrentUser: async (): Promise<UserInfo> => {
    try {
      const response = await apiClient.get<UserInfo>('/user/profile')
      return response.data
    } catch (error) {
      console.error('获取用户信息失败:', error)
      throw error
    }
  },

  /**
   * 更新用户信息
   * @param data 用户更新数据
   * @returns 更新后的用户信息
   */
  updateUserInfo: async (data: UpdateUserRequest): Promise<UserInfo> => {
    try {
      const response = await apiClient.put<UserInfo>('/user/profile', data)
      return response.data
    } catch (error) {
      console.error('更新用户信息失败:', error)
      throw error
    }
  },

  /**
   * 删除当前用户账户
   * @returns 删除响应
   */
  deleteUser: async (): Promise<void> => {
    try {
      await apiClient.delete('/user/profile')
    } catch (error) {
      console.error('删除用户失败:', error)
      throw error
    }
  }
}
