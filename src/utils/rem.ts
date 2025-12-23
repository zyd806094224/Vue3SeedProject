/**
 * 移动端rem适配工具
 * 基于屏幕宽度动态计算根字体大小 - 仅对移动端页面生效
 */

// 设计稿基准宽度 (通常是750px的iPhone6设计稿)
const DESIGN_WIDTH = 750

// 基准字体大小 (16px)
const BASE_FONT_SIZE = 16

// 最大字体大小限制
const MAX_FONT_SIZE = 20

// 最小字体大小限制
const MIN_FONT_SIZE = 12

// 原始根字体大小备份
let originalFontSize = 16

// 是否启用了移动端适配
let isMobileAdaptationActive = false

// 事件监听器函数备份
let resizeHandler: (() => void) | null = null
let orientationHandler: (() => void) | null = null

/**
 * 检测是否为移动端页面
 */
function isMobilePage(): boolean {
  return window.location.pathname === '/mobilePhone'
}

/**
 * 检测是否为移动设备
 */
function isMobileDevice(): boolean {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

/**
 * 设置根字体大小（移动端适配）
 */
function setRootFontSize(): void {
  if (!isMobilePage()) {
    // 如果不是移动端页面，恢复原始字体大小
    if (isMobileAdaptationActive) {
      document.documentElement.style.fontSize = `${originalFontSize}px`
      isMobileAdaptationActive = false
      console.log('非移动端页面，恢复原始字体大小:', originalFontSize, 'px')
    }
    return
  }

  // 获取屏幕宽度
  const screenWidth = window.innerWidth || document.documentElement.clientWidth

  // 只有在移动设备上才进行适配
  if (!isMobileDevice()) {
    document.documentElement.style.fontSize = `${originalFontSize}px`
    isMobileAdaptationActive = false
    console.log('非移动设备，保持原始字体大小:', originalFontSize, 'px')
    return
  }

  // 计算缩放比例
  const scale = screenWidth / DESIGN_WIDTH

  // 计算字体大小
  let fontSize = BASE_FONT_SIZE * scale

  // 限制字体大小范围
  fontSize = Math.max(MIN_FONT_SIZE, Math.min(MAX_FONT_SIZE, fontSize))

  // 设置根字体大小
  document.documentElement.style.fontSize = `${fontSize}px`
  isMobileAdaptationActive = true

  console.log(`移动端页面 - 屏幕宽度: ${screenWidth}px, 根字体: ${fontSize}px`)
}

/**
 * 启用移动端适配（手动调用）
 */
export function enableMobileAdaptation(): void {
  console.log('启用移动端rem适配')

  // 保存原始字体大小
  originalFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16

  // 清理之前的事件监听器
  if (resizeHandler) {
    window.removeEventListener('resize', resizeHandler)
  }
  if (orientationHandler) {
    window.removeEventListener('orientationchange', orientationHandler)
  }

  // 创建新的事件监听器
  resizeHandler = setRootFontSize
  orientationHandler = setRootFontSize

  // 初始设置
  setRootFontSize()

  // 添加事件监听
  window.addEventListener('resize', resizeHandler)
  window.addEventListener('orientationchange', orientationHandler)
}

/**
 * 禁用移动端适配（手动调用）
 */
export function disableMobileAdaptation(): void {
  console.log('禁用移动端rem适配')

  document.documentElement.style.fontSize = `${originalFontSize}px`
  isMobileAdaptationActive = false

  // 清理事件监听器
  if (resizeHandler) {
    window.removeEventListener('resize', resizeHandler)
    resizeHandler = null
  }
  if (orientationHandler) {
    window.removeEventListener('orientationchange', orientationHandler)
    orientationHandler = null
  }
}

/**
 * px转换为rem的辅助函数
 * @param pxValue 像素值
 * @returns rem值
 */
export function pxToRem(pxValue: number): number {
  const currentFontSize = parseFloat(document.documentElement.style.fontSize) || BASE_FONT_SIZE
  return pxValue / currentFontSize
}

/**
 * 获取当前根字体大小
 */
export function getCurrentFontSize(): number {
  return parseFloat(document.documentElement.style.fontSize) || BASE_FONT_SIZE
}
