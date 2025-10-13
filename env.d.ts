/// <reference types="vite/client" />

// 定义环境变量类型
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  readonly VITE_APP_TITLE: string
  readonly VITE_APP_DEBUG: string
  readonly VITE_APP_LOCALE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}