<template>
  <div class="container mx-auto min-h-screen">
    <div class="flex flex-col md:flex-row gap-4 mt-4">
      <div class="w-full md:w-1/3">
        <WordCard :entry="entry" :loading="loading"></WordCard>
      </div>
      <div class="w-full md:w-2/3">
        <WordTabs :tabs="tabList">
          <template #word-list>
            <words-list
              :items="words"
              @select="handleLoadDefinition"
              @loadMore="handleMoreWords"
            ></words-list>
          </template>
          <template #history>
            <words-list :items="history" @select="handleLoadDefinition"></words-list>
          </template>
          <template #favorites>
            <words-list :items="favorites" @select="handleLoadDefinition"></words-list>
          </template>
        </WordTabs>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

import { useEntries } from '@/composables/useEntries'
import { useHistory } from '@/composables/useHistory'
import { useFavorites } from '@/composables/useFavorites'

import WordTabs from '@components/molecules/WordTabs.vue'
import WordsList from '@components/molecules/WordsList.vue'
import WordCard from '@components/molecules/WordCard.vue'

const {
  words,
  fetchEntries,
  resetEntries,
  loadDefinition,
  loading: entriesLoading,
  entry,
  error,
} = useEntries()
const { history, fetchHistory } = useHistory()
const { favorites, fetchFavorites } = useFavorites()

const word = ref('hello')
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

const handleMoreWords = async () => {
  await fetchEntries()
}

const handleLoadDefinition = async (word: string) => {
  await loadDefinition(word)
  await fetchHistory()
}

onMounted(() => {
  void init()
})
</script>
