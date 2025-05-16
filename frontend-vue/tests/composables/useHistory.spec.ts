import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useHistory } from '@/composables/useHistory'
import api from '@/services/api'

vi.mock('@/services/api', () => ({
  default: {
    get: vi.fn(),
  },
}))

describe('useHistory', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('fetchHistory() should update history list', async () => {
    const mockHistory = ['apple', 'banana']
    vi.mocked(api.get).mockResolvedValue({ status: 200, data: mockHistory })

    const { history, fetchHistory } = useHistory()
    await fetchHistory()

    expect(api.get).toHaveBeenCalledWith('/history')
    expect(history.value).toEqual(mockHistory)
  })

  it('fetchHistory() should not update history if API fails', async () => {
    vi.mocked(api.get).mockRejectedValue(new Error('API failed'))

    const { history, fetchHistory } = useHistory()
    history.value = ['existing']

    await fetchHistory()

    expect(api.get).toHaveBeenCalledWith('/history')
    expect(history.value).toEqual(['existing'])
  })
})
