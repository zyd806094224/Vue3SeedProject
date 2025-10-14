# Vue 3 Seed Project

这是一个现代化的 Vue 3 开发种子项目，集成了 TypeScript、Vite、Pinia 等最新技术栈，旨在为开发者提供一个开箱即用的企业级前端开发模板。

## 🚀 项目特性

- ✅ **Vue 3** + Composition API - 最新的 Vue 框架
- ✅ **TypeScript** - 类型安全，减少运行时错误
- ✅ **Vite** - 快速的构建工具，支持热模块替换
- ✅ **Pinia** - Vue 官方推荐的状态管理库
- ✅ **Vue Router 4** - 完整的路由解决方案，支持懒加载
- ✅ **Axios** - 强大的 HTTP 客户端，包含请求/响应拦截器
- ✅ **ESLint + Prettier** - 统一代码风格，保证代码质量
- ✅ **响应式设计** - 适配各种屏幕尺寸
- ✅ **主题切换** - 内置明暗主题切换
- ✅ **API 模块化** - 预配置的 API 请求封装
- ✅ **类型定义** - 全面的 TypeScript 类型定义
- ✅ **状态管理** - 使用 Pinia 进行全局状态管理
- ✅ **通知系统** - 内置全局通知提示功能

## 🛠 技术栈

- [Vue 3](https://v3.cn.vuejs.org/) - 渐进式 JavaScript 框架
- [TypeScript](https://www.typescriptlang.org/) - JavaScript 的超集，提供类型检查
- [Vite](https://vitejs.dev/) - 下一代前端构建工具
- [Pinia](https://pinia.vuejs.org/) - 轻量级状态管理库
- [Vue Router](https://router.vuejs.org/zh/) - Vue.js 官方路由管理器
- [VueUse](https://vueuse.org/) - 实用的 Vue Composition API 工具库
- [Axios](https://axios-http.com/) - 基于 Promise 的 HTTP 客户端
- [ESLint](https://eslint.org/) - JavaScript/TypeScript 代码检查工具
- [Prettier](https://prettier.io/) - 代码格式化工具

## 📁 项目结构

```
src/
├── api/                 # API 接口封装
│   ├── apiClient.ts     # Axios 客户端配置
│   ├── userApi.ts       # 用户相关 API
│   └── index.ts         # API 模块入口
├── assets/              # 静态资源文件
│   └── css/main.css     # 全局样式文件
├── components/          # 全局组件
│   └── BaseButton.vue   # 基础按钮组件
├── layouts/             # 布局组件
│   └── MainLayout.vue   # 主布局组件
├── router/              # 路由配置
│   └── index.ts         # 路由配置文件
├── stores/              # 状态管理
│   ├── useAppStore.ts   # 应用状态 store
│   ├── useUserStore.ts  # 用户状态 store
│   └── index.ts         # Store 模块入口
├── types/               # TypeScript 类型定义
│   └── index.ts         # 项目类型定义
├── utils/               # 工具函数
├── views/               # 页面视图组件
│   ├── HomeView.vue     # 首页
│   ├── AboutView.vue    # 关于页面
│   ├── UserView.vue     # 用户页面
│   └── ProfileView.vue  # 个人资料页面
├── App.vue              # 根组件
└── main.ts              # 入口文件
```

## 💻 开发环境

- **Node.js**: >= 16.x
- **包管理器**: npm, yarn 或 pnpm
- **浏览器支持**: 现代浏览器 (Chrome, Firefox, Safari, Edge)

## 🚀 快速开始

### 1. 环境准备

首先确保你已经安装了 Node.js (>= 16.x):

```bash
node -v
```

### 2. 克隆项目

```bash
git clone <your-repo-url>
cd vue3-seed-project
```

### 3. 安装依赖

```bash
npm install
# 或者
yarn install
# 或者
pnpm install
```

### 4. 启动开发服务器

```bash
npm run dev
# 或者
yarn dev
# 或者
pnpm dev
```

开发服务器将在 `http://localhost:3000` 启动，并自动打开浏览器。

### 5. 构建生产版本

```bash
npm run build
# 或者
yarn build
# 或者
pnpm build
```

构建后的文件将位于 `dist` 目录中。

### 6. 其他脚本命令

```bash
# 预览生产构建
npm run preview

# 类型检查
npm run type-check

# 代码格式化
npm run format

# 代码检查与修复
npm run lint

# 同时运行构建和类型检查
npm run build
```

## 🔧 配置文件

### 环境变量配置

项目使用 `.env` 文件管理环境变量：

```
# API 基础 URL
VITE_API_BASE_URL=http://localhost:3000/api

# 应用程序标题
VITE_APP_TITLE=Vue3 种子项目

# 是否启用调试模式
VITE_APP_DEBUG=true

# 默认语言
VITE_APP_LOCALE=zh-CN
```

### Vite 配置

- **端口**: 默认为 3000，可在 `vite.config.ts` 中修改
- **自动打开浏览器**: 启动开发服务器时自动打开浏览器
- **别名**: 使用 `@` 作为 `src` 目录的别名

### TypeScript 配置

- **路径映射**: `@/*` 映射到 `./src/*`
- **类型检查**: 基于 `@vue/tsconfig/tsconfig.dom.json`

## 🧠 核心概念

### 1. 状态管理 (Pinia)

项目使用 Pinia 作为状态管理方案，提供了以下几个核心 store：

- **appStore**: 管理应用级别的状态（主题、加载状态、通知等）
- **userStore**: 管理用户相关状态（登录状态、用户信息等）

```typescript
// 使用 store 的示例
import { useAppStore } from '@/stores/useAppStore'

const appStore = useAppStore()
appStore.setTheme('dark') // 设置暗色主题
appStore.showNotification('保存成功', 'success') // 显示成功通知
```

### 2. API 管理

项目使用 Axios 封装了 API 请求，具有以下特性：

- **请求拦截器**: 自动添加认证头、显示加载状态
- **响应拦截器**: 统一处理错误、隐藏加载状态
- **错误处理**: 自动处理 401 认证错误和 500 服务器错误

```typescript
// API 调用示例
import { fetchUserProfile } from '@/api'

try {
  const response = await fetchUserProfile(userId)
  console.log(response.data)
} catch (error) {
  console.error('获取用户信息失败:', error)
}
```

### 3. 路由管理

使用 Vue Router 4 实现单页应用路由，支持组件懒加载：

```typescript
// 路由配置示例
{
  path: '/about',
  name: 'about',
  component: () => import('../views/AboutView.vue') // 懒加载
}
```

### 4. 类型安全

项目提供全面的 TypeScript 类型定义，包括：

- API 响应类型
- 用户信息类型
- 分页数据类型
- HTTP 方法类型

## 🧩 组件架构

### 布局组件

- **MainLayout**: 主布局组件，包含头部导航、主要内容区和页脚

### 通用组件

- **BaseButton**: 基础按钮组件，支持不同样式变体

## 🎨 主题系统

项目内置明暗主题切换功能：

```typescript
const appStore = useAppStore()

// 切换主题
const toggleTheme = () => {
  const newTheme = appStore.theme === 'light' ? 'dark' : 'light'
  appStore.setTheme(newTheme)
  document.documentElement.setAttribute('data-theme', newTheme)
}
```

## 🔐 用户认证

项目集成了用户认证功能，包含：

- 用户登录/登出状态管理
- 用户信息存储
- 自动处理认证过期

## 📊 环境变量

| 环境变量 | 描述 | 默认值 |
|---------|------|--------|
| VITE_API_BASE_URL | API 基础 URL | http://localhost:3000/api |
| VITE_APP_TITLE | 应用标题 | Vue3 种子项目 |
| VITE_APP_DEBUG | 是否启用调试模式 | true |
| VITE_APP_LOCALE | 默认语言 | zh-CN |

## 📦 部署

### 构建生产版本

```bash
npm run build
```

### 部署到服务器

构建后的文件位于 `dist` 目录，可部署到任意静态文件服务器：

1. 将 `dist` 目录中的所有文件上传到服务器
2. 配置服务器以正确处理路由（将所有路由指向 `index.html`）
3. 访问你的网站

### Nginx 配置示例

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## 🔍 开发指南

### 添加新页面

1. 在 `src/views/` 目录下创建新的 Vue 组件
2. 在 `src/router/index.ts` 中添加路由配置
3. 如需要，更新导航菜单

### 添加新的 Store

1. 在 `src/stores/` 目录下创建新的 store 文件
2. 使用 `defineStore` 定义 store
3. 在 `src/stores/index.ts` 中导出 store

### 添加新的 API 接口

1. 在 `src/api/` 目录下创建 API 文件
2. 导出 API 函数
3. 在 `src/api/index.ts` 中导出 API

## 🛡️ 安全特性

- **请求拦截**: 自动添加认证头
- **错误处理**: 统一处理认证过期
- **类型安全**: 全面的 TypeScript 类型检查
- **代码规范**: ESLint 检查代码质量

## ✅ 最佳实践

1. **组件化**: 将功能拆分为可复用的组件
2. **状态管理**: 使用 Pinia 管理全局状态
3. **类型安全**: 为所有变量和函数添加类型注解
4. **API 封装**: 将 API 调用封装在独立的模块中
5. **错误处理**: 统一处理请求错误和业务错误
6. **代码规范**: 遵循 ESLint 和 Prettier 代码规范

## 🤝 贡献

欢迎提交 Issue 和 Pull Request。

## 📄 License

MIT License