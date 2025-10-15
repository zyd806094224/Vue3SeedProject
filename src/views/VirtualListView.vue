<template>
  <div class="virtual-list-container">
    <!-- Search bar -->
    <div class="search-container">
      <input v-model="searchQuery" type="text" placeholder="Search items..." class="search-input" />
    </div>

    <!-- Stats -->
    <div class="stats">
      <p>Total items: {{ filteredItems.length }}</p>
    </div>

    <!-- Virtual Scroller -->
    <RecycleScroller
      class="scroller"
      :items="filteredItems"
      :item-size="64"
      key-field="id"
      v-slot="{ item }"
    >
      <div class="item-container">
        <div
          class="item-content"
          :class="{ selected: selectedId === item.id }"
          @click="selectItem(item.id)"
        >
          <div class="item-id">#{{ item.id }}</div>
          <div class="item-name">{{ item.name }}</div>
          <div class="item-description">{{ item.description }}</div>
        </div>
      </div>
    </RecycleScroller>
  </div>
</template>

<script setup lang="ts">
import { RecycleScroller } from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
import { computed, ref, onMounted } from 'vue'

// Define the Item type
interface Item {
  id: number
  name: string
  description: string
}

// Reactive variables
const items = ref<Item[]>([])
const selectedId = ref<number | null>(null)
const searchQuery = ref('')

// Generate sample data
const generateSampleData = (): Item[] => {
  const data: Item[] = []
  for (let i = 1; i <= 10000; i++) {
    data.push({
      id: i,
      name: `Item ${i}`,
      description: `This is a description for item ${i}. It contains additional information about the item that might be useful to the user.`
    })
  }
  return data
}

// Filter items based on search query
const filteredItems = computed(() => {
  if (!searchQuery.value) return items.value
  return items.value.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

// Select an item
const selectItem = (id: number) => {
  selectedId.value = id
}

// Initialize component
onMounted(() => {
  items.value = generateSampleData()
})
</script>

<style scoped>
.virtual-list-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.search-container {
  padding: 16px;
  background: #f5f5f5;
  border-bottom: 1px solid #ddd;
}

.search-input {
  width: 100%;
  padding: 8px 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.stats {
  padding: 8px 16px;
  background: #fafafa;
  font-size: 14px;
  color: #666;
}

.scroller {
  flex: 1;
  overflow-y: auto;
}

.item-container {
  padding: 4px;
}

.item-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 60px;
  padding: 8px 12px;
  border: 1px solid #eee;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  transition:
    background-color 0.2s,
    border-color 0.2s;
}

.item-content:hover {
  background-color: #f0f8ff;
  border-color: #409eff;
}

.item-content.selected {
  background-color: #e6f7ff;
  border-color: #1890ff;
}

.item-id {
  font-weight: bold;
  color: #1890ff;
  font-size: 12px;
}

.item-name {
  font-weight: 600;
  font-size: 16px;
  margin: 2px 0;
}

.item-description {
  font-size: 12px;
  color: #666;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
