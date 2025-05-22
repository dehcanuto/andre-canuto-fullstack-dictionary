import React, { useState, FormEvent, ChangeEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { signup } from '../services/auth'

const SignUpView: React.FC = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault()
    try {
      await signup(name, email, password)
      navigate('/signin')
    } catch {
      setError('Erro ao criar conta')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form onSubmit={handleSignup} className="w-80 space-y-4">
        <h1 className="text-2xl font-bold text-center">Criar Conta</h1>
        <input
          type="text"
          placeholder="Nome"
          className="w-full p-2 border rounded"
          required
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          required
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          className="w-full p-2 border rounded"
          required
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Cadastrar
        </button>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <p className="text-sm text-center">
          Já tem uma conta?{' '}
          <Link to="/signin" className="text-blue-600 hover:underline">
            Entrar
          </Link>
        </p>
      </form>
    </div>
  )
}

export default SignUpView
