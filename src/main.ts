import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// 导入全局样式
import './assets/css/main.css'
// 导入 Element Plus 核心库
import ElementPlus from 'element-plus'
// 导入 Element Plus 样式（注意：v2.3+ 版本需单独导入样式）
import 'element-plus/dist/index.css'
// 导入中文语言包（可选，默认是英文）
// @ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

const app = createApp(App)

// 全局注册 Element Plus
app.use(ElementPlus, {
  locale: zhCn, // 配置语言
})
app.use(createPinia())
app.use(router)

app.mount('#app')
