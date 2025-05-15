<template>
  <div class="grid grid-cols-6 gap-2 p-2 text-center">
    <button
      v-if="items.length"
      v-for="(word, index) in items"
      :key="index"
      class="bg-white border border-slate-300 py-2 rounded"
      @click="emit('select', word)"
    >
      {{ word.word ?? word }}
    </button>
    <span v-else class="col-span-2">Sem palavras registradas.</span>
  </div>
</template>
<script setup lang="ts">
import { type DictionaryEntry } from '@/models/dictionary'
const props = defineProps<{ items?: DictionaryEntry[]; loading: boolean }>()
const emit = defineEmits<{
  (e: 'select', word: DictionaryEntry): void
}>()
</script>
