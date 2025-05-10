<template>
  <div class="min-h-screen">
    <div class="flex flex-col md:flex-row gap-4 mt-4 p-4">
      <WordCard></WordCard>
      <div class="w-full md:w-2/3">
        <div class="flex border-b">
          <button class="px-4 py-2 bg-gray-300">Word list</button>
          <button class="px-4 py-2 text-gray-400">Favorites</button>
        </div>

        <div class="grid grid-cols-6 gap-2 border p-2 text-center">
          <div v-for="(word, index) in words" :key="index" class="border py-2">
            {{ word }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import WordCard from "@components/WordCard.vue"

const wordsMock = [
  'hello', 'today', 'great', 'logic', 'never',
  'peace', 'chair', 'diary', 'value', 'common',
  'stop', 'watch', 'sun', 'review', 'bass',
  '...', '...', '...', '...', '...',
];

const words = ref<string[]>(wordsMock);
</script>

<style>
body {
  font-family: sans-serif;
}
</style>
