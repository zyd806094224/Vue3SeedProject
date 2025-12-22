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
}

.contact-item:last-child {
  border-bottom: none;
}
</style>