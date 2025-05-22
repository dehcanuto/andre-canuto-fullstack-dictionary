import React, { createContext, useContext, useState, ReactNode } from 'react'
import api from '../services/api' // ajuste o caminho conforme seu projeto

interface AuthState {
  userName: string | null
  token: string | null
  isLoading: boolean
}

interface Credentials {
  email: string
  password: string
}

interface AuthContextProps extends AuthState {
  login: (credentials: Credentials) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userName, setUserName] = useState<string | null>(
    localStorage.getItem('@dicionary/userName')
  )
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('@dicionary/token')
  )
  const [isLoading, setIsLoading] = useState(false)

  const isAuthenticated = !!token

  const login = async (credentials: Credentials) => {
    try {
      setIsLoading(true)
      const { data } = await api.post('auth/signin', credentials)

      setUserName(data.name)
      setToken(data.token)

      localStorage.setItem('@dicionary/userName', data.name)
      localStorage.setItem('@dicionary/token', data.token)
    } catch (error: any) {
      throw new Error(error.message || 'Erro no login')
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUserName(null)
    setToken(null)
    localStorage.removeItem('@dicionary/userName')
    localStorage.removeItem('@dicionary/token')
  }

  return (
    <AuthContext.Provider
      value={{ userName, token, isLoading, login, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthStore(): AuthContextProps {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthStore must be used within an AuthProvider')
  }
  return context
}
