import { Schema } from 'mongoose'

const wordCloudSchema = new Schema({
  word: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
})

export default wordCloudSchema
