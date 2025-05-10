import { DictionaryEntry } from '@/models/ dictionary'
import axios from 'axios'

const BASE_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en'
const ALL_WORDS = 'https://github.com/meetDeveloper/freeDictionaryAPI/blob/master/meta/wordList/english.txt'

export async function fetchWordDefinition(word: string): Promise<DictionaryEntry[]> {
  try {
    const response = await axios.get<DictionaryEntry[]>(`${BASE_URL}/${word}`)
    return response.data[0]
  } catch (error: any) {
    console.error(`Erro ao buscar definição para "${word}":`, error)
    throw new Error('Palavra não encontrada ou erro na requisição.')
  }
}
