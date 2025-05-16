import { ref } from 'vue'
import { createSharedComposable } from '@vueuse/core'
import api from '@/services/api'
import type { DictionaryEntry } from '@/models/dictionary'

export const useEntries = createSharedComposable(() => {
  const words = ref<DictionaryEntry[]>([])
  const page = ref(1)
  const limit = 50
  const loading = ref(false)
  const noMore = ref(false)

  const fetchEntries = async () => {
    if (loading.value || noMore.value) return

    loading.value = true
    try {
      const { data } = await api.get('/entries/en', {
        params: { page: page.value, limit },
      })

      const newWords: DictionaryEntry[] = data?.results ?? []
      if (newWords.length < limit) noMore.value = true

      words.value.push(...newWords)
      page.value += 1
    } catch (err) {
      console.error('Erro ao buscar palavras:', err)
    } finally {
      loading.value = false
    }
  }

  const resetEntries = () => {
    words.value = []
    page.value = 1
    noMore.value = false
  }

  return {
    words,
    fetchEntries,
    resetEntries,
    loading,
    noMore,
  }
})
