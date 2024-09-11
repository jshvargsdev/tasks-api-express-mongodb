import { z } from 'zod'

export const TaskSchema = z.object({
  title: z
    .string({
      required_error: 'Title is required',
      invalid_type_error: 'Title must be a string'
    })
    .min(4, { message: 'Title must be at least 4 characters' }),
  description: z
    .string({
      required_error: 'Description is required',
      invalid_type_error: 'Description must be a string'
    })
    .min(2),
  date: z
    .string({
      required_error: 'Date is required',
      invalid_type_error: 'Date must be a date'
    })
    .datetime()
    .optional()
})
