import { useState, useCallback } from 'react'
import { toast } from 'react-toastify'
import api from '../services/api'

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([])

  const fetchFavorites = useCallback(async () => {
    try {
      const response = await api.get('/user/me/favorites')
      if (response.status === 200) {
        setFavorites(response.data)
      }
    } catch {
      toast.error('Erro ao listar favoritos')
    }
  }, [])

  const addFavorite = useCallback(async (word: string) => {
    try {
      const response = await api.post(`/entries/en/${word}/favorite`)
      if (response.status === 200) {
        setFavorites((prev) => [...prev, word])
      }
    } catch {
      toast.error('Erro ao adicionar favorito')
    }
  }, [])

  const removeFavorite = useCallback(async (word: string) => {
    try {
      const response = await api.delete(`/entries/en/${word}/unfavorite`)
      if (response.status === 200) {
        setFavorites((prev) => prev.filter((fav) => fav !== word))
      }
    } catch {
      toast.error('Erro ao remover favorito')
    }
  }, [])

  const isFavorite = useCallback(
    (word: string) => {
      if (!word) return false
      return favorites.includes(word)
    },
    [favorites]
  )

  const handleAddOrRemoveFavorite = useCallback(
    async (word: string) => {
      if (isFavorite(word)) {
        await removeFavorite(word)
      } else {
        await addFavorite(word)
      }
    },
    [isFavorite, addFavorite, removeFavorite]
  )

  return {
    favorites,
    fetchFavorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    handleAddOrRemoveFavorite,
  }
}
