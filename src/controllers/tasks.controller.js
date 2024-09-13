import * as taskService from '../services/tasks.service.js'

export async function getAllTask(req, res) {
  try {
    const tasks = await taskService.getAllTasks(req.user.id)
    if (tasks.length === 0) return res.status(200).json([])
    res.status(200).json(tasks)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export async function createTask(req, res) {
  const { title, description, date } = req.body
  try {
    const newTask = await taskService.createTask({
      title,
      description,
      date,
      userId: req.user.id
    })
    res.status(201).json(newTask)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export async function getTask(req, res) {
  const { id } = req.params
  try {
    const task = await taskService.getTaskById(id)
    if (!task) return res.status(404).json({ error: 'Task not found' })
    res.status(200).json(task)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export async function updateTask(req, res) {
  try {
    const updatedTask = await taskService.updateTaskById(
      req.params.id,
      req.body
    )
    if (!updatedTask) return res.status(404).json({ error: 'Task not found' })
    res.status(200).json(updatedTask)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export async function deleteTask(req, res) {
  const { id } = req.params
  try {
    const deletedTask = await taskService.deleteTaskById(id)
    if (!deletedTask) return res.status(404).json({ error: 'Task not found' })
    res.status(204).send()
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
