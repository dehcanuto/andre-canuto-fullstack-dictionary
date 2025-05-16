import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import WordsList from '../molecules/WordsList.vue'
import { nextTick } from 'vue'

describe('WordsList.vue', () => {
  const mockWords = [
    { word: 'apple' },
    { word: 'banana' },
    { word: 'cherry' },
    { word: 'date' },
    { word: 'elderberry' },
    { word: 'fig' },
  ]

  let wrapper: ReturnType<typeof mount>

  beforeEach(() => {
    wrapper = mount(WordsList, {
      props: {
        items: mockWords,
        loading: false,
      },
    })
  })

  it('renders all word buttons', () => {
    const buttons = wrapper.findAll('button')
    expect(buttons.length).toBe(mockWords.length)
    expect(buttons[0].text()).toBe('apple')
    expect(buttons[1].text()).toBe('banana')
  })

  it('emits "select" event with correct word on button click', async () => {
    const firstButton = wrapper.find('button')
    await firstButton.trigger('click')
    expect(wrapper.emitted('select')).toBeTruthy()
    expect(wrapper.emitted('select')![0]).toEqual(['apple'])
  })

  it('displays message when no items are provided', async () => {
    await wrapper.setProps({ items: [] })
    expect(wrapper.text()).toContain('Sem palavras registradas.')
  })
})
