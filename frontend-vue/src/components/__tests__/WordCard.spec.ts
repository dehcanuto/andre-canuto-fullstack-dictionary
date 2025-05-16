import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import WordCard from '../molecules/WordCard.vue'

describe('WordCard.vue', () => {
  it('renders the word prop', () => {
    const wrapper = mount(WordCard, {
      props: {
        entry: {
          word: "hello",
          meanings: [{
            definitions: [
              { definition: "\"Hello!\" or an equivalent greeting." }
            ]
          }]
        }
      }
    })

    expect(wrapper.text()).toContain('hello')
    expect(wrapper.text()).toContain('\"Hello!\" or an equivalent greeting.')
  })
})
