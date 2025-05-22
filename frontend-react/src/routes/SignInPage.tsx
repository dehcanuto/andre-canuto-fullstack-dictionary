import React, { useState, useMemo, ChangeEvent, FormEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthStore } from '../context/authContext'

interface Credentials {
  email: string
  password: string
}

const SignInView: React.FC = () => {
  const [credentials, setCredentials] = useState<Credentials>({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const authStore = useAuthStore()

  const isLoading = authStore.isLoading

  const validations = useMemo(() => ({
    email: /\S+@\S+\.\S+/.test(credentials.email),
    password: credentials.password.trim().length > 0,
  }), [credentials])

  const isFormValid = validations.email && validations.password

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCredentials(prev => ({ ...prev, [name]: value }))
  }

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()
    if (!isFormValid) return

    try {
      await authStore.login(credentials)
      navigate('/home')
    } catch {
      setError('Erro ao efetuar o login. Tente novamente.')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form onSubmit={handleLogin} className="w-80 space-y-4">
        <h1 className="text-2xl font-bold text-center">Entrar</h1>
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          required
          value={credentials.email}
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Senha"
          className="w-full p-2 border rounded"
          required
          value={credentials.password}
          onChange={handleChange}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? 'Enviando' : 'Entrar'}
        </button>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <p className="text-sm text-center">
          Não tem uma conta?{' '}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Cadastrar
          </Link>
        </p>
      </form>
    </div>
  )
}

export default SignInView
