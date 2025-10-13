# Vue 3 Seed Project

这是一个基于 Vue 3、TypeScript、Vite 和 Pinia 的现代化前端项目种子模板。

## 技术栈

- [Vue 3](https://v3.cn.vuejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Pinia](https://pinia.vuejs.org/)
- [Vue Router](https://router.vuejs.org/zh/)
- [VueUse](https://vueuse.org/)
- [Axios](https://axios-http.com/)

## 项目结构

```
src/
├── api          # API 接口封装
├── assets       # 静态资源文件
├── components   # 全局组件
├── layouts      # 布局组件
├── router       # 路由配置
├── stores       # 状态管理
├── types        # TypeScript 类型定义
├── utils        # 工具函数
├── views        # 页面视图
├── App.vue      # 根组件
└── main.ts      # 入口文件
```

## 开发环境

- Node.js >= 16
- npm 或 yarn 或 pnpm

## 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

默认会在 http://localhost:3000 打开应用。

### 构建生产版本

```bash
npm run build
```

构建后的文件将位于 `dist` 目录中。

### 类型检查

```bash
npm run type-check
```

### 代码格式化

```bash
npm run format
```

### 代码检查与修复

```bash
npm run lint
```

## 功能特性

- 🚀 基于 Vite 构建，快速的冷启动和热更新
- 🧠 使用 TypeScript 提供类型安全
- 📦 使用 Pinia 进行状态管理
- 🔄 内置 Vue Router 实现 SPA 路由
- 🔧 集成 Vue DevTools 支持
- 🎨 支持 CSS 模块化和预处理器
- 🌍 Axios 封装用于 HTTP 请求
- 🧰 集成 VueUse 工具库
- ✨ ESLint 和 Prettier 保证代码质量

## 项目配置

- **端口**: 默认运行在 3000 端口
- **自动打开浏览器**: 开发服务器启动后会自动打开浏览器
- **别名**: 使用 `@` 作为 `src` 目录的别名

## 目录说明

- `api/`: 存放 API 接口封装
- `components/`: 存放可复用的组件
- `layouts/`: 存放布局组件
- `views/`: 存放页面级组件
- `stores/`: 存放 Pinia 状态管理模块
- `router/`: 存放路由配置
- `utils/`: 存放工具函数
- `types/`: 存放 TypeScript 类型定义

## License

MIT