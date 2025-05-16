<template>
  <div class="w-full p-4 bg-white shadow rounded-xl">
    <div class="flex gap-2">
      <button
        v-for="tab in tabs"
        :key="tab.name"
        role="tab"
        class="px-4 py-2 font-semibold rounded-lg cursor-pointer"
        :class="{
          'bg-blue-400 text-white hover:bg-blue-200': activeTab === tab.name,
          'text-gray-400 border border-gray-300 hover:bg-gray-100': activeTab !== tab.name,
        }"
        @click="activeTab = tab.name"
      >
        {{ tab.label }}
      </button>
    </div>
    <div class="bg-slate-100 text-gray-500 rounded-sm mt-4">
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
  },
)
</script>
