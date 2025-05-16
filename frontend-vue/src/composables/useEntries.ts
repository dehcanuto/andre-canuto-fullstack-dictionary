import { ref } from 'vue'
import { createSharedComposable } from '@vueuse/core'
import api from '@/services/api'
import { fetchWordDefinition } from '@/services/dictionaryService'
import type { DictionaryEntry } from '@/models/dictionary'

/**
 * A shared composable for managing dictionary entries and word definitions.
 *
 * @returns An object containing the list of entries, current definition, loading states,
 *          error message, and functions to fetch/reset entries or load word definitions.
 */
export const useEntries = createSharedComposable(() => {
  const words = ref<DictionaryEntry[]>([])
  const page = ref(1)
  const limit = 42
  const loading = ref(false)
  const noMore = ref(false)

  const entry = ref<DictionaryEntry | null>(null)
  const error = ref('')

  /**
   * Fetches a paginated list of dictionary entries.
   * Prevents duplicate requests if already loading or if no more entries are available.
   */
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

  /**
   * Resets the entries list, pagination, and state flags.
   */
  const resetEntries = () => {
    words.value = []
    page.value = 1
    noMore.value = false
  }

  /**
   * Loads the definition for a specific word.
   *
   * @param wordToLoad - The word to fetch the definition for.
   */
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
