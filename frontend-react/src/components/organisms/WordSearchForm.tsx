import React, { useState } from 'react'

interface WordSearchFormProps {
  onSearch: (word: string) => void
  loading: boolean
}

export const WordSearchForm: React.FC<WordSearchFormProps> = ({ onSearch, loading }) => {
  const [word, setWord] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (word.trim()) onSearch(word.trim())
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        placeholder="Digite a palavra"
        value={word}
        onChange={(e) => setWord(e.target.value)}
        disabled={loading}
        className="border rounded px-3 py-2 flex-grow"
        aria-label="Buscar palavra"
      />
      <button
        type="submit"
        className="bg-purple-500 text-white px-4 rounded disabled:opacity-50"
        disabled={loading}
      >
        Buscar
      </button>
    </form>
  )
}
