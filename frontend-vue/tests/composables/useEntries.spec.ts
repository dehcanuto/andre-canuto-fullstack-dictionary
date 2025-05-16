import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useEntries } from '@/composables/useEntries'
import api from '@/services/api'
import { fetchWordDefinition } from '@/services/dictionaryService'
import { flushPromises } from '@vue/test-utils'

vi.mock('@/services/api')
vi.mock('@/services/dictionaryService')

describe('useEntries', () => {
  const mockWords = [
    { word: 'hello', definition: 'A greeting' },
    { word: 'world', definition: 'The earth' },
  ]

  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('fetches entries and paginates correctly', async () => {
    ;(api.get as any).mockResolvedValueOnce({
      data: {
        results: mockWords,
      },
    })

    const {
      words,
      page,
      noMore,
      fetchEntries,
    } = useEntries()

    await fetchEntries()
    await flushPromises()

    expect(words.value.length).toBe(2)
    expect(words.value[0].word).toBe('hello')
    expect(page.value).toBe(2)
    expect(noMore.value).toBe(true)
  })

  it('sets noMore to true when results are less than limit', async () => {
    ;(api.get as any).mockResolvedValueOnce({
      data: {
        results: [],
      },
    })

    const { fetchEntries, noMore } = useEntries()
    await fetchEntries()
    await flushPromises()

    expect(noMore.value).toBe(true)
  })

  it('resets entries correctly', async () => {
    const { words, page, noMore, resetEntries } = useEntries()

    words.value = [...mockWords]
    page.value = 3
    noMore.value = true

    resetEntries()

    expect(words.value).toEqual([])
    expect(page.value).toBe(1)
    expect(noMore.value).toBe(false)
  })

  it('loads word definition successfully', async () => {
    const mockDefinition = { word: 'hello', definition: 'A greeting' }
    ;(fetchWordDefinition as any).mockResolvedValueOnce(mockDefinition)

    const { loadDefinition, entry, error } = useEntries()

    await loadDefinition('hello')
    expect(entry.value).toEqual(mockDefinition)
    expect(error.value).toBe('')
  })

  it('sets error on definition load failure', async () => {
    ;(fetchWordDefinition as any).mockRejectedValueOnce(new Error('Word not found'))

    const { loadDefinition, error } = useEntries()

    await loadDefinition('invalid')
    expect(error.value).toBe('Word not found')
  })
})
