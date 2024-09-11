import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      trim: true,
      min: 6,
      max: 16
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

export default mongoose.model('User', userSchema)
