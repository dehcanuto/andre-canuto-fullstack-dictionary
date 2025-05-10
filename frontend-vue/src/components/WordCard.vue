<template>
  <div v-if="!loading" class="">
    <div class="border bg-purple-100 text-center py-8">
      <h1 class="text-2xl font-semibold">{{ entry?.word }}</h1>
      <p class="text-xl">{{ entry?.phonetic }}</p>
    </div>
    <div class="flex items-center mt-4 gap-2">
      <button class="text-2xl">&#9654;</button>
      <div class="w-full h-2 bg-gray-300 rounded">
        <div class="h-2 bg-blue-400 rounded" style="width: 60%"></div>
      </div>
    </div>
    <div class="mt-4">
      <h2 class="text-xl font-bold">Meanings</h2>
      <ul v-for="(meaning, index) in  entry?.meanings" :key="index" class="flex flex-col text-sm mt-1 gap-3">
        <li v-for="(definition, index) in  meaning.definitions">
          - {{ definition.definition }}
        </li>
      </ul>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
      <button class="border px-4 py-1">Voltar</button>
      <button class="border px-4 py-1">Próximo</button>
    </div>
  </div>
  <div v-else class="animate-pulse">
    <div class="flex flex-col items-center justify-center border bg-purple-100 text-center py-8 gap-3">
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
import { DictionaryEntry } from "@models/dictionary"

const props = defineProps<{ entry?: DictionaryEntry; loading: boolean }>()
</script>
