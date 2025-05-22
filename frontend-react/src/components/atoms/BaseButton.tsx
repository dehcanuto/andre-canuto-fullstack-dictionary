import React from 'react'

interface BaseButtonProps {
  label: string
  disabled?: boolean
  onClick?: () => void
}

export const BaseButton: React.FC<BaseButtonProps> = ({ label, disabled, onClick }) => {
  return (
    <button
      type="button"
      className="px-4 py-2 font-semibold text-gray-500 border border-gray-300 hover:bg-gray-100 rounded-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </button>
  )
}
