const calculateWordFrequency = (words: string[]): Map<string, number> => {
  const frequencyMap = new Map<string, number>()

  for (const word of words) {
    const normalizedWord = word.toLowerCase()
    const currentCount = frequencyMap.get(normalizedWord) || 0
    frequencyMap.set(normalizedWord, currentCount + 1)
  }

  return frequencyMap
}

const sentencesToWords = (sentences: string[]): string[] => {
  const words: string[] = []

  for (const sentence of sentences) {
    const sentenceWords = sentence.split(/\s+/)
    words.push(...sentenceWords)
  }

  return words
}

export { calculateWordFrequency, sentencesToWords }
