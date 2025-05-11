import { ref, watch } from 'vue'
import { type DictionaryEntry } from '@/models/dictionary'

const STORAGE_KEY = 'favorites'

/**
 * Global reactive array of favorite words.
 */
const favorites = ref<DictionaryEntry[]>([])

// Carrega ao inicializar o módulo
const stored = localStorage.getItem(STORAGE_KEY)
if (stored) {
  try {
    favorites.value = JSON.parse(stored)
  } catch (e) {
    console.error('Failed to parse favorites from storage:', e)
  }
}

// Persiste sempre que mudar
watch(favorites, (newVal) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newVal))
}, { deep: true })

export function useFavorites() {
  const handleAddOrRemoveFavorite = (word: DictionaryEntry) => {
    const exists = favorites.value.find(w => w.word === word.word)
    if (!exists) {
      favorites.value.push(word)
    } else {
      const index = favorites.value.findIndex(w => w.word === word.word)
      if (index !== -1) favorites.value.splice(index, 1)
    }
  }

  const isFavorite = (word: DictionaryEntry): boolean => {
    return favorites.value.some((w) => w.word === word.word)
  }

  return {
    favorites,
    handleAddOrRemoveFavorite,
    isFavorite,
  }
}
