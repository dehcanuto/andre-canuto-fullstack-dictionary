<template>
  <div ref="scrollContainer" class="h-96 overflow-y-scroll scroll-visible" @scroll="handleScroll">
    <div class="grid grid-cols-6 gap-2 p-2 text-center">
      <button
        v-if="items.length"
        v-for="(word, index) in items"
        :key="index"
        class="bg-white border border-slate-300 py-2 cursor-pointer rounded hover:bg-slate-100"
        @click="emit('select', typeof word === 'string' ? word : word.word)"
      >
        {{ word.word ?? word }}
      </button>
      <span v-else class="col-span-2">Sem palavras registradas.</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { type DictionaryEntry } from '@/models/dictionary'

defineProps<{ items?: DictionaryEntry[]; loading: boolean }>()
const emit = defineEmits<{
  (e: 'select', word: DictionaryEntry): void
  (e: 'loadMore'): void
}>()

const scrollContainer = ref(null)
let lastScrollTop = 0
let debounceTimeout: number | null = null

const handleScroll = () => {
  const el = scrollContainer.value
  const scrollTop = el.scrollTop
  const isScrollingDown = scrollTop > lastScrollTop
  lastScrollTop = scrollTop
  const isAtBottom = scrollTop + el.clientHeight >= el.scrollHeight - 10

  if (isScrollingDown && isAtBottom) {
    if (debounceTimeout) return

    debounceTimeout = setTimeout(() => {
      emit('loadMore')
      debounceTimeout = null
    }, 300)
  }
}
</script>
