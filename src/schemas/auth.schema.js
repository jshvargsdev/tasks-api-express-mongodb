import { z } from 'zod'

export const registerSchema = z.object({
  username: z
    .string({
      required_error: 'El usuario es requerido',
      invalid_type_error: 'El usuario debe ser un string'
    })
    .min(4, { message: 'El usuario debe ser entre 4 y 16 caracteres' })
    .max(16, { message: 'El usuario debe ser entre 4 y 16 caracteres' }),
  email: z
    .string({
      required_error: 'El email es requerido'
    })
    .email({
      message: 'El email debe ser un email valido'
    }),
  password: z
    .string({
      required_error: 'La contraseña es requerida',
      invalid_type_error: 'La contraseña debe ser un string'
    })
    .min(8, { message: 'La contraseña debe ser entre 8 y 16 caracteres' })
})

export const loginSchema = z.object({
  email: z.string({ required_error: 'El email es requerido' }).email({
    message: 'El email debe ser un email valido'
  }),
  password: z
    .string({
      required_error: 'El password es requerido',
      invalid_type_error: 'El password debe ser un string'
    })
    .min(8, { message: 'El password debe ser entre 8 y 16 caracteres' })
})
