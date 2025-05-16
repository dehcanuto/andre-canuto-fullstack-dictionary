import { ref } from 'vue';
import { createSharedComposable } from "@vueuse/core"

import api from '@/services/api';

export const useFavorites = createSharedComposable(() => {
  const favorites = ref<string[]>([]);

  const fetchFavorites = async () => {
    try {
      const response = await api.get(`/user/me/favorites`);
      if (response.status === 200) {
        favorites.value = response.data;
      }
    } catch (error) {
      console.error('Erro ao listar favoritos:', error);
    }
  };

  const handleAddOrRemoveFavorite = async (word: string) => {
    if (!isFavorite(word)) {
      await addFavorite(word);
    } else {
      await removeFavorite(word);
    }
  };

  const addFavorite = async (word: string) => {
    try {
      const response = await api.post(`/entries/en/${word}/favorite`);
      if (response.status === 200) {
        favorites.value = [...favorites.value, word];
      }
    } catch (error) {
      console.error('Erro ao adicionar favorito:', error);
    }
  };

  const removeFavorite = async (word: string) => {
    try {
      const response = await api.delete(`/entries/en/${word}/unfavorite`);
      if (response.status === 200) {
        favorites.value = favorites.value.filter(fav => fav !== word);
      }
    } catch (error) {
      console.error('Erro ao remover favorito:', error);
    }
  };

  const isFavorite = (word: string) => {
    return favorites.value.includes(word);
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    fetchFavorites,
    handleAddOrRemoveFavorite,
  };
})
