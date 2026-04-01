<template>
  <el-scrollbar
    ref="scrollContainer"
    :vertical="false"
    class="scroll-container"
    @wheel.prevent="handleScroll"
  >
    <slot />
  </el-scrollbar>
</template>

<script setup>
import useTagsViewStore from '@/store/modules/tagsView'

const tagAndTagSpacing = ref(4)
const { proxy } = getCurrentInstance()

const scrollWrapper = computed(() => proxy.$refs.scrollContainer.$refs.wrapRef)

const emits = defineEmits(['scroll', 'updateArrows'])

onMounted(() => {
  scrollWrapper.value.addEventListener('scroll', emitScroll, true)
})

onBeforeUnmount(() => {
  scrollWrapper.value.removeEventListener('scroll', emitScroll)
})

const emitScroll = () => {
  emits('scroll')
  emits('updateArrows')
}

function smoothScrollTo(target) {
  const $scrollWrapper = scrollWrapper.value
  const start = $scrollWrapper.scrollLeft
  const distance = target - start
  const duration = 300
  let startTime = null

