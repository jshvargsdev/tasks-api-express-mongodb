export function validateSchema(schema) {
  return (req, res, next) => {
    try {
      schema.parse(req.body)

      next()
    } catch (error) {
      const errors = error.issues.map((error) => error.message)

      res.status(400).json({ error: errors })
    }
  }
}
