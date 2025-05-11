<template>
  <div class="w-full">
    <div class="flex border-b">
      <button
        v-for="tab in tabs"
        :key="tab.name"
        class="px-4 py-2 text-gray-400"
        :class="{ 'bg-gray-300 text-gray-800': activeTab === tab.name }"
        @click="activeTab = tab.name"
      >
        {{ tab.label }}
      </button>
    </div>
    <div class="mt-4">
      <slot :name="activeTab" />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  tabs: {
    type: Array,
    required: true,
  },
  defaultTab: {
    type: String,
    default: null,
  },
})

const activeTab = ref(props.defaultTab || props.tabs[0]?.name)

watch(
  () => props.defaultTab,
  (val) => {
    if (val) activeTab.value = val
  }
)
</script>
