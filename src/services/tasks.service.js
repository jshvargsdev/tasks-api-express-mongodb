import Task from '../models/task.model.js'

export async function getAllTasks(userId) {
  try {
    const tasks = await Task.find({ user: userId })
    return tasks
  } catch (error) {
    throw new Error(error.message)
  }
}

export async function createTask(taskData) {
  try {
    const newTask = new Task({
      title: taskData.title,
      description: taskData.description,
      date: taskData.date,
      user: taskData.userId
    })

    const savedTask = await newTask.save()
    return savedTask
  } catch (error) {
    throw new Error(error.message)
  }
}

export async function getTaskById(taskId) {
  try {
    const task = await Task.findById(taskId)
    return task
  } catch (error) {
    throw new Error(error.message)
  }
}

export async function updateTaskById(taskId, updateData) {
  try {
    const updatedTask = await Task.findByIdAndUpdate(taskId, updateData, {
      new: true
    })
    return updatedTask
  } catch (error) {
    throw new Error(error.message)
  }
}

export async function deleteTaskById(taskId) {
  try {
    const deletedTask = await Task.findByIdAndDelete(taskId)
    return deletedTask
  } catch (error) {
    throw new Error(error.message)
  }
}
