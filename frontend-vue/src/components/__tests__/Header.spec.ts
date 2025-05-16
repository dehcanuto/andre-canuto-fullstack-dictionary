import { vi, describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Header from '@/components/organisms/Header.vue'

const pushMock = vi.fn()
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}))

const logoutMock = vi.fn()
vi.mock('@/stores/authStore', () => ({
  useAuthStore: () => ({
    userName: 'Test User',
    logout: logoutMock,
  }),
}))

describe('Header.vue', () => {
  it('renders title and logout button', () => {
    const wrapper = mount(Header)

    expect(wrapper.text()).toContain('Dicionary Challenge')
    const logoutButton = wrapper.find('button')
    expect(logoutButton.exists()).toBe(true)
    expect(logoutButton.text()).toBe('Sair')
  })

  it('calls logout and redirects on logout button click', async () => {
    const wrapper = mount(Header)
    const logoutButton = wrapper.find('button')

    await logoutButton.trigger('click')

    expect(logoutMock).toHaveBeenCalled()
    expect(pushMock).toHaveBeenCalledWith('/signin')
  })
})
