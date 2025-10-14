<template>
  <div class="about-view">
    <h1>关于本项目</h1>
    <div class="content">
      <p>
        Vue3 种子项目是一个现代化的前端脚手架，旨在为开发者提供一个功能完整、结构清晰的项目起点。
      </p>

      <h2>项目架构</h2>
      <div class="architecture">
        <div class="architecture-item">
          <h3>前端技术栈</h3>
          <ul>
            <li><strong>Vue 3</strong> - 渐进式 JavaScript 框架</li>
            <li><strong>TypeScript</strong> - JavaScript 的超集，提供类型安全</li>
            <li><strong>Vite</strong> - 下一代前端构建工具</li>
            <li><strong>Vue Router</strong> - Vue.js 官方路由管理器</li>
            <li><strong>Pinia</strong> - Vue.js 的轻量级状态管理库</li>
          </ul>
        </div>

        <div class="architecture-item">
          <h3>开发工具</h3>
          <ul>
            <li><strong>ESLint</strong> - JavaScript/TypeScript 代码检查工具</li>
            <li><strong>Prettier</strong> - 代码格式化工具</li>
            <li><strong>Axios</strong> - 基于 Promise 的 HTTP 客户端</li>
            <li><strong>VueUse</strong> - Vue.js 组合式 API 实用工具集</li>
          </ul>
        </div>
      </div>

      <h2>目录结构</h2>
      <div class="directory-structure">
        <pre><code>src/
├── api/              # API 请求相关
│   ├── apiClient.ts  # Axios 客户端配置
│   ├── index.ts      # API 模块入口
│   └── userApi.ts    # 用户相关 API
├── assets/           # 静态资源
│   └── css/          # 样式文件
├── components/       # 公共组件
├── layouts/          # 页面布局
├── router/           # 路由配置
├── stores/           # Pinia 状态管理
├── types/            # TypeScript 类型定义
├── utils/            # 工具函数
├── views/            # 页面视图
└── main.ts           # 应用入口文件
</code></pre>
      </div>

      <h2>使用说明</h2>
      <div class="instructions">
        <h3>启动项目</h3>
        <pre><code># 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build</code></pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 关于页面组件
// 显示项目信息和使用说明
</script>

<style scoped>
.about-view {
  padding: 2rem 0;
}

.content {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 1rem;
  color: #28a745;
}

.architecture {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
}

.architecture-item {
  background-color: var(--bg-secondary, #f8f9fa);
  padding: 1.5rem;
  border-radius: 8px;
}

.architecture-item h3 {
  margin-top: 0;
  color: var(--text-primary, #333);
}

.architecture-item ul {
  padding-left: 1.5rem;
}

.architecture-item li {
  margin-bottom: 0.5rem;
}

.directory-structure,
.instructions {
  background-color: var(--bg-secondary, #f8f9fa);
  padding: 1.5rem;
  border-radius: 8px;
  margin: 1.5rem 0;
}

pre {
  margin: 0;
  overflow-x: auto;
}

h2 {
  margin-top: 2rem;
  color: var(--text-primary, #333);
}

h3 {
  color: var(--text-primary, #333);
}

/* 暗色主题样式 */
:root[data-theme='dark'] {
  --bg-secondary: #495057;
  --text-primary: #f8f9fa;
}
</style>
