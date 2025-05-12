import { DictionaryEntry } from '@/models/dictionary'
import api from './api'

const API_URL = 'http://localhost:3000'

export async function fetchWordDefinition(word: string): Promise<DictionaryEntry[]> {
  try {
    const response = await api.get<DictionaryEntry[]>(`${API_URL}/entries/en/${word}`)
    return response.data[0]
  } catch (error: any) {
    console.error(`Erro ao buscar definição para "${word}":`, error)
    throw new Error('Palavra não encontrada ou erro na requisição.')
  }
}
