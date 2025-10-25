// src/api/fileApi.ts
// 文件上传相关 API 服务
// 包含所有文件上传相关的 API 调用方法

import apiClient from './apiClient'

// 定义文件上传响应类型
interface FileUploadResponse {
  success: boolean
  message: string
  data?: {
    fileName: string
    fileUrl: string
    fileSize: number
    fileType: string
    uploadTime: string
  }
}

// 定义文件上传请求参数类型
interface FileUploadRequest {
  file: File
  additionalData?: Record<string, any>
}

/**
 * 文件 API 服务类
 * 提供所有文件上传相关的 API 操作
 */
export const fileApi = {
  /**
   * 上传单个文件
   * @param file 文件对象
   * @returns 上传响应
   */
  uploadFile: async (file: File): Promise<FileUploadResponse> => {
    try {
      // 创建 FormData 对象
      const formData = new FormData()
      formData.append('file', file)

      // 使用改进后的apiClient，自动处理FormData的Content-Type
      const response = await apiClient.post<FileUploadResponse>(
        'http://localhost:8060/file/upload',
        formData,
        {
          timeout: 30000 // 文件上传可能需要更长时间
        }
      )

      return response.data
    } catch (error) {
      console.error('文件上传失败:', error)
      throw error
    }
  },

  /**
   * 上传文件并携带额外数据
   * @param file 文件对象
   * @param additionalData 额外的表单数据
   * @returns 上传响应
   */
  uploadFileWithData: async (
    file: File,
    additionalData: Record<string, any>
  ): Promise<FileUploadResponse> => {
    try {
      // 创建 FormData 对象
      const formData = new FormData()
      formData.append('file', file)

      // 添加额外数据
      Object.keys(additionalData).forEach(key => {
        formData.append(key, additionalData[key])
      })

      // 使用改进后的apiClient，自动处理FormData的Content-Type
      const response = await apiClient.post<FileUploadResponse>(
        'http://localhost:8060/file/upload',
        formData,
        {
          timeout: 30000 // 文件上传可能需要更长时间
        }
      )

      return response.data
    } catch (error) {
      console.error('文件上传失败:', error)
      throw error
    }
  },

  /**
   * 上传多个文件
   * @param files 文件对象数组
   * @returns 上传响应数组
   */
  uploadMultipleFiles: async (files: File[]): Promise<FileUploadResponse[]> => {
    try {
      const uploadPromises = files.map(async (file) => {
        const formData = new FormData()
        formData.append('file', file)

        const response = await apiClient.post<FileUploadResponse>(
          'http://localhost:8060/file/upload',
          formData,
          {
            timeout: 30000 // 文件上传可能需要更长时间
          }
        )

        return response.data
      })

      return await Promise.all(uploadPromises)
    } catch (error) {
      console.error('批量文件上传失败:', error)
      throw error
    }
  },

  /**
   * 获取文件信息（如果服务器支持）
   * @param fileName 文件名
   * @returns 文件信息
   */
  getFileInfo: async (fileName: string): Promise<FileUploadResponse['data']> => {
    try {
      const response = await apiClient.get<FileUploadResponse['data']>(
        `http://localhost:8060/file/info/${fileName}`
      )

      return response.data
    } catch (error) {
      console.error('获取文件信息失败:', error)
      throw error
    }
  },

  /**
   * 删除文件（如果服务器支持）
   * @param fileName 文件名
   * @returns 删除响应
   */
  deleteFile: async (fileName: string): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await apiClient.delete<{ success: boolean; message: string }>(
        `http://localhost:8060/file/delete/${fileName}`
      )

      return response.data
    } catch (error) {
      console.error('删除文件失败:', error)
      throw error
    }
  }
}