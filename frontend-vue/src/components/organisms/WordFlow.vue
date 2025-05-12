<template>
  <div class="min-h-screen">
    <div class="flex flex-col md:flex-row gap-4 mt-4 p-4">
      <div class="w-full md:w-1/3">
        <WordCard :entry="entry" :loading="loading"></WordCard>
      </div>
      <div class="w-full md:w-2/3">
        <WordTabs :tabs="tabList">
          <template #word-list>
            <div class="grid grid-cols-6 gap-2 border p-2 text-center">
              <button
                v-for="(word, index) in words"
                :key="index"
                class="border py-2"
                @click="loadDefinition(word)"
              >
                {{ word }}
              </button>
            </div>
            <div class="flex items-center justify-end mt-4">
              <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Carregar mais palavras</button>
            </div>
          </template>
          <template #favorites>
            <div class="grid grid-cols-6 gap-2 border p-2 text-center">
              <button
                v-if="favorites.length"
                v-for="(word, index) in favorites"
                :key="index"
                class="border py-2"
                @click="loadDefinition(word)"
              >
                {{ word.word }}
              </button>
              <span v-else class="col-span-2">Sem favoritos registrados.</span>
            </div>
          </template>
        </WordTabs>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { fetchWordDefinition, fetchWords } from '@/services/dictionaryService'
import { type DictionaryEntry } from '@/models/dictionary'
import { useFavorites } from '@/composables/useFavorites'
import WordTabs from '@components/molecules/WordTabs.vue'
import WordCard from '@components/molecules/WordCard.vue'

const { favorites, fetchFavorites } = useFavorites()

const loading = ref<boolean>(true)
const words = ref<string[]>([])
const word = ref('hello')
const entry = ref<DictionaryEntry | null>(null)
const error = ref('')

const tabList = [
  { name: 'word-list', label: 'Word List' },
  { name: 'favorites', label: 'Favorites' },
]

const init = async () => {
  void loadDefinition(word.value)
  void listWords()
  await fetchFavorites()
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

const listWords = async () => {
  const response = await fetchWords()
  words.value = response.results
}

onMounted(() => {
  void init()
})
</script>
