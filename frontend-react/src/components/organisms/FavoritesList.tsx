import React from 'react'

interface FavoritesListProps {
  favorites: string[]
  onSelect: (word: string) => void
  onRemove: (word: string) => void
}

export const FavoritesList: React.FC<FavoritesListProps> = ({ favorites, onSelect, onRemove }) => {
  if (favorites.length === 0) {
    return <div className="text-center p-4">Nenhuma palavra favorita</div>
  }

  return (
    <ul className="list-disc list-inside p-4 space-y-1">
      {favorites.map((word) => (
        <li key={word} className="flex justify-between items-center">
          <button
            className="text-left text-purple-700 hover:underline flex-grow"
            onClick={() => onSelect(word)}
            type="button"
          >
            {word}
          </button>
          <button
            onClick={() => onRemove(word)}
            className="text-red-600 hover:text-red-800 ml-4"
            aria-label={`Remover ${word} dos favoritos`}
            type="button"
          >
            ✕
          </button>
        </li>
      ))}
    </ul>
  )
}
