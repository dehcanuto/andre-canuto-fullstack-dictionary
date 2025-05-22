import React from 'react'

type NotificationType = 'success' | 'error' | 'info'

interface NotificationProps {
  message: string
  type?: NotificationType
}

export const Notification: React.FC<NotificationProps> = ({
  message,
  type = 'info',
}) => {
  let bgColor = 'bg-blue-100 text-blue-800'
  if (type === 'success') bgColor = 'bg-green-100 text-green-800'
  if (type === 'error') bgColor = 'bg-red-100 text-red-800'

  return (
    <div
      role="alert"
      className={`p-3 rounded-md border ${bgColor} border-current`}
    >
      {message}
    </div>
  )
}
