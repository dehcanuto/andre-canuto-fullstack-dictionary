import { ref } from 'vue';
import { createSharedComposable } from "@vueuse/core"

import api from '@/services/api';

export const useHistory = createSharedComposable(() => {
  const history = ref<string[]>([]);

  const fetchHistory = async () => {
    try {
      const response = await api.get(`/history`);
      if (response.status === 200) {
        history.value = response.data;
      }
    } catch (error) {
      console.error('Erro ao listar favoritos:', error);
    }
  };

  return {
    history,
    fetchHistory,
  };
})
