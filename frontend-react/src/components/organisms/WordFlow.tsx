import React, { useEffect, useState } from 'react'
import WordTabs from '../molecules/WordTabs'
import WordsList from '../molecules/WordsList'
import WordCard from '../molecules/WordCard'

import { useEntries } from '../../hooks/useEntries'
import { useHistory } from '../../hooks/useHistory'
import { useFavorites } from '../../hooks/useFavorites'

const WordFlow: React.FC = () => {
  const {
    words,
    fetchEntries,
    resetEntries,
    loadDefinition,
    loading: entriesLoading,
    entry,
  } = useEntries()

  const { history, fetchHistory } = useHistory()
  const { favorites, fetchFavorites } = useFavorites()

  const [word] = useState('hello')

  const tabList = [
    { name: 'word-list', label: 'Word List' },
    { name: 'history', label: 'History' },
    { name: 'favorites', label: 'Favorites' },
  ]

  const init = async () => {
    await loadDefinition(word)
    resetEntries()
    await fetchEntries()
    await fetchHistory()
    await fetchFavorites()
  }

  const handleMoreWords = async () => {
    await fetchEntries()
  }

  const handleLoadDefinition = async (selectedWord: string) => {
    await loadDefinition(selectedWord)
    await fetchHistory()
  }

  useEffect(() => {
    void init()
  }, [])

  return (
    <div className="container mx-auto min-h-screen">
      <div className="flex flex-col md:flex-row gap-4 mt-4">
        <div className="w-full md:w-1/3">
          <WordCard entry={entry} loading={entriesLoading} />
        </div>
        <div className="w-full md:w-2/3">
          <WordTabs tabs={tabList}>
            <div label="word-list" key="word-list">
              <WordsList
                items={words}
                onSelect={handleLoadDefinition}
                onLoadMore={handleMoreWords}
              />
            </div>
            <div label="history" key="history">
              <WordsList items={history} onSelect={handleLoadDefinition} />
            </div>
            <div label="favorites" key="favorites">
              <WordsList items={favorites} onSelect={handleLoadDefinition} />
            </div>
          </WordTabs>
        </div>
      </div>
    </div>
  )
}

export default WordFlow
