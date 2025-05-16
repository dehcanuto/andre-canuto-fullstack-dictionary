<template>
  <div class="flex items-center justify-center size-12 bg-blue-300 rounded-full">
    <span class="font-semibold text-slate-800">{{ formatUserName(name) }}</span>
  </div>
</template>
<script setup lang="ts">
import { formatUserName } from '@/misc/format'
defineProps<{ name: string }>()
</script>
