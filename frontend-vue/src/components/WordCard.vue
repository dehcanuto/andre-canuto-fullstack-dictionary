<template>
  <div class="w-full md:w-1/3">
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
</template>
<script setup lang="ts">
import { DictionaryEntry } from "@models/dictionary"

const props = defineProps<{ entry?: string }>()
</script>
