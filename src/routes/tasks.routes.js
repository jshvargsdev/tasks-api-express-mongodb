import { Router } from 'express'
import { validateToken } from '../middlewares/validateToken.js'
import {
  getAllTask,
  createTask,
  getTask,
  updateTask,
  deleteTask
} from '../controllers/tasks.controller.js'
import { validateSchema } from '../middlewares/validateSchema.js'
import { TaskSchema } from '../schemas/task.schema.js'

const router = Router()

router.get('/tasks', validateToken, getAllTask)

router.post('/tasks', validateToken, validateSchema(TaskSchema), createTask)

router.get('/tasks/:id', validateToken, getTask)

router.patch('/tasks/:id', validateToken, updateTask)

router.delete('/tasks/:id', validateToken, deleteTask)

export default router
