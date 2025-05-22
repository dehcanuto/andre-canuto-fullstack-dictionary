import { useState, useEffect, useCallback } from 'react'
import { toast } from 'react-toastify'
import api from '../services/api'
import { fetchWordDefinition } from '../services/dictionaryService'
import type { DictionaryEntry } from '../models/dictionary'

type Direction = 'prev' | 'next'

export function useEntries() {
  const [words, setWords] = useState<DictionaryEntry[]>([])
  const [page, setPage] = useState(1)
  const limit = 42
  const [loading, setLoading] = useState(false)
  const [noMore, setNoMore] = useState(false)
  const [entry, setEntry] = useState<DictionaryEntry | null>(null)
  const [error, setError] = useState('')

  const fetchEntries = useCallback(async () => {
    if (noMore || loading) return
    setLoading(true)

    try {
      const response = await api.get('/entries/en', {
        params: { page, limit },
      })

      const newWords: DictionaryEntry[] = response.data.results
      if (newWords.length < limit) {
        setNoMore(true)
      }

      setWords((prev) => [...prev, ...newWords])
      setPage((prev) => prev + 1)
    } catch (err) {
      toast.error('Erro ao buscar palavras')
    } finally {
      setLoading(false)
    }
  }, [page, limit, noMore, loading])

  const resetEntries = useCallback(() => {
    setWords([])
    setPage(1)
    setNoMore(false)
  }, [])

  const loadDefinition = useCallback(async (wordToLoad: string) => {
    setLoading(true)
    setError('')
    try {
      const definition = await fetchWordDefinition(wordToLoad)
      setEntry(definition)
    } catch (err: any) {
      setError(err.message || 'Erro desconhecido')
      toast.error(err.message || 'Erro desconhecido')
    } finally {
      setLoading(false)
    }
  }, [])

  const goToWord = useCallback(
    (direction: Direction) => {
      if (!entry) return
      const currentIndex = words.findIndex((w) => w.word === entry.word)
      if (currentIndex === -1) return

      const nextIndex = direction === 'prev' ? currentIndex - 1 : currentIndex + 1
      const nextEntry = words[nextIndex]

      if (nextEntry) {
        loadDefinition(nextEntry.word)
      }
    },
    [entry, words, loadDefinition]
  )

  return {
    words,
    entry,
    error,
    fetchEntries,
    resetEntries,
    loadDefinition,
    goToWord,
    loading,
    page,
    noMore,
  }
}
