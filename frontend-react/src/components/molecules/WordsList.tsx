import React, { useRef, useEffect, useCallback } from 'react'

export interface DictionaryEntry {
  word: string
}

interface WordsListProps {
  items?: (DictionaryEntry | string)[]
  loading: boolean
  onSelect: (word: DictionaryEntry | string) => void
  onLoadMore?: () => void
}

const WordsList: React.FC<WordsListProps> = ({ items = [], loading, onSelect, onLoadMore }) => {
  const scrollContainer = useRef<HTMLDivElement>(null)
  const lastScrollTop = useRef(0)
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null)

  const handleScroll = useCallback(() => {
    if (!scrollContainer.current) return

    const el = scrollContainer.current
    const scrollTop = el.scrollTop
    const isScrollingDown = scrollTop > lastScrollTop.current
    lastScrollTop.current = scrollTop
    const isAtBottom = scrollTop + el.clientHeight >= el.scrollHeight - 10

    if (isScrollingDown && isAtBottom) {
      if (debounceTimeout.current) return

      debounceTimeout.current = setTimeout(() => {
        onLoadMore?.()
        debounceTimeout.current = null
      }, 300)
    }
  }, [onLoadMore])

  useEffect(() => {
    const el = scrollContainer.current
    if (!el) return
    el.addEventListener('scroll', handleScroll)
    return () => el.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  useEffect(() => {
    console.log('items', items)
  }, [])

  return (
    <div
      ref={scrollContainer}
      className="h-96 overflow-y-scroll scroll-visible"
    >
      <div className="grid grid-cols-6 gap-2 p-2 text-center">
        {items.length ? (
          items.map((word, index) => {
            const displayWord = typeof word === 'string' ? word : word.word
            return (
              <button
                key={index}
                className="bg-white border border-slate-300 py-2 cursor-pointer rounded hover:bg-slate-100"
                onClick={() => onSelect(word)}
                type="button"
              >
                {displayWord}
              </button>
            )
          })
        ) : (
          <span className="col-span-2">Sem palavras registradas.</span>
        )}
      </div>
    </div>
  )
}

export default WordsList
