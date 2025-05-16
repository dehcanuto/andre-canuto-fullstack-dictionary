import { ref } from 'vue'
import { createSharedComposable } from '@vueuse/core'
import { useToast } from 'vue-toastification'
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
  const toast = useToast()

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
    if (noMore.value) return

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
      toast.error('Erro ao buscar palavras')
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
      loading.value = true
      error.value = ''
      entry.value = await fetchWordDefinition(wordToLoad)
    } catch (err: any) {
      error.value = err.message
      toast.error(err.message)
    } finally {
      loading.value = false
    }
  }

  /**
   * Navigates to the previous or next word in the list of available words.
   *
   * This function finds the current word's index (`entry.value`) in the `words` array.
   * Based on the provided `direction`, it calculates the next word's index and,
   * if the next word exists, loads its definition using `loadDefinition`.
   *
   * @param direction - The direction to navigate:
   *   - `'prev'`: go to the previous word
   *   - `'next'`: go to the next word
   *
   * @remarks
   * - Navigation only happens if `entry.value` is defined.
   * - If the current word is not found in `words`, the function returns silently.
   * - If the resulting index is out of bounds, no action is taken.
   */
  const goToWord = (direction: 'prev' | 'next') => {
    if (!entry.value) return

    const currentIndex = words.value.findIndex((w) => w.word === entry.value!.word)
    if (currentIndex === -1) return

    const nextIndex = direction === 'prev' ? currentIndex - 1 : currentIndex + 1
    const nextEntry = words.value[nextIndex]

    if (nextEntry) {
      loadDefinition(nextEntry.word)
    }
  }

  return {
    words,
    entry,
    error,
    fetchEntries,
    resetEntries,
    loadDefinition,
    goToWord,
    loading,
    page,
    noMore,
  }
})
