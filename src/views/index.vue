<!--
 * @Author: zhaoyudong
 * @Date: 2026-05-14 11:24:22
 * @LastEditors: zhaoyudong 
 * @LastEditTime: 2026-05-14 11:27:21
 * @Description: ----
 *
 * 页面功能：
 *   ----
 -->
<template>
  <div class="app-container home">
    <!-- 欢迎横幅 -->
    <div class="welcome-banner">
      <div class="welcome-content">
        <div class="welcome-left">
          <img :src="userStore.avatar" class="user-avatar" />
          <div class="welcome-text">
            <h2>{{ greetingText }}，{{ userStore.nickName || userStore.name }}</h2>
            <p class="welcome-date">{{ currentDate }}</p>
          </div>
        </div>
        <div class="welcome-right">
          <p class="welcome-desc">后台管理系统</p>
        </div>
      </div>
    </div>

    <!-- 图表区域 -->
    <el-row :gutter="20" class="chart-row">
      <el-col :sm="24" :lg="12">
        <el-card shadow="hover" class="chart-card">
          <template #header>
            <div class="card-header">
              <span class="card-title">访问趋势</span>
              <span class="card-sub">近7天</span>
            </div>
          </template>
          <div ref="visitTrendRef" class="chart-container"></div>
        </el-card>
      </el-col>
      <el-col :sm="24" :lg="12">
        <el-card shadow="hover" class="chart-card">
          <template #header>
            <div class="card-header">
              <span class="card-title">操作统计</span>
              <span class="card-sub">近7天</span>
            </div>
          </template>
          <div ref="operationStatsRef" class="chart-container"></div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="chart-row">
      <el-col :sm="24" :lg="12">
        <el-card shadow="hover" class="chart-card">
          <template #header>
            <div class="card-header">
              <span class="card-title">用户角色分布</span>
              <span class="card-sub">当前</span>
            </div>
          </template>
          <div ref="roleDistRef" class="chart-container"></div>
        </el-card>
      </el-col>
      <el-col :sm="24" :lg="12">
        <el-card shadow="hover" class="chart-card">
          <template #header>
            <div class="card-header">
              <span class="card-title">系统负载</span>
              <span class="card-sub">实时</span>
            </div>
          </template>
          <div ref="systemLoadRef" class="chart-container"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup name="Index">
import * as echarts from 'echarts'
import useUserStore from '@/store/modules/user'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

// 图表 DOM 引用
const visitTrendRef = ref(null)
const operationStatsRef = ref(null)
const roleDistRef = ref(null)
const systemLoadRef = ref(null)

// 图表实例
let visitTrendChart = null
let operationStatsChart = null
let roleDistChart = null
let systemLoadChart = null

// 问候语
const greetingText = computed(() => {
  const hour = new Date().getHours()
  if (hour < 9) return '早上好'
  if (hour < 12) return '上午好'
  if (hour < 14) return '中午好'
  if (hour < 18) return '下午好'
  return '晚上好'
})

// 当前日期
const currentDate = computed(() => {
  const now = new Date()
  const weekDays = ['日', '一', '二', '三', '四', '五', '六']
  const y = now.getFullYear()
  const m = String(now.getMonth() + 1).padStart(2, '0')
  const d = String(now.getDate()).padStart(2, '0')
  const w = weekDays[now.getDay()]
  return `${y}年${m}月${d}日 星期${w}`
})

// 获取近7天日期标签
function getRecentDays(n) {
  const days = []
  for (let i = n - 1; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    days.push(`${date.getMonth() + 1}/${date.getDate()}`)
  }
  return days
}

// 是否暗色模式
function isDark() {
  return document.documentElement.getAttribute('class')?.includes('dark')
}

// 通用颜色
function getColors() {
  const dark = isDark()
  return {
    textColor: dark ? '#cfd3dc' : '#333',
    subTextColor: dark ? '#a3a6ad' : '#999',
    borderColor: dark ? '#4c4d4f' : '#eee',
    seriesColors: ['#409EFF', '#67C23A', '#E6A23C', '#F56C6C', '#909399']
  }
}

// 访问趋势图表
function initVisitTrend() {
  visitTrendChart = echarts.init(visitTrendRef.value)
  // TODO: 替换为真实 API 数据
  const mockData = [820, 932, 901, 1034, 1290, 1330, 1020]
  updateVisitTrend(mockData)
}

function updateVisitTrend(data) {
  const colors = getColors()
  visitTrendChart.setOption({
    tooltip: {
      trigger: 'axis',
      backgroundColor: isDark() ? '#333' : '#fff',
      borderColor: colors.borderColor,
      textStyle: { color: colors.textColor }
    },
    grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: getRecentDays(7),
      axisLine: { lineStyle: { color: colors.borderColor } },
      axisLabel: { color: colors.subTextColor }
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      axisLabel: { color: colors.subTextColor },
      splitLine: { lineStyle: { color: colors.borderColor } }
    },
    series: [
      {
        name: '访问量',
        type: 'line',
        smooth: true,
        data: data,
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(64,158,255,0.3)' },
            { offset: 1, color: 'rgba(64,158,255,0.05)' }
          ])
        },
        lineStyle: { width: 2, color: '#409EFF' },
        itemStyle: { color: '#409EFF' }
      }
    ]
  })
}

// 操作统计图表
function initOperationStats() {
  operationStatsChart = echarts.init(operationStatsRef.value)
  // TODO: 替换为真实 API 数据
  const mockData = [120, 200, 150, 80, 70, 110, 130]
  updateOperationStats(mockData)
}

function updateOperationStats(data) {
  const colors = getColors()
  operationStatsChart.setOption({
    tooltip: {
      trigger: 'axis',
      backgroundColor: isDark() ? '#333' : '#fff',
      borderColor: colors.borderColor,
      textStyle: { color: colors.textColor }
    },
    grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
    xAxis: {
      type: 'category',
      data: getRecentDays(7),
      axisLine: { lineStyle: { color: colors.borderColor } },
      axisLabel: { color: colors.subTextColor }
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      axisLabel: { color: colors.subTextColor },
      splitLine: { lineStyle: { color: colors.borderColor } }
    },
    series: [
      {
        name: '操作次数',
        type: 'bar',
        barWidth: '40%',
        data: data,
        itemStyle: {
          borderRadius: [4, 4, 0, 0],
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#409EFF' },
            { offset: 1, color: '#79bbff' }
          ])
        }
      }
    ]
  })
}

// 用户角色分布图表
function initRoleDist() {
  roleDistChart = echarts.init(roleDistRef.value)
  // TODO: 替换为真实 API 数据
  const mockData = [
    { value: 35, name: '超级管理员' },
    { value: 28, name: '普通角色' },
    { value: 20, name: '运维人员' },
    { value: 12, name: '开发人员' },
    { value: 5, name: '其他' }
  ]
  updateRoleDist(mockData)
}

function updateRoleDist(data) {
  const colors = getColors()
  roleDistChart.setOption({
    tooltip: {
      trigger: 'item',
      backgroundColor: isDark() ? '#333' : '#fff',
      borderColor: colors.borderColor,
      textStyle: { color: colors.textColor }
    },
    legend: {
      orient: 'vertical',
      right: '5%',
      top: 'center',
      textStyle: { color: colors.subTextColor }
    },
    series: [
      {
        name: '角色分布',
        type: 'pie',
        radius: ['40%', '65%'],
        center: ['40%', '50%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 6,
          borderColor: isDark() ? '#1d1e1f' : '#fff',
          borderWidth: 2
        },
        label: { show: false },
        emphasis: {
          label: { show: true, fontSize: 14, fontWeight: 'bold' }
        },
        data: data,
        color: colors.seriesColors
      }
    ]
  })
}

// 系统负载图表
function initSystemLoad() {
  systemLoadChart = echarts.init(systemLoadRef.value)
  // TODO: 替换为真实 API 数据
  const mockData = { cpu: 67.2, memory: 54.8 }
  updateSystemLoad(mockData)
}

function updateSystemLoad(data) {
  const colors = getColors()
  systemLoadChart.setOption({
    series: [
      {
        name: 'CPU',
        type: 'gauge',
        center: ['30%', '55%'],
        radius: '70%',
        min: 0,
        max: 100,
        splitNumber: 5,
        axisLine: {
          lineStyle: {
            width: 12,
            color: [
              [0.3, '#67C23A'],
              [0.7, '#E6A23C'],
              [1, '#F56C6C']
            ]
          }
        },
        pointer: { width: 4, length: '60%' },
        axisTick: { distance: -12, length: 4, lineStyle: { color: '#fff', width: 1 } },
        splitLine: { distance: -12, length: 10, lineStyle: { color: '#fff', width: 2 } },
        axisLabel: { distance: 16, color: colors.subTextColor, fontSize: 10 },
        detail: {
          valueAnimation: true,
          formatter: '{value}%',
          color: colors.textColor,
          fontSize: 16,
          offsetCenter: [0, '70%']
        },
        title: { offsetCenter: [0, '90%'], color: colors.subTextColor, fontSize: 12 },
        data: [{ value: data.cpu, name: 'CPU' }]
      },
      {
        name: '内存',
        type: 'gauge',
        center: ['70%', '55%'],
        radius: '70%',
        min: 0,
        max: 100,
        splitNumber: 5,
        axisLine: {
          lineStyle: {
            width: 12,
            color: [
              [0.3, '#67C23A'],
              [0.7, '#E6A23C'],
              [1, '#F56C6C']
            ]
          }
        },
        pointer: { width: 4, length: '60%' },
        axisTick: { distance: -12, length: 4, lineStyle: { color: '#fff', width: 1 } },
        splitLine: { distance: -12, length: 10, lineStyle: { color: '#fff', width: 2 } },
        axisLabel: { distance: 16, color: colors.subTextColor, fontSize: 10 },
        detail: {
          valueAnimation: true,
          formatter: '{value}%',
          color: colors.textColor,
          fontSize: 16,
          offsetCenter: [0, '70%']
        },
        title: { offsetCenter: [0, '90%'], color: colors.subTextColor, fontSize: 12 },
        data: [{ value: data.memory, name: '内存' }]
      }
    ]
  })
}

// 窗口 resize 处理
function handleResize() {
  visitTrendChart?.resize()
  operationStatsChart?.resize()
  roleDistChart?.resize()
  systemLoadChart?.resize()
}

// 暗色模式切换监听
let darkModeObserver = null

function watchDarkMode() {
  darkModeObserver = new MutationObserver(() => {
    // 重新渲染所有图表以适配主题
    updateVisitTrend([820, 932, 901, 1034, 1290, 1330, 1020])
    updateOperationStats([120, 200, 150, 80, 70, 110, 130])
    updateRoleDist([
      { value: 35, name: '超级管理员' },
      { value: 28, name: '普通角色' },
      { value: 20, name: '运维人员' },
      { value: 12, name: '开发人员' },
      { value: 5, name: '其他' }
    ])
    updateSystemLoad({ cpu: 67.2, memory: 54.8 })
  })
  darkModeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class']
  })
}

onMounted(() => {
  initVisitTrend()
  initOperationStats()
  initRoleDist()
  initSystemLoad()
  window.addEventListener('resize', handleResize)
  watchDarkMode()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  darkModeObserver?.disconnect()
  visitTrendChart?.dispose()
  operationStatsChart?.dispose()
  roleDistChart?.dispose()
  systemLoadChart?.dispose()
})
</script>

<style scoped lang="scss">
.home {
  padding: 20px;
}

.welcome-banner {
  background: linear-gradient(135deg, #409eff 0%, #337ecc 50%, #1a5ea8 100%);
  border-radius: 10px;
  padding: 30px 40px;
  margin-bottom: 24px;
  color: #fff;
  box-shadow: 0 4px 16px rgba(64, 158, 255, 0.25);

  .welcome-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 20px;
  }

  .welcome-left {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .user-avatar {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    border: 3px solid rgba(255, 255, 255, 0.5);
    object-fit: cover;
  }

  .welcome-text {
    h2 {
      margin: 0 0 6px 0;
      font-size: 22px;
      font-weight: 600;
      letter-spacing: 1px;
    }
  }

  .welcome-date {
    margin: 0;
    font-size: 14px;
    opacity: 0.85;
  }

  .welcome-right {
    text-align: right;

    .welcome-desc {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
    }
  }
}

.chart-row {
  margin-bottom: 0;

  &:not(:last-child) {
    margin-bottom: 20px;
  }
}

.chart-card {
  margin-bottom: 0;

  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .card-title {
    font-size: 15px;
    font-weight: 600;
    color: var(--el-text-color-primary);
  }

  .card-sub {
    font-size: 12px;
    color: var(--el-text-color-secondary);
  }
}

.chart-container {
  width: 100%;
  height: 300px;
}

@media (max-width: 768px) {
  .welcome-banner {
    padding: 20px;

    .welcome-content {
      flex-direction: column;
      align-items: flex-start;
    }

    .welcome-right {
      text-align: left;
    }
  }

  .chart-container {
    height: 260px;
  }
}
</style>
