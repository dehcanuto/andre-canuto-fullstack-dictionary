
import { useState, useCallback } from 'react'
import { toast } from 'react-toastify'
import api from '../services/api'

export function useHistory() {
  const [history, setHistory] = useState<string[]>([])

  const fetchHistory = useCallback(async () => {
    try {
      const response = await api.get('/user/me/history')
      if (response.status === 200) {
        setHistory(response.data)
      }
    } catch {
      toast.error('Erro ao listar historico')
    }
  }, [])

  return {
    history,
    fetchHistory,
  }
}
