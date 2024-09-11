import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config.js'

export function validateToken(req, res, next) {
  const { token } = req.cookies

  if (!token) return res.status(401).json({ error: 'Unauthorized' })

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Invalid token' })
    req.user = decoded
    next()
  })
}
