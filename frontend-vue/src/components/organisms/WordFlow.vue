<template>
  <div class="container mx-auto min-h-screen">
    <div class="flex flex-col md:flex-row gap-4 mt-4">
      <div class="w-full md:w-1/3">
        <WordCard :entry="entry" :loading="loading"></WordCard>
      </div>
      <div class="w-full md:w-2/3">
        <WordTabs :tabs="tabList">
          <template #word-list>
            <words-list :items="words" @select="loadDefinition" @loadMore="handleMoreWords"></words-list>
          </template>
          <template #history>
            <words-list :items="history" @select="loadDefinition"></words-list>
          </template>
          <template #favorites>
            <words-list :items="favorites" @select="loadDefinition"></words-list>
          </template>
        </WordTabs>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { fetchWordDefinition } from '@/services/dictionaryService'
import { type DictionaryEntry } from '@/models/dictionary'

import { useEntries } from '@/composables/useEntries'
import { useHistory } from '@/composables/useHistory'
import { useFavorites } from '@/composables/useFavorites'

import WordTabs from '@components/molecules/WordTabs.vue'
import WordsList from '@components/molecules/WordsList.vue'
import WordCard from '@components/molecules/WordCard.vue'

const { words, fetchEntries, resetEntries, loading: entriesLoading } = useEntries()
const { history, fetchHistory } = useHistory()
const { favorites, fetchFavorites } = useFavorites()

const word = ref('hello')
const entry = ref<DictionaryEntry | null>(null)
const error = ref('')

const tabList = [
  { name: 'word-list', label: 'Word List' },
  { name: 'history', label: 'History' },
  { name: 'favorites', label: 'Favorites' },
]

const init = async () => {
  void loadDefinition(word.value)
  resetEntries()
  await fetchEntries()
  await fetchHistory()
  await fetchFavorites()
}

const loadDefinition = async (wordToLoad: string) => {
  try {
    error.value = ''
    entry.value = await fetchWordDefinition(wordToLoad)
  } catch (err: any) {
    error.value = err.message
  }
}

const handleMoreWords = async () => {
  await fetchEntries()
}

onMounted(() => {
  void init()
})
</script>
