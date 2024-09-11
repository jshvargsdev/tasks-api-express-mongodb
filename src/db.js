import mongoose from 'mongoose'
import { MONGO_URL } from './config.js'

export async function connectDB() {
  try {
    await mongoose.connect(MONGO_URL)
    console.log('MongoDB connected')
  } catch (error) {
    console.log(error)
  }
}
