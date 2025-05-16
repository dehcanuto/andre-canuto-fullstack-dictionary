import { ref } from 'vue'
import { createSharedComposable } from '@vueuse/core'

import api from '@/services/api'

/**
 * A shared composable for managing the user's favorite words.
 *
 * @returns An object with the list of favorite words and functions to add, remove, toggle, and fetch them.
 */
export const useFavorites = createSharedComposable(() => {
  const favorites = ref<string[]>([])

  /**
   * Fetches the list of user's favorite words from the server.
   */
  const fetchFavorites = async () => {
    try {
      const response = await api.get(`/user/me/favorites`)
      if (response.status === 200) {
        favorites.value = response.data
      }
    } catch (error) {
      console.error('Erro ao listar favoritos:', error)
    }
  }

  /**
   * Toggles a word's favorite status: adds it if not present, removes it if already favorited.
   *
   * @param word - The word to add or remove from favorites.
   */
  const handleAddOrRemoveFavorite = async (word: string) => {
    if (!isFavorite(word)) {
      await addFavorite(word)
    } else {
      await removeFavorite(word)
    }
  }

  /**
   * Adds a word to the user's favorites.
   *
   * @param word - The word to mark as favorite.
   */
  const addFavorite = async (word: string) => {
    try {
      const response = await api.post(`/entries/en/${word}/favorite`)
      if (response.status === 200) {
        favorites.value = [...favorites.value, word]
      }
    } catch (error) {
      console.error('Erro ao adicionar favorito:', error)
    }
  }

  /**
   * Removes a word from the user's favorites.
   *
   * @param word - The word to remove from favorites.
   */
  const removeFavorite = async (word: string) => {
    try {
      const response = await api.delete(`/entries/en/${word}/unfavorite`)
      if (response.status === 200) {
        favorites.value = favorites.value.filter((fav) => fav !== word)
      }
    } catch (error) {
      console.error('Erro ao remover favorito:', error)
    }
  }

  /**
   * Checks if a given word is currently in the user's favorites.
   *
   * @param word - The word to check.
   * @returns `true` if the word is a favorite, otherwise `false`.
   */
  const isFavorite = (word: string) => {
    if (!word) return false
    return favorites.value.some((fav) => fav.word === word)
  }

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    fetchFavorites,
    handleAddOrRemoveFavorite,
  }
})
