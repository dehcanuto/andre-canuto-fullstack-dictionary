<template>
  <div v-if="!loading" class="p-4 bg-white shadow rounded-xl">
    <div
      class="flex items-center justify-center relative h-46 py-8 bg-purple-100 border border-purple-200 rounded-lg"
    >
      <div
        class="absolute top-4 right-4 text-xl cursor-pointer"
        :class="{ 'text-red-500': isCurrentFavorite, 'text-slate-400': !isCurrentFavorite }"
        @click="handleFavorite(entry?.word)"
      >
        <icon-favorite></icon-favorite>
      </div>
      <div class="text-center">
        <h1 class="text-2xl font-semibold text-red-400">{{ entry?.word }}</h1>
        <p class="text-xl">{{ entry?.phonetic }}</p>
      </div>
    </div>
    <audio-player v-if="entry?.phonetics?.length" :audio="entry?.phonetics[0].audio"></audio-player>
    <div class="mt-4">
      <h2 class="text-xl font-bold mb-4">Meanings</h2>
      <ul
        v-for="(meaning, index) in entry?.meanings"
        :key="index"
        class="flex flex-col text-sm text-slate-500 mt-1 gap-3"
      >
        <li v-for="(definition, index) in meaning.definitions">- {{ definition.definition }}</li>
      </ul>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
      <base-button label="Voltar" @click="goToWord('prev')"></base-button>
      <base-button label="Próximo" @click="goToWord('next')"></base-button>
    </div>
  </div>
  <div v-else class="animate-pulse">
    <div
      class="flex flex-col items-center justify-center border bg-purple-100 text-center py-8 gap-3"
    >
      <span class="flex h-5 w-24 bg-slate-300 rounded"></span>
      <span class="flex h-3 w-18 bg-slate-300 rounded"></span>
    </div>
    <div class="flex items-center mt-4 gap-2">
      <button class="text-2xl">&#9654;</button>
      <div class="w-full h-2 bg-slate-300 rounded">
        <div class="h-2 bg-blue-400 rounded" style="width: 60%"></div>
      </div>
    </div>
    <div class="flex flex-col mt-4 gap-3">
      <span class="flex h-5 w-24 bg-slate-300 rounded"></span>
      <span class="flex h-3 w-1/2 bg-slate-300 rounded"></span>
      <span class="flex h-3 w-3/4 bg-slate-300 rounded"></span>
      <span class="flex h-3 w-24 bg-slate-300 rounded"></span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useFavorites } from '@/composables/useFavorites'
import { type DictionaryEntry } from '@models/dictionary'
import IconFavorite from '@icons/IconFavorite.vue'
import AudioPlayer from './AudioPlayer.vue'
import BaseButton from '../atoms/BaseButton.vue'
import { useEntries } from '@/composables/useEntries'

const { isFavorite, handleAddOrRemoveFavorite, fetchFavorites } = useFavorites()
const { goToWord } = useEntries()

const props = defineProps<{ entry?: DictionaryEntry; loading: boolean }>()

const isCurrentFavorite = computed(() => isFavorite(props.entry?.word ?? ''))

const handleFavorite = async (word: string) => {
  await handleAddOrRemoveFavorite(word)
  await fetchFavorites()
}
</script>
