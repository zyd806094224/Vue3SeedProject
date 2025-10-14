<template>
  <button
    :class="[
      'base-button',
      `base-button--${variant}`,
      `base-button--${size}`,
      {
        'base-button--disabled': disabled,
        'base-button--loading': loading
      }
    ]"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <!-- 加载状态图标 -->
    <span v-if="loading" class="button-spinner"></span>

    <!-- 按钮内容 -->
    <span class="button-content">
      <slot />
    </span>
  </button>
</template>

<script setup lang="ts">
// 定义组件属性
interface Props {
  // 按钮变体（样式类型）
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark'
  // 按钮大小
  size?: 'small' | 'medium' | 'large'
  // 是否禁用
  disabled?: boolean
  // 是否显示加载状态
  loading?: boolean
}

// 定义属性默认值
const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'medium',
  disabled: false,
  loading: false
})

// 定义事件
const emit = defineEmits<{
  // 点击事件
  (e: 'click', event: MouseEvent): void
}>()

// 处理点击事件
const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>

<style scoped>
/* 基础按钮样式 */
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  text-align: center;
  text-decoration: none;
  transition: all 0.2s ease-in-out;
  position: relative;
  overflow: hidden;
}

/* 尺寸样式 */
.base-button--small {
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
  line-height: 1.5;
}

.base-button--medium {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  line-height: 1.5;
}

.base-button--large {
  padding: 0.75rem 1.5rem;
  font-size: 1.125rem;
  line-height: 1.5;
}

/* 变体样式 */
.base-button--primary {
  background-color: #0d6efd;
  color: white;
}

.base-button--primary:hover:not(.base-button--disabled):not(.base-button--loading) {
  background-color: #0b5ed7;
}

.base-button--secondary {
  background-color: #6c757d;
  color: white;
}

.base-button--secondary:hover:not(.base-button--disabled):not(.base-button--loading) {
  background-color: #5c636a;
}

.base-button--success {
  background-color: #198754;
  color: white;
}

.base-button--success:hover:not(.base-button--disabled):not(.base-button--loading) {
  background-color: #157347;
}

.base-button--danger {
  background-color: #dc3545;
  color: white;
}

.base-button--danger:hover:not(.base-button--disabled):not(.base-button--loading) {
  background-color: #bb2d3b;
}

.base-button--warning {
  background-color: #ffc107;
  color: #212529;
}

.base-button--warning:hover:not(.base-button--disabled):not(.base-button--loading) {
  background-color: #ffca2c;
}

.base-button--info {
  background-color: #0dcaf0;
  color: #212529;
}

.base-button--info:hover:not(.base-button--disabled):not(.base-button--loading) {
  background-color: #31d2f2;
}

.base-button--light {
  background-color: #f8f9fa;
  color: #212529;
}

.base-button--light:hover:not(.base-button--disabled):not(.base-button--loading) {
  background-color: #e2e6ea;
}

.base-button--dark {
  background-color: #212529;
  color: white;
}

.base-button--dark:hover:not(.base-button--disabled):not(.base-button--loading) {
  background-color: #343a40;
}

/* 禁用状态样式 */
.base-button--disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

/* 加载状态样式 */
.base-button--loading {
  opacity: 0.8;
  cursor: wait;
}

.button-spinner {
  width: 1rem;
  height: 1rem;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: 0.5rem;
}

.button-content {
  display: flex;
  align-items: center;
}

/* 旋转动画 */
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
