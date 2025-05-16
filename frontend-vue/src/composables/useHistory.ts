import { ref } from 'vue'
import { createSharedComposable } from '@vueuse/core'

import api from '@/services/api'

/**
 * A shared composable for managing the user's search history.
 *
 * @returns An object with the search history list and a function to fetch it from the server.
 */
export const useHistory = createSharedComposable(() => {
  const history = ref<string[]>([])

  /**
   * Fetches the user's search history from the server.
   */
  const fetchHistory = async () => {
    try {
      const response = await api.get(`/user/me/history`)
      if (response.status === 200) {
        history.value = response.data
      }
    } catch (error) {
      console.error('Erro ao listar favoritos:', error)
    }
  }

  return {
    history,
    fetchHistory,
  }
})
