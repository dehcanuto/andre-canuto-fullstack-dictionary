import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../../context/authContext'

type Props = {
  isAuthenticated: boolean
  children: React.ReactNode
}

const ProtectedRoute = ({ children }: Props) => {
    const { isAuthenticated } = useAuthStore()

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />
  }

  return <>{children}</>
}

export default ProtectedRoute
