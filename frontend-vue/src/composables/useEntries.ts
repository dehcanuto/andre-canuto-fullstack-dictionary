import { ref } from 'vue'
import { createSharedComposable } from '@vueuse/core'
import api from '@/services/api'
import { fetchWordDefinition } from '@/services/dictionaryService'
import type { DictionaryEntry } from '@/models/dictionary'

export const useEntries = createSharedComposable(() => {
  const words = ref<DictionaryEntry[]>([])
  const offset = ref(0)
  const page = ref(1)
  const limit = 42
  const loading = ref(false)
  const noMore = ref(false)

  const entry = ref<DictionaryEntry | null>(null)
  const error = ref('')

  const fetchEntries = async () => {
    if (loading.value || noMore.value) return

    loading.value = true
    try {
      const response = await api.get('/entries/en', {
        params: { page: page.value, limit },
      })

      const newWords = response.data.results
      if (newWords.length < limit) {
        noMore.value = true
      }

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

  const loadDefinition = async (wordToLoad: string) => {
    try {
      error.value = ''
      entry.value = await fetchWordDefinition(wordToLoad)
    } catch (err: any) {
      error.value = err.message
    }
  }

  return {
    words,
    entry,
    error,
    fetchEntries,
    resetEntries,
    loadDefinition,
    loading,
    noMore,
  }
})
