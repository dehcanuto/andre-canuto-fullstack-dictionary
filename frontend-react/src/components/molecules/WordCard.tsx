import React, { useMemo } from 'react'
import type { DictionaryEntry } from '../../models/dictionary'
import { useFavorites } from '../../hooks/useFavorites'
import { useEntries } from '../../hooks/useEntries'
import IconFavorite from '../icons/IconFavorite'
import AudioPlayer from './AudioPlayer'
import BaseButton from '../atoms/BaseButton'

type WordCardProps = {
  entry?: DictionaryEntry
  loading: boolean
}

export const WordCard: React.FC<WordCardProps> = ({ entry, loading }) => {
  const { isFavorite, handleAddOrRemoveFavorite, fetchFavorites } = useFavorites()
  const { goToWord } = useEntries()

  const isCurrentFavorite = useMemo(() => {
    return entry?.word ? isFavorite(entry.word) : false
  }, [entry, isFavorite])

  const handleFavorite = async () => {
    if (!entry?.word) return
    await handleAddOrRemoveFavorite(entry.word)
    await fetchFavorites()
  }

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="flex flex-col items-center justify-center border bg-purple-100 text-center py-8 gap-3">
          <span className="flex h-5 w-24 bg-slate-300 rounded"></span>
          <span className="flex h-3 w-18 bg-slate-300 rounded"></span>
        </div>
        <div className="flex items-center mt-4 gap-2">
          <button className="text-2xl">&#9654;</button>
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

  return (
    <div className="p-4 bg-white shadow rounded-xl">
      <div className="relative flex items-center justify-center py-8 h-46 bg-purple-100 border border-purple-200 rounded-lg">
        <div
          className={`absolute top-4 right-4 text-xl cursor-pointer ${
            isCurrentFavorite ? 'text-red-500' : 'text-slate-400'
          }`}
          onClick={handleFavorite}
        >
          <IconFavorite />
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-red-400">{entry?.word}</h1>
          <p className="text-xl">{entry?.phonetic}</p>
        </div>
      </div>
      {entry?.phonetics?.[0]?.audio && <AudioPlayer audio={entry.phonetics[0].audio} />}
      <div className="mt-4">
        <h2 className="text-xl font-bold mb-4">Meanings</h2>
        {entry?.meanings?.map((meaning, index) => (
          <ul key={index} className="flex flex-col text-sm text-slate-500 mt-1 gap-3">
            {meaning.definitions.map((def, i) => (
              <li key={i}>- {def.definition}</li>
            ))}
          </ul>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
        <BaseButton label="Voltar" onClick={() => goToWord('prev')} />
        <BaseButton label="Próximo" onClick={() => goToWord('next')} />
      </div>
    </div>
  )
}

export default WordCard
