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
  phonetics: {
    text?: string
    audio?: string
  }[]
  meanings: DictionaryMeaning[]
}
