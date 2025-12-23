<template>
  <div class="mobile-phone-page">
    <div class="page-header">
      <button class="back-button" @click="goBack">← 返回</button>
      <h1>通讯录</h1>
    </div>

    <!-- 吸顶Tab栏 - 动态配置 -->
    <van-tabs
      v-model:active="activeTab"
      sticky
      @change="handleTabChange"
      class="contact-tabs"
    >
      <van-tab
        v-for="tab in tabConfig"
        :key="tab.name"
        :title="tab.title"
        :name="tab.name"
      >
        <div class="tab-content">
          <!-- 动态列表组件 -->
          <ContactList
            :items="tab.data"
            :loading="loadingMap[tab.name]"
            :finished="finishedMap[tab.name]"
            @load="() => handleLoadMore(tab.name)"
          />
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import ContactList from '@/components/ContactList.vue'
import { enableMobileAdaptation, disableMobileAdaptation } from '@/utils/rem'

// 联系人数据类型
interface ContactItem {
  id: number | string
  name: string
  phone: string
  address: string
}

// Tab配置类型
interface TabConfig {
  name: string
  title: string
  data: ContactItem[]
  canLoadMore: boolean
}

const router = useRouter()

// 返回主页
const goBack = () => {
  router.push('/')
}

// 当前激活的Tab
const activeTab = ref('recommend')

// Tab配置 - 可以轻松添加更多分类
const tabConfig = ref<TabConfig[]>([
  {
    name: 'recommend',
    title: '推荐',
    data: [],
    canLoadMore: true
  },
  {
    name: 'sports',
    title: '体育',
    data: [],
    canLoadMore: true
  },
  {
    name: 'games',
    title: '游戏',
    data: [],
    canLoadMore: true
  },
  {
    name: 'movies',
    title: '电影',
    data: [],
    canLoadMore: true
  },
  {
    name: 'more',
    title: '更多',
    data: [],
    canLoadMore: true
  }
])

// 各tab的加载状态管理
const loadingMap = reactive<Record<string, boolean>>({})
const finishedMap = reactive<Record<string, boolean>>({})

// 分页管理
const pageMap = reactive<Record<string, number>>({})

// 初始化各tab的状态
const initTabStates = () => {
  tabConfig.value.forEach(tab => {
    loadingMap[tab.name] = false
    finishedMap[tab.name] = false
    pageMap[tab.name] = 0
  })
}

// 生成测试数据的工厂函数
const createContactData = (category: string, count: number): ContactItem[] => {
  const nameTemplates = {
    recommend: ['张明', '李强', '王芳', '赵伟', '刘洋'],
    sports: ['马龙', '张继科', '林丹', '姚明', '易建联'],
    games: ['王小明', '李电竞', '王游戏', '赵王者', '刘吃鸡'],
    movies: ['周星驰', '成龙', '李连杰', '甄子丹', '刘德华'],
    more: ['张三', '李四', '王五', '赵六', '钱七']
  }

  const cities = ['北京市', '上海市', '广州市', '深圳市', '杭州市']
  const districts = ['朝阳区', '海淀区', '西城区', '东城区', '浦东新区']

  const template = nameTemplates[category as keyof typeof nameTemplates] || nameTemplates.more

  return Array.from({ length: count }, (_, i) => ({
    id: `${category}_${i}_${Date.now()}`,
    name: `${template[Math.floor(Math.random() * template.length)]}${i + 1}`,
    phone: `1${Math.floor(Math.random() * 9) + 1}${Math.random().toString().slice(2, 11)}`,
    address: `${cities[Math.floor(Math.random() * cities.length)]}${districts[Math.floor(Math.random() * districts.length)]}`
  }))
}

// 模拟异步加载数据
const loadTabData = async (tabName: string) => {
  const tab = tabConfig.value.find(t => t.name === tabName)
  if (!tab || !tab.canLoadMore) return

  loadingMap[tabName] = true

  try {
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 600))

    // 每次加载10条数据
    const pageSize = 10
    const currentPage = pageMap[tabName] || 0
    const newData = createContactData(tabName, pageSize)

    // 合并数据
    tab.data.push(...newData)
    pageMap[tabName] = currentPage + 1

    // 模拟数据加载完毕（每个tab最多30条）
    if (tab.data.length >= 30) {
      finishedMap[tabName] = true
      tab.canLoadMore = false
    }
  } catch (error) {
    console.error('数据加载失败:', error)
  } finally {
    loadingMap[tabName] = false
  }
}

// Tab切换处理
const handleTabChange = (tabName: string) => {
  activeTab.value = tabName

  // 如果当前tab还没有数据，则自动加载
  const tab = tabConfig.value.find(t => t.name === tabName)
  if (tab && tab.data.length === 0) {
    loadTabData(tabName)
  }
}

// 加载更多数据
const handleLoadMore = (tabName: string) => {
  loadTabData(tabName)
}

// 滚动监听（可选：实现自动切换tab功能）
const handleScroll = () => {
  // 这里可以实现滚动检测，比如检测当前显示的tab内容
  // 暂时简化，只记录滚动位置
  const scrollY = window.scrollY
  // console.log('滚动位置:', scrollY)
}

// 组件挂载时初始化
onMounted(() => {
  // 启用移动端rem适配
  enableMobileAdaptation()

  initTabStates()
  // 加载第一个tab的数据
  loadTabData('recommend')
  window.addEventListener('scroll', handleScroll)
})

// 组件卸载时清理
onUnmounted(() => {
  // 禁用移动端rem适配，恢复原始状态
  disableMobileAdaptation()

  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.mobile-phone-page {
  min-height: 100vh;
  background-color: #f7f8fa;
  font-size: 0.875rem; /* 14px */
}

.page-header {
  background-color: #fff;
  padding: 1rem;
  border-bottom: 1px solid #ebedf0;
  position: sticky;
  top: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 1rem;
  height: 3rem; /* 48px */
}

.back-button {
  background: none;
  border: none;
  font-size: 1rem;
  color: #1989fa;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  transition: background-color 0.2s;
  height: 2rem; /* 32px */
  display: flex;
  align-items: center;
  justify-content: center;
}

.back-button:hover {
  background-color: #f0f8ff;
}

.back-button:active {
  background-color: #e6f4ff;
}

.page-header h1 {
  margin: 0;
  font-size: 1.125rem; /* 18px */
  font-weight: 600;
  color: #323233;
  flex: 1;
}

.contact-tabs {
  background-color: #fff;
}

.tab-content {
  background-color: #f7f8fa;
  min-height: calc(100vh - 6.25rem); /* 100px */
}

/* Vant Tab 自定义样式 - rem适配 */
:deep(.van-tabs) {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: #fff;
}

:deep(.van-tabs__wrap) {
  box-shadow: 0 0.0625rem 0.1875rem rgba(0, 0, 0, 0.1);
  background-color: #fff;
  height: 2.75rem; /* 44px */
}

:deep(.van-tabs__content) {
  background-color: #f7f8fa;
}

:deep(.van-tab) {
  font-weight: 500;
  font-size: 0.875rem; /* 14px */
  padding: 0 1rem;
  line-height: 2.75rem; /* 44px */
}

:deep(.van-tab--active) {
  color: #1989fa;
  font-weight: 600;
}

:deep(.van-tabs__line) {
  height: 0.125rem; /* 2px */
  background-color: #1989fa;
}

/* 隐藏吸顶后可能产生的占位元素 */
:deep(.van-sticky__placeholder) {
  display: none !important;
}

:deep(.van-tabs__placeholder) {
  display: none !important;
}

/* 移动端优化 - 触摸区域 */
:deep(.van-tab) {
  min-width: 3rem; /* 48px 最小触摸区域 */
}

/* 小屏幕下的字体调整 */
@media screen and (max-width: 375px) {
  :deep(.van-tab) {
    font-size: 0.8rem; /* 12.8px */
  }
}
</style>
