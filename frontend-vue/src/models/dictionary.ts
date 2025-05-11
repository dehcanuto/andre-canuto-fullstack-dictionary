export interface DictionaryMeaning {
  partOfSpeech: string
  definitions: {
    definition: string
    example?: string
    synonyms?: string[]
    antonyms?: string[]
  }[]
}

export interface DictionaryEntry {
  word: string
  phonetic?: string
  phonetics?: Array<{
    text?: string
    audio?: string
    sourceUrl?: string
    license?: {
      name: string
      url: string
    }
  }>
  meanings?: Array<{
    partOfSpeech: string
    definitions: Array<{
      definition: string
      example?: string
      synonyms?: string[]
      antonyms?: string[]
    }>
    synonyms?: string[]
    antonyms?: string[]
  }>
  license?: {
    name: string
    url: string
  }
  sourceUrls?: string[]
}
