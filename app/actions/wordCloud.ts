'use server'

import { AddToWordCloud } from '@/server/Services'
import { revalidatePath } from 'next/cache'

const AddToWordCloudAction = async ({
  word,
  path,
}: {
  word: string
  path: string
}) => {
  try {
    const response = await AddToWordCloud(word)
    revalidatePath(path)
    return response
  } catch (error) {
    return { error: (error as Error)?.message }
  }
}

export { AddToWordCloudAction }
