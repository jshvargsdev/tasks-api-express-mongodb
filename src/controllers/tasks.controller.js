import Task from '../models/task.model.js'

export async function getAllTask(req, res) {
  try {
    const tasks = await Task.find({ user: req.user.id })

    if (tasks.length === 0) return res.status(200).json([])

    res.status(200).json(tasks)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export async function createTask(req, res) {
  const { title, description, date } = req.body

  try {
    const newTask = new Task({
      title,
      description,
      date,
      user: req.user.id
    })

    const savedTask = await newTask.save()

    res.status(201).json(savedTask)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export async function getTask(req, res) {
  const { id } = req.params

  try {
    const task = await Task.findById(id)

    if (!task) return res.status(404).json({ error: 'Task not found' })

    res.status(200).json(task)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export async function updateTask(req, res) {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })

    if (!task) return res.status(404).json({ error: 'Task not found' })

    res.status(200).json(task)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export async function deleteTask(req, res) {
  const { id } = req.params

  try {
    const taskFound = await Task.findById(id)
    if (!taskFound) return res.status(404).json({ error: 'Task not found' })

    await Task.findByIdAndDelete(id)

    res.status(204)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
