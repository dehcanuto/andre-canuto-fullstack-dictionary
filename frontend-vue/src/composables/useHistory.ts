import { ref } from 'vue';
import { createSharedComposable } from "@vueuse/core"

import api from '@/services/api';

export const useHistory = createSharedComposable(() => {
  const history = ref<string[]>([]);

  const fetchHistory = () => {};

  return {
    history,
    fetchHistory,
  };
})
