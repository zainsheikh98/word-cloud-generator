import { Error, connect } from 'mongoose'

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

const { DB_USERNAME, DB_PASSWORD } = process.env || {}
const MONGODB_URI = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@word-cloud.84bnhhu.mongodb.net/`

const connectDB = async () => {
  if (!DB_USERNAME || !DB_PASSWORD) {
    throw new Error('Invalid DB Credentials(Username or Password)')
  }

  if (cached.conn) {
    console.log('🚀 Using cached connection')
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }

    cached.promise = connect(MONGODB_URI!, opts)
      .then((mongoose) => {
        console.log('✅ New connection established')
        return mongoose
      })
      .catch((error) => {
        console.error('❌ Connection to database failed')
        throw new Error(error?.message || '❌ Connection to database failed')
      })
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    throw new Error((e as Error)?.message || '❌ Unable to connect to DB')
  }

  return cached.conn
}

export default connectDB
