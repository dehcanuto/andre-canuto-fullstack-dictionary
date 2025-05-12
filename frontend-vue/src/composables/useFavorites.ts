import { ref } from 'vue';
import api from '@/services/api';

export function useFavorites() {
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
    console.log(word, isFavorite(word))
    !isFavorite(word) ? addFavorite(word) : removeFavorite(word);
  }

  const addFavorite = async (word: string) => {
    try {
      const response = await api.post(`/entries/en/${word}/favorite`);
      if (response.status === 200) {
        favorites.value.push(word);
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
    console.log('isFavorite', favorites.value, word)
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
}
