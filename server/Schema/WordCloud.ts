import { Schema } from 'mongoose'

const wordCloudSchema = new Schema({
  word: {
    type: String,
    required: true,
  },
})

export default wordCloudSchema
