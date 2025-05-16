import { vi, describe, it, expect } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import WordFlow from '@/components/organisms/WordFlow.vue'

vi.mock('@/composables/useEntries', () => {
  return {
    useEntries: () => ({
      words: ['word1', 'word2'],
      fetchEntries: vi.fn().mockResolvedValue(undefined),
      resetEntries: vi.fn(),
      loadDefinition: vi.fn().mockResolvedValue(undefined),
      loading: false,
      entry: { word: 'word1' },
      error: null,
    }),
  }
})

vi.mock('@/composables/useHistory', () => {
  return {
    useHistory: () => ({
      history: ['history1', 'history2'],
      fetchHistory: vi.fn().mockResolvedValue(undefined),
    }),
  }
})

vi.mock('@/composables/useFavorites', () => {
  return {
    useFavorites: () => ({
      favorites: ['fav1', 'fav2'],
      fetchFavorites: vi.fn().mockResolvedValue(undefined),
    }),
  }
})

describe('WordFlow.vue', () => {
  it('renders tab buttons and reacts to selection', async () => {
    const wrapper = mount(WordFlow, {
      global: {
        stubs: {
          WordCard: {
            props: ['entry', 'loading'],
            template: '<div>WordCard mock - {{ entry.word }}</div>',
          },
          WordTabs: {
            props: ['tabs'],
            template: `
              <div>
                <button
                  v-for="tab in tabs"
                  :key="tab.name"
                  :data-testid="'tab-button-' + tab.name"
                >
                  {{ tab.label }}
                </button>
                <slot name="word-list"></slot>
                <slot name="history"></slot>
                <slot name="favorites"></slot>
              </div>`,
          },
          WordsList: {
            props: ['items'],
            template: `
              <div>
                <button
                  v-for="item in items"
                  :key="item"
                  :data-testid="'word-item-' + item"
                  @click="$emit('select', item)"
                >
                  {{ item }}
                </button>
              </div>`,
          },
        },
      },
    })

    await flushPromises()

    const tabButtons = wrapper.findAll('button[data-testid^="tab-button-"]')
    expect(tabButtons.length).toBe(3)
    expect(tabButtons[0].text()).toBe('Word List')
    expect(tabButtons[1].text()).toBe('History')
    expect(tabButtons[2].text()).toBe('Favorites')

    expect(wrapper.html()).toContain('WordCard mock - word1')

    const firstWordItem = wrapper.find('button[data-testid="word-item-word1"]')
    expect(firstWordItem.exists()).toBe(true)

    await firstWordItem.trigger('click')
  })
})
