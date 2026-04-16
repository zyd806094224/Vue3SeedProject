# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目

基于若依（RuoYi-Vue3）框架的 Vue 3 后台管理系统。后端为 Java Spring Boot，前端通过 Vite 代理 `/dev-api` 转发到 `localhost:8061`。

## 常用命令

```bash
npm run dev            # 启动开发服务器（端口 3000，自动打开浏览器）
npm run build:prod     # 生产环境构建
npm run build:stage    # 预发布环境构建
npm run lint           # ESLint 检查并自动修复（.vue, .js, .ts）
npm run format         # Prettier 格式化 src/
```

项目未配置测试框架。

## 代码风格

Prettier 规则：无分号、单引号、2 空格缩进、行宽 100、无尾逗号。新代码必须遵循，提交前运行 `npm run format`。

项目主体为 JavaScript（非 TypeScript）。`tsconfig.json` 仅用于编辑器类型支持，新增文件使用 `.js` / `.vue`。

## 架构

### 请求管道

所有 HTTP 请求经过 `src/utils/request.js` 封装的 Axios 实例，包含：
- JWT Token 自动注入：从 Cookie（`Admin-Token`）读取，添加到 `Authorization: Bearer` 请求头
- 防重复提交：POST/PUT 请求 1000ms 内相同参数自动拦截，通过 header `repeatSubmit: false` 可关闭
- 响应拦截：401 自动弹出重新登录对话框，500/601 统一错误提示
- `download()` 方法：blob 文件下载，带 loading 遮罩

API 层在 `src/api/` 下按模块组织，每个文件导出独立的请求函数。

### 权限与路由

路由系统分两层（`src/router/index.js`）：
1. `constantRoutes` — 静态路由，始终加载（登录、注册、401、404、首页、个人中心、锁屏）
2. `dynamicRoutes` — 动态路由，由 `src/store/modules/permission.js` 根据后端菜单接口返回数据动态生成，按用户权限过滤

`src/permission.js` 是路由守卫，处理：Token 校验 → 获取用户信息 → 首次进入时生成动态路由。

按钮级权限使用自定义指令：`v-hasPermi="['system:user:add']"` 和 `v-hasRole="['admin']"`（定义在 `src/directive/`）。

### 状态管理（Pinia）

Store 位于 `src/store/modules/`，统一使用 Options API 风格（`defineStore('name', { state, actions })`）：
- **user** — 认证 Token、用户信息、角色、权限
- **permission** — 动态生成的路由列表
- **app** — 侧边栏状态、设备类型
- **dict** — 缓存的字典数据
- **settings** — 主题/布局配置
- **tagsView** — 打开的页面标签
- **lock** — 锁屏状态

### 全局注册项（src/main.js）

以下工具和组件已全局注册，页面中无需手动 import：
- **Vue/Router API 自动导入**（`unplugin-auto-import`）：`ref`、`reactive`、`computed`、`watch`、`onMounted`、`useRouter`、`useRoute` 等
- **全局组件**：`Pagination`、`FileUpload`、`ImageUpload`、`ImagePreview`、`RightToolbar`、`Editor`、`DictTag`、`svg-icon`
- **全局方法（通过 proxy 访问）**：在 `<script setup>` 中通过 `const { proxy } = getCurrentInstance()` 获取：
  - `proxy.useDict(type)` — 获取字典数据
  - `proxy.download(url, params, filename)` — 文件下载
  - `proxy.parseTime(time, pattern)` — 日期格式化
  - `proxy.resetForm(refName)` — 表单重置
  - `proxy.handleTree(data)` — 扁平数组转树结构
  - `proxy.addDateRange(params, range)` — 注入 beginTime/endTime 参数
  - `proxy.$modal` — 消息弹窗（confirm、msgSuccess、msgError）

### 页面组件模式

页面视图遵循统一模式（参考 `src/views/system/` 下任意文件）：
- `<script setup name="PageName">`，name 属性通过 `unplugin-vue-setup-extend-plus` 插件支持
- 通过 `getCurrentInstance()` 获取 proxy 访问全局方法
- 使用 `proxy.useDict('dict_type')` 获取字典数据
- 标准 CRUD 流程：从 API 层导入 `listXxx` / `getXxx` / `addXxx` / `updateXxx` / `delXxx`
- `el-dialog` 承载新增/编辑表单，`el-table` 承载列表，`<pagination>` 承载分页
- 操作按钮通过 `v-hasPermi` 进行权限控制

### API 层约定

- 文件位置：`src/api/{模块}/{业务}.js`
- 函数命名：`listXxx(query)` / `getXxx(id)` / `addXxx(data)` / `updateXxx(data)` / `delXxx(id)`
- HTTP 方法：GET 查询、POST 新增、PUT 修改、DELETE 删除

### 路径别名

- `@` → `src/`
- `~` → 项目根目录

### 环境配置

- `.env.development` — `VITE_APP_BASE_API = /dev-api`，代理到后端
- `.env.production` — `VITE_APP_BASE_API = /prod-api`，开启 gzip 压缩
