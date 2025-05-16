import { ref } from 'vue'
import { createSharedComposable } from '@vueuse/core'
import { useToast } from 'vue-toastification'

import api from '@/services/api'

/**
 * A shared composable for managing the user's search history.
 *
 * @returns An object with the search history list and a function to fetch it from the server.
 */
export const useHistory = createSharedComposable(() => {
  const toast = useToast()
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
      toast.error('Erro ao listar historico')
    }
  }

  return {
    history,
    fetchHistory,
  }
})
