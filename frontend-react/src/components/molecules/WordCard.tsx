import React, { useState, useEffect } from 'react'
import { AudioPlayer } from './AudioPlayer'
import { BaseButton } from '../atoms/BaseButton'

interface Definition {
  definition: string
}

interface Meaning {
  definitions: Definition[]
}

interface Phonetic {
  audio: string
}

export interface DictionaryEntry {
  word: string
  phonetic?: string
  phonetics?: Phonetic[]
  meanings: Meaning[]
}

interface WordCardProps {
  entry?: DictionaryEntry
  loading: boolean
  onGoToWord: (direction: 'prev' | 'next') => void
  isFavorite: (word: string) => boolean
  onToggleFavorite: (word: string) => Promise<void>
}

const WordCard: React.FC<WordCardProps> = ({
  entry,
  loading,
  onGoToWord,
  isFavorite,
  onToggleFavorite,
}) => {
  const [favorite, setFavorite] = useState(false)

  useEffect(() => {
    if (entry?.word) {
      setFavorite(isFavorite(entry.word))
    }
  }, [entry, isFavorite])

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="flex flex-col items-center justify-center border bg-purple-100 text-center py-8 gap-3 rounded-xl">
          <span className="flex h-5 w-24 bg-slate-300 rounded"></span>
          <span className="flex h-3 w-18 bg-slate-300 rounded"></span>
        </div>
        <div className="flex items-center mt-4 gap-2">
          <button className="text-2xl" aria-label="Play audio" type="button">
            ▶
          </button>
          <div className="w-full h-2 bg-slate-300 rounded">
            <div className="h-2 bg-blue-400 rounded" style={{ width: '60%' }}></div>
          </div>
        </div>
        <div className="flex flex-col mt-4 gap-3">
          <span className="flex h-5 w-24 bg-slate-300 rounded"></span>
          <span className="flex h-3 w-1/2 bg-slate-300 rounded"></span>
          <span className="flex h-3 w-3/4 bg-slate-300 rounded"></span>
          <span className="flex h-3 w-24 bg-slate-300 rounded"></span>
        </div>
      </div>
    )
  }

  if (!entry) {
    return <div>Nenhuma palavra selecionada</div>
  }

  const handleFavoriteClick = async () => {
    if (!entry.word) return
    await onToggleFavorite(entry.word)
    setFavorite(!favorite)
  }

  return (
    <div className="p-4 bg-white shadow rounded-xl">
      <div className="flex items-center justify-center relative h-46 py-8 bg-purple-100 border border-purple-200 rounded-lg">
        <button
          aria-label="Marcar como favorito"
          aria-pressed={favorite}
          className={`absolute top-4 right-4 text-xl cursor-pointer ${
            favorite ? 'text-red-500' : 'text-slate-400'
          }`}
          onClick={handleFavoriteClick}
          type="button"
        >
          ★
        </button>
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-red-400">{entry.word}</h1>
          <p className="text-xl">{entry.phonetic}</p>
        </div>
      </div>

      {entry.phonetics?.[0]?.audio && <AudioPlayer audio={entry.phonetics[0].audio} />}

      <div className="mt-4">
        <h2 className="text-xl font-bold mb-4">Meanings</h2>
        {entry.meanings.map((meaning, i) => (
          <ul key={i} className="flex flex-col text-sm text-slate-500 mt-1 gap-3">
            {meaning.definitions.map((def, index) => (
              <li key={index}>- {def.definition}</li>
            ))}
          </ul>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
        <BaseButton label="Voltar" onClick={() => onGoToWord('prev')} />
        <BaseButton label="Próximo" onClick={() => onGoToWord('next')} />
      </div>
    </div>
  )
}

export default WordCard