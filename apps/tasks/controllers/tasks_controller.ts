import type { HttpContext } from '@adonisjs/core/http'

import { inject } from '@adonisjs/core'
import TaskService from '#apps/tasks/services/task_service'
import { storeTaskValidator, updateTaskValidator } from '#apps/tasks/validators/task'
import Task from '#apps/tasks/models/task'

@inject()
export default class TasksController {
  constructor(private taskService: TaskService) {}

  async index(): Promise<Task[]> {
    return this.taskService.getTasks()
  }

  async store({ request }: HttpContext): Promise<Task> {
    const data = await request.validateUsing(storeTaskValidator)
    return this.taskService.createTask(data)
  }

  async update({ params, request }: HttpContext): Promise<Task> {
    const data = await request.validateUsing(updateTaskValidator)

    const task = await this.taskService.getTaskOrFail(params.id)
    return this.taskService.updateTask(task, data)
  }

  async destroy({ params }: HttpContext): Promise<void> {
    const task = await this.taskService.getTaskOrFail(params.id)
    return this.taskService.deleteTask(task)
  }
}
