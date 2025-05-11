import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import WordCard from '../WordCard.vue'

describe('WordCard', () => {
  it('renders properly', () => {
    const wrapper = mount(WordCard, {
      props: {
        entry: {
          word: 'today',
          phonetic: '/təˈdeɪ/',
        },
      },
    })
    expect(wrapper.text()).toContain('today')
  })
})
