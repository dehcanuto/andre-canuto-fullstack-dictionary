import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UserThumbnail from '../molecules/UserThumbnail.vue'

describe('UserThumbnail.vue', () => {
  it('renders the correct initials for a two-word name', () => {
    const wrapper = mount(UserThumbnail, {
      props: { name: 'Lucas Silva' },
    })
    expect(wrapper.text()).toBe('LS')
  })

  it('renders the correct initial for a single-word name', () => {
    const wrapper = mount(UserThumbnail, {
      props: { name: 'Lucas' },
    })
    expect(wrapper.text()).toBe('L')
  })

  it('renders empty string when name is empty', () => {
    const wrapper = mount(UserThumbnail, {
      props: { name: '' },
    })
    expect(wrapper.text()).toBe('')
  })
})
