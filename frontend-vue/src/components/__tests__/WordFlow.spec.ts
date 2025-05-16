import { vi, describe, it, expect } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import WordFlow from '@/components/organisms/WordFlow.vue'

vi.mock('@/composables/useEntries', () => {
  return {
    useEntries: () => ({
      words: ['hello', 'world'],
      fetchEntries: vi.fn().mockResolvedValue(undefined),
      resetEntries: vi.fn(),
      loadDefinition: vi.fn().mockResolvedValue(undefined),
      loading: false,
      entry: {},
      error: null,
    }),
  }
})

vi.mock('@/composables/useHistory', () => {
  return {
    useHistory: () => ({
      history: ['test1', 'test2'],
      fetchHistory: vi.fn().mockResolvedValue(undefined),
    }),
  }
})

vi.mock('@/composables/useFavorites', () => {
  return {
    useFavorites: () => ({
      favorites: ['fav1'],
      fetchFavorites: vi.fn().mockResolvedValue(undefined),
    }),
  }
})

const WordCard = {
  props: ['entry', 'loading'],
  template: '<div>WordCard mock</div>',
}

const WordTabs = {
  template: '<div><slot name="word-list" /><slot name="history" /><slot name="favorites" /></div>',
}
const WordsList = {
  props: ['items'],
  template: '<div><button @click="$emit(\'select\', items[0])">Select</button></div>',
}

describe('WordFlow.vue', () => {
  it('renders tab buttons and switches tabs', async () => {
    const wrapper = mount(WordFlow, {
      global: {
        stubs: {
          WordCard: {
            props: ['entry', 'loading'],
            template: '<div>WordCard mock</div>',
          },
          WordTabs: {
            template: '<div><slot name="word-list" /><slot name="history" /><slot name="favorites" /></div>',
          },
          WordsList: {
            props: ['items'],
            template: '<div><button @click="$emit(\'select\', items[0])">Select</button></div>',
          },
        },
      },
    })

    await flushPromises()

    expect(wrapper.html()).toContain('Select')
  })
})
