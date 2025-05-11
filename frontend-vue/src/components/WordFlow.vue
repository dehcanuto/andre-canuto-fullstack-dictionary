<template>
  <div class="min-h-screen">
    <div class="flex flex-col md:flex-row gap-4 mt-4 p-4">
      <div class="w-full md:w-1/3">
        <WordCard :entry="entry" :loading="loading"></WordCard>
      </div>
      <div class="w-full md:w-2/3">
        <div class="flex border-b">
          <button class="px-4 py-2 text-gray-400" :class="{ 'bg-gray-300 text-gray-800': view === 'word-list' }" @click="toggleView('word-list')">Word list</button>
          <button class="px-4 py-2 text-gray-400" :class="{ 'bg-gray-300 text-gray-800': view === 'favorites' }" @click="toggleView('favorites')">
            Favorites
          </button>
        </div>
        <div v-if="view === 'word-list'" class="grid grid-cols-6 gap-2 border p-2 text-center">
          <button
            v-for="(word, index) in words"
            :key="index"
            class="border py-2"
            @click="loadDefinition(word)"
          >
            {{ word }}
          </button>
        </div>
        <div v-if="view === 'favorites'" class="grid grid-cols-6 gap-2 border p-2 text-center">
          <button
            v-for="(word, index) in favorites"
            :key="index"
            class="border py-2"
            @click="loadDefinition(word)"
          >
            {{ word.word }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { fetchWordDefinition } from '@/services/dictionaryService'
import { type DictionaryEntry } from '@/models/dictionary'
import { useFavorites } from '../composables/useFavorites'
import WordCard from '@components/WordCard.vue'

const wordsMock = [
  'hello',
  'today',
  'great',
  'logic',
  'never',
  'peace',
  'chair',
  'diary',
  'value',
  'common',
  'stop',
  'watch',
  'sun',
  'review',
  'bass',
  '...',
  '...',
  '...',
  '...',
  '...',
]

const { favorites } = useFavorites()

const loading = ref<boolean>(true)
const words = ref<string[]>(wordsMock)
const word = ref('hello')
const entry = ref<DictionaryEntry | null>(null)
const view = ref('word-list')
const error = ref('')

function toggleView(goesTo: 'word-list' | 'favorites'): void {
  view.value = goesTo
}

const loadDefinition = async (word: string) => {
  try {
    loading.value = true
    error.value = ''
    entry.value = await fetchWordDefinition(word)
  } catch (err: any) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  void loadDefinition(word.value)
})
</script>
