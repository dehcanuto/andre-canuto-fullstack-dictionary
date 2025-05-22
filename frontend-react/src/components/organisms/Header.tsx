import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../context/authContext'
import UserThumbnail from '../molecules/UserThumbnail'

const Header: React.FC = () => {
  const navigate = useNavigate()
  const authStore = useAuthStore()

  const handleLogout = () => {
    authStore.logout()
    navigate('/signin')
  }

  return (
    <header className="flex py-8 px-4 bg-blue-500">
      <div className="container mx-auto">
        <div className="flex justify-between">
          <h1 className="text-3xl text-white">Dicionary Challenge</h1>
          <div className="flex items-center gap-5">
            <UserThumbnail name={authStore.userName} />
            <button onClick={handleLogout} className="text-lg text-white">
              Sair
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
