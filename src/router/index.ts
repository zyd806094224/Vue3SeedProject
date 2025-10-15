import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

// 定义路由类型
export type RouteName = 'home' | 'about' | 'user' | 'profile' | 'virtualList'

// 定义路由配置
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // 懒加载组件 - 提升初始加载性能
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('../views/UserView.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/ProfileView.vue')
  },
  {
    path: '/virtualList',
    name: 'virtualListView',
    component: () => import('../views/VirtualListView.vue')
  },
  {
    path: '/tableListView',
    name: 'tableListView',
    component: () => import('../views/TableListView.vue')
  },
  {
    path: '/elTreeView',
    name: 'elTreeView',
    component: () => import('../views/ElTreeView.vue'),
    children: [
      {
        path: 'user',
        name: 'elTreeUser',
        component: () => import('../views/UserView.vue')
      },
      {
        path: 'profile',
        name: 'elTreeProfile',
        component: () => import('../views/ProfileView.vue')
      },
      {
        path: 'about',
        name: 'elTreeAbout',
        component: () => import('../views/AboutView.vue')
      },
      {
        path: 'virtualList',
        name: 'elTreeVirtualList',
        component: () => import('../views/VirtualListView.vue')
      },
      {
        path: 'tableList',
        name: 'elTreeTableList',
        component: () => import('../views/TableListView.vue')
      }
    ]
  }
]

// 创建路由器实例
const router = createRouter({
  history: createWebHistory(),
  routes
})

// 导出路由器实例
export default router
