<template>
  <div class="flex items-center mt-4 gap-2">
    <button class="text-2xl" @click="playAudio">&#9654;</button>
    <div class="w-full h-2 bg-gray-300 rounded">
      <div class="h-2 bg-blue-400 rounded" :style="{ width: progress + '%' }"></div>
    </div>
    <audio ref="audioPlayer" :src="audio" @timeupdate="updateProgress" @ended="onEnded"></audio>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ audio?: string }>()

const audioPlayer = ref<HTMLAudioElement | null>(null)
const progress = ref(0)

const playAudio = () => {
  if (audioPlayer.value) {
    audioPlayer.value.play().catch((err: any) => {
      console.error('Erro ao tentar tocar áudio:', err)
    })
  }
}

const updateProgress = () => {
  const audio = audioPlayer.value
  if (!audio) return

  progress.value = (audio.currentTime / audio.duration) * 100
}

const onEnded = () => {
  progress.value = 0
}
</script>
