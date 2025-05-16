import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useFavorites } from '@/composables/useFavorites'
import api from '@/services/api'
import { nextTick } from 'vue'

vi.mock('@/services/api', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    delete: vi.fn(),
  },
}))

describe('useFavorites', () => {
  const word = 'example'

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('fetchFavorites() should update favorites list', async () => {
    const mockFavorites = ['apple', 'banana']
    vi.mocked(api.get).mockResolvedValue({ status: 200, data: mockFavorites })

    const { favorites, fetchFavorites } = useFavorites()
    await fetchFavorites()

    expect(api.get).toHaveBeenCalledWith('/user/me/favorites')
    expect(favorites.value).toEqual(mockFavorites)
  })

  it('addFavorite() should add word to favorites', async () => {
    vi.mocked(api.post).mockResolvedValue({ status: 200 })

    const { favorites, addFavorite } = useFavorites()
    favorites.value = []

    await addFavorite(word)
    expect(api.post).toHaveBeenCalledWith(`/entries/en/${word}/favorite`)
    expect(favorites.value).toContain(word)
  })

  it('removeFavorite() should remove word from favorites', async () => {
    vi.mocked(api.delete).mockResolvedValue({ status: 200 })

    const { favorites, removeFavorite } = useFavorites()
    favorites.value = ['example', 'test']

    await removeFavorite(word)
    expect(api.delete).toHaveBeenCalledWith(`/entries/en/${word}/unfavorite`)
    expect(favorites.value).not.toContain(word)
  })

  it('isFavorite() should return true if word is in favorites', () => {
    const { favorites, isFavorite } = useFavorites()
    favorites.value = ['example']
    expect(isFavorite('example')).toBe(true)
    expect(isFavorite('banana')).toBe(false)
  })

  it('handleAddOrRemoveFavorite() should call addFavorite if not favorited', async () => {
    const postMock = vi.mocked(api.post).mockResolvedValue({ status: 200 })
    const { favorites, handleAddOrRemoveFavorite } = useFavorites()

    favorites.value = []

    await handleAddOrRemoveFavorite(word)
    expect(postMock).toHaveBeenCalledWith(`/entries/en/${word}/favorite`)
    expect(favorites.value).toContain(word)
  })

  it('handleAddOrRemoveFavorite() should call removeFavorite if already favorited', async () => {
    const deleteMock = vi.mocked(api.delete).mockResolvedValue({ status: 200 })
    const { favorites, handleAddOrRemoveFavorite } = useFavorites()

    favorites.value = [word]

    await handleAddOrRemoveFavorite(word)
    expect(deleteMock).toHaveBeenCalledWith(`/entries/en/${word}/unfavorite`)
    expect(favorites.value).not.toContain(word)
  })
})
