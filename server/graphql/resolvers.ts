import { deleteWordCloud, displayWordCloud } from '@/server/Services'
import { calculateWordFrequency, sentencesToWords } from '@/utils'

const resolvers = {
  Query: {
    words: async () => {
      try {
        const data = await displayWordCloud()
        if (!data?.length) return []
        const words = sentencesToWords(data)
        const wordsWithFrequency = calculateWordFrequency(words)
        const wordsFrequencyList = []

        for (const [word, frequency] of wordsWithFrequency?.entries()) {
          wordsFrequencyList.push({
            word,
            frequency,
          })
        }
        return wordsFrequencyList
      } catch (error) {
        throw new Error((error as Error)?.message)
      }
    },
    deleteWords: async () => {
      try {
        const data = await deleteWordCloud()
        const { deletedCount } = data
        return { deletedCount }
      } catch (error) {
        throw new Error((error as Error)?.message)
      }
    },
  },
}

export default resolvers
