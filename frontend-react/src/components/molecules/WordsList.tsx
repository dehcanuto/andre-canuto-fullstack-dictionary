import React, { useRef, useEffect } from 'react'
import { type DictionaryEntry } from './WordCard'

interface WordsListProps {
  items?: DictionaryEntry[]
  loading: boolean
  onSelect: (word: string) => void
  onLoadMore: () => void
}

const WordsList: React.FC<WordsListProps> = ({ items = [], loading, onSelect, onLoadMore }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  let debounceTimeout: NodeJS.Timeout | null = null
  let lastScrollTop = 0

  useEffect(() => {
    return () => {
      if (debounceTimeout) clearTimeout(debounceTimeout)
    }
  }, [])

  const handleScroll = () => {
    const el = scrollContainerRef.current
    if (!el) return

    const scrollTop = el.scrollTop
    const isScrollingDown = scrollTop > lastScrollTop
    lastScrollTop = scrollTop

    const isAtBottom = scrollTop + el.clientHeight >= el.scrollHeight - 10

    if (isScrollingDown && isAtBottom && !debounceTimeout) {
      debounceTimeout = setTimeout(() => {
        onLoadMore()
        debounceTimeout = null
      }, 300)
    }
  }

  return (
    <div
      ref={scrollContainerRef}
      onScroll={handleScroll}
      className="flex flex-col gap-4 border h-[400px] rounded-xl overflow-y-auto p-2"
    >
      {loading ? (
        <>
          <div className="animate-pulse flex flex-col gap-3 p-4 border rounded-lg">
            <span className="h-6 w-24 bg-slate-300 rounded"></span>
            <span className="h-4 w-16 bg-slate-300 rounded"></span>
          </div>
          <div className="animate-pulse flex flex-col gap-3 p-4 border rounded-lg">
            <span className="h-6 w-24 bg-slate-300 rounded"></span>
            <span className="h-4 w-16 bg-slate-300 rounded"></span>
          </div>
        </>
      ) : (
        items.map((item) => (
          <div
            key={item.word}
            className="cursor-pointer rounded-md p-3 hover:bg-purple-200 border border-transparent hover:border-purple-400"
            onClick={() => onSelect(item.word)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter') onSelect(item.word)
            }}
          >
            <strong className="text-lg">{item.word}</strong>
            <p className="text-sm">{item.phonetic}</p>
          </div>
        ))
      )}
    </div>
  )
}

export default WordsList