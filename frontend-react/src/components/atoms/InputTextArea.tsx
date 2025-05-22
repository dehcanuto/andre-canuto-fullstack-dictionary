import React from 'react'

interface InputTextAreaProps {
  label: string
  value: string
  onChange: (value: string) => void
  rows?: number
  disabled?: boolean
}

export const InputTextArea: React.FC<InputTextAreaProps> = ({
  label,
  value,
  onChange,
  rows = 4,
  disabled = false,
}) => {
  return (
    <div className="flex flex-col">
      <label className="mb-1 font-medium">{label}</label>
      <textarea
        rows={rows}
        className="border rounded px-3 py-2 resize-none disabled:bg-gray-100"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      />
    </div>
  )
}
