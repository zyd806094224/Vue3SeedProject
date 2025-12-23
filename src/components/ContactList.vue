<template>
  <van-list
    :loading="loading"
    :finished="finished"
    finished-text="没有更多数据了"
    @load="$emit('load')"
    class="contact-list"
  >
    <van-cell
      v-for="item in items"
      :key="item.id"
      :title="item.name"
      :value="item.phone"
      :label="item.address"
      class="contact-item"
    />
  </van-list>
</template>

<script setup lang="ts">
interface ContactItem {
  id: number | string
  name: string
  phone: string
  address: string
}

interface Props {
  items: ContactItem[]
  loading?: boolean
  finished?: boolean
}

interface Emits {
  (e: 'load'): void
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  finished: false
})

defineEmits<Emits>()
</script>

<style scoped>
.contact-list {
  padding: 0;
}

.contact-item {
  background-color: #fff;
  border-bottom: 1px solid #ebedf0;
  padding: 0.75rem 1rem; /* 12px 16px */
  min-height: 3.5rem; /* 56px */
  display: flex;
  align-items: center;
}

.contact-item:last-child {
  border-bottom: none;
}

/* 联系人信息样式 - rem适配 */
:deep(.van-cell__title) {
  font-size: 0.9375rem; /* 15px */
  font-weight: 500;
  color: #323233;
  margin-bottom: 0.125rem; /* 2px */
}

:deep(.van-cell__value) {
  font-size: 0.8125rem; /* 13px */
  color: #969799;
}

:deep(.van-cell__label) {
  font-size: 0.75rem; /* 12px */
  color: #969799;
  margin-top: 0.125rem; /* 2px */
}

/* 移动端优化 - 增大触摸区域 */
.contact-item {
  min-height: 3.75rem; /* 60px */
  padding: 1rem; /* 16px */
}

/* 小屏幕适配 */
@media screen and (max-width: 375px) {
  :deep(.van-cell__title) {
    font-size: 0.875rem; /* 14px */
  }

  :deep(.van-cell__value) {
    font-size: 0.75rem; /* 12px */
  }

  :deep(.van-cell__label) {
    font-size: 0.6875rem; /* 11px */
  }
}
</style>