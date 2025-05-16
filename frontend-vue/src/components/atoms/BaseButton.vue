<template>
  <button
    type="button"
    class="px-4 py-2 font-semibold text-gray-500 border border-gray-300 hover:bg-gray-100 rounded-lg cursor-pointer"
    @click=""
  >
    {{ label }}
  </button>
</template>
<script setup lang="ts">
const props = defineProps<{ label: string; disabled?: boolean }>()
</script>
