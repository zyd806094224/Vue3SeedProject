# Vue3 Admin 管理系统

基于 Vue 3 + TypeScript + Vite 构建的企业级后台管理系统前端工程，脱胎于若依（RuoYi）Vue3 版本并进行了改造优化。

## 技术栈

| 类别 | 技术 | 版本 |
|------|------|------|
| 框架 | [Vue 3](https://vuejs.org/) | 3.5 |
| 构建 | [Vite](https://vitejs.dev/) | 6.4 |
| 语言 | [TypeScript](https://www.typescriptlang.org/) | 5.4 |
| UI 库 | [Element Plus](https://element-plus.org/) | 2.13 |
| 状态管理 | [Pinia](https://pinia.vuejs.org/) | 3.0 |
| 路由 | [Vue Router](https://router.vuejs.org/) | 4.6 |
| HTTP | [Axios](https://axios-http.com/) | 1.13 |
| 图表 | [ECharts](https://echarts.apache.org/) | 5.6 |
| 工具库 | [VueUse](https://vueuse.org/) | 14.1 |
| 样式 | Sass | 1.97 |
| 代码规范 | ESLint + Prettier | - |

## 功能特性

- **权限管理**：基于角色的动态路由与按钮级权限控制
- **用户管理**：用户、角色、菜单、部门、岗位的 CRUD 管理
- **系统监控**：在线用户、操作日志、登录日志、服务监控、缓存监控
- **系统工具**：代码生成、表单构建、系统接口文档（Swagger）
- **主题定制**：明暗主题切换、侧边栏风格配置
- **标签导航**：多标签页视图，支持标签缓存与关闭
- **全局组件**：SVG 图标、面包屑、分页、文件上传、富文本编辑器等
- **多环境**：开发（development）、预发布（staging）、生产（production）环境配置
- **构建优化**：Gzip/Brotli 压缩、代码分包

## 项目结构

```
src/
├── api/                  # API 接口封装
│   ├── monitor/          # 监控相关接口
│   ├── system/           # 系统管理接口
│   └── tool/             # 工具类接口
├── assets/               # 静态资源
│   ├── icons/            # SVG 图标
│   ├── images/           # 图片
│   └── styles/           # 全局样式（SCSS）
├── components/           # 公共组件
│   ├── Breadcrumb/       # 面包屑
│   ├── FileUpload/       # 文件上传
│   ├── Pagination/       # 分页
│   ├── RightToolbar/     # 右侧工具栏
│   └── SvgIcon/          # SVG 图标组件
├── directive/            # 自定义指令（权限等）
├── layout/               # 页面布局
│   └── components/       # 侧边栏、导航栏、标签页等
├── router/               # 路由配置与动态加载
├── store/                # Pinia 状态管理
│   └── modules/          # app / user / settings / permission / dict / tagsView / lock
├── utils/                # 工具函数（请求封装、权限、认证等）
├── views/                # 页面视图
│   ├── system/           # 系统管理（用户、角色、菜单、部门、岗位、字典、配置、通知）
│   ├── monitor/          # 系统监控（在线用户、日志、任务、缓存、服务器）
│   ├── tool/             # 系统工具（代码生成、表单构建、接口文档）
│   ├── error/            # 错误页面（401、404）
│   ├── login.vue         # 登录页
│   ├── register.vue      # 注册页
│   └── index.vue         # 首页
├── App.vue               # 根组件
└── main.ts               # 入口文件
```

## 快速开始

### 环境要求

- Node.js >= 16
- npm / yarn / pnpm

### 安装与运行

```bash
# 克隆项目
git clone <your-repo-url>
cd Vue3SeedProject

# 安装依赖
npm install

# 启动开发服务器（默认端口 3000）
npm run dev
```

### 构建部署

```bash
# 生产环境构建
npm run build:prod

# 预发布环境构建
npm run build:stage

# 预览构建产物
npm run preview
```

### 代码规范

```bash
# ESLint 检查并自动修复
npm run lint

# Prettier 格式化
npm run format
```

## 环境变量

| 文件 | 环境 | API 前缀 | 说明 |
|------|------|----------|------|
| `.env.development` | 开发 | `/dev-api` | 本地开发使用 |
| `.env.staging` | 预发布 | `/stage-api` | 测试环境 |
| `.env.production` | 生产 | `/prod-api` | 生产环境，启用 Gzip 压缩 |

开发环境通过 Vite 代理将 `/dev-api` 转发到后端服务，代理配置在 `vite.config.js` 中。

## Nginx 部署参考

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # 后端 API 反向代理
    location /prod-api/ {
        proxy_pass http://localhost:8080/;
    }
}
```

## License

MIT
