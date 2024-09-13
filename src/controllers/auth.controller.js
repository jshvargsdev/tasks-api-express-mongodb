import * as authService from '../services/auth.service.js'

export async function register(req, res) {
  const { username, email, password } = req.body

  try {
    const { user, token } = await authService.registerUser({
      username,
      email,
      password
    })

    res.cookie('token', token)

    res.status(201).json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
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
    const { token } = await authService.loginUser(email, password)

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
    const userFound = await authService.getUserProfile(id)

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
