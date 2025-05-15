import { defineStore } from 'pinia'

import type { AuthState } from '@models/auth'
import api from '@/services/api';

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    userName: localStorage.getItem('@dicionary/userName') || null,
    token: localStorage.getItem('@dicionary/token') || null,
    isLoading: false,
  }),
  getters: {
    isAuthenticated: (state: AuthState) => !!state.token,
    getMe: (state: AuthState) => state.user && JSON.parse(state.user),
  },
  actions: {
    async login(credentials: { email: string; password: string }): Promise<void> {
      try {
        this.isLoading = true
        const { data } = await api.post('auth/signin', credentials)

        this.userName = data.name
        this.token = data.token

        localStorage.setItem('@dicionary/userName', data.user)
        localStorage.setItem('@dicionary/token', data.token)
      } catch (error) {
        throw new Error(`${error}`)
      } finally {
        this.isLoading = false
      }
    },

    logout() {
      this.userName = null
      this.token = null
      localStorage.removeItem('@dicionary/user')
      localStorage.removeItem('@dicionary/token')
    },
  },
})
