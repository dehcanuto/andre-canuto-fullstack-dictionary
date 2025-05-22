import React from 'react'

interface UserThumbnailProps {
  name: string
}

function formatUserName(name: string) {
  // exemplo simples, você pode ajustar conforme seu format
  const parts = name.trim().split(' ')
  if (parts.length === 0) return ''
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[1][0]).toUpperCase()
}

const UserThumbnail: React.FC<UserThumbnailProps> = ({ name }) => {
  return (
    <div className="flex items-center justify-center w-12 h-12 bg-blue-300 rounded-full">
      <span className="font-semibold text-slate-800">{formatUserName(name)}</span>
    </div>
  )
}

export default UserThumbnail