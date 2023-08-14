import { WordCloud } from '@/server/models'
import connectDB from '@/server/DB'
import { Error } from 'mongoose'

const displayWordCloud = async () => {
  try {
    await connectDB()
    const words = await WordCloud.find()

    const mappedWords = words.map((word) => word.word)
    return mappedWords
  } catch (error) {
    throw new Error((error as Error)?.message)
  }
}

const AddToWordCloud = async (word: string) => {
  try {
    await connectDB()
    const savedWord = await WordCloud.create({ word })
    return savedWord
  } catch (error) {
    throw new Error((error as Error)?.message)
  }
}

const deleteWordCloud = async () => {
  try {
    await connectDB()
    const words = await WordCloud.deleteMany({})
    return words
  } catch (error) {
    throw new Error((error as Error)?.message)
  }
}

export { AddToWordCloud, displayWordCloud, deleteWordCloud }
