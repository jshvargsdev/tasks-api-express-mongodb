import User from '../models/user.model.js'
import bcrypt from 'bcrypt'
import { createAccessToken } from '../libs/jwt.js'

export async function registerUser(userData) {
  const { username, email, password } = userData

  try {
    const usernameFound = await User.findOne({ username })
    const emailFound = await User.findOne({ email })

    if (usernameFound) {
      throw new Error('El usuario ya existe')
    }

    if (emailFound) {
      throw new Error('El email ya existe')
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const newUser = new User({ username, email, password: passwordHash })
    const userSaved = await newUser.save()
    const token = await createAccessToken({ id: userSaved._id })

    return { user: userSaved, token }
  } catch (error) {
    throw new Error(error.message)
  }
}

export async function loginUser(email, password) {
  try {
    const userFound = await User.findOne({ email })

    if (!userFound) {
      throw new Error('El email o la contraseña son incorrectos')
    }

    const passwordMatch = await bcrypt.compare(password, userFound.password)

    if (!passwordMatch) {
      throw new Error('El email o la contraseña son incorrectos')
    }

    const token = await createAccessToken({ id: userFound._id })

    return { token }
  } catch (error) {
    throw new Error(error.message)
  }
}
