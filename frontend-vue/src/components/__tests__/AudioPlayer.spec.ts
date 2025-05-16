import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import AudioPlayer from '../molecules/AudioPlayer.vue'

describe('AudioPlayer.vue', () => {
  it('renders the play button and progress bar', () => {
    const wrapper = mount(AudioPlayer, {
      props: { audio: 'audio.mp3' },
    })

    const button = wrapper.find('button')
    expect(button.exists()).toBe(true)
    expect(button.text()).toBe('▶')

    const progressBar = wrapper.find('div > div.bg-blue-400')
    expect(progressBar.exists()).toBe(true)
    expect(progressBar.element.style.width).toBe('0%')
  })

  it('plays audio when play button is clicked', async () => {
    const wrapper = mount(AudioPlayer, {
      props: { audio: 'audio.mp3' },
    })

    const audioElement = wrapper.find('audio')
    const playMock = vi.fn(() => Promise.resolve())
    audioElement.element.play = playMock

    await wrapper.find('button').trigger('click')

    expect(playMock).toHaveBeenCalled()
  })

  it('updates progress on timeupdate event', async () => {
    const wrapper = mount(AudioPlayer, {
      props: { audio: 'audio.mp3' },
    })

    const audioElement = wrapper.find('audio').element

    Object.defineProperty(audioElement, 'currentTime', {
      get: () => 5,
    })
    Object.defineProperty(audioElement, 'duration', {
      get: () => 10,
    })

    await wrapper.find('audio').trigger('timeupdate')

    expect(wrapper.vm.progress).toBeCloseTo(50)
  })

  it('resets progress when audio ends', async () => {
    const wrapper = mount(AudioPlayer, {
      props: { audio: 'audio.mp3' },
    })

    wrapper.vm.progress = 75
    await wrapper.find('audio').trigger('ended')
    expect(wrapper.vm.progress).toBe(0)
  })
})
