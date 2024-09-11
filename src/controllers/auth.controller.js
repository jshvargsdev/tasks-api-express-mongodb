import User from '../models/user.model.js'
import bcrypt from 'bcrypt'
import { createAccessToken } from '../libs/jwt.js'

export async function register(req, res) {
  const { username, email, password } = req.body

  try {
    const usernameFound = await User.findOne({ username })
    const emailFound = await User.findOne({ email })

    if (usernameFound)
      return res.status(400).json({ error: 'El usuario ya existe' })

    if (emailFound) return res.status(400).json({ error: 'El email ya existe' })

    const passwordHash = await bcrypt.hash(password, 10)

    const newUser = new User({ username, email, password: passwordHash })

    const userSaved = await newUser.save()
    const token = await createAccessToken({ id: userSaved._id })
    res.cookie('token', token)

    res.status(201).json({
      user: {
        id: userSaved._id,
        username: userSaved.username,
        email: userSaved.email,
        createdAt: userSaved.createdAt,
        updatedAt: userSaved.updatedAt
      },
      token
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export async function login(req, res) {
  const { email, password } = req.body

  try {
    const userFound = await User.findOne({ email })

    if (!userFound) {
      return res
        .status(400)
        .json({ error: 'El email o la contraseña son incorrectos' })
    }

    const passwordMatch = await bcrypt.compare(password, userFound.password)

    if (!passwordMatch) {
      return res
        .status(400)
        .json({ error: 'El email o la contraseña son incorrectos' })
    }

    const token = await createAccessToken({ id: userFound._id })

    res.cookie('token', token)
    res.status(200).json({ message: 'Login successful', token })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export function logout(req, res) {
  res.clearCookie('token')
  res.status(200).json({ message: 'Logout successful' })
}

export async function profile(req, res) {
  const { id } = req.user
  try {
    const userFound = await User.findById(id)

    if (!userFound) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.status(200).json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
