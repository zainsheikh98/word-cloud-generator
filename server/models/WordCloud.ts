import mongoose from 'mongoose'
import { wordCloudSchema } from '@/server/Schema'
const { model, models } = mongoose

const WordCloud = models.WordCloud || model('WordCloud', wordCloudSchema)

export default WordCloud
