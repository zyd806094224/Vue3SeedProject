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

const app = createApp(App)

// 全局注册 Element Plus
app.use(ElementPlus)
app.use(createPinia())
app.use(router)

app.mount('#app')
