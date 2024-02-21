import Task from '../models/task.js'
import { StoreTaskSchema, UpdateTaskSchema } from '#apps/tasks/validators/task'

export default class TaskService {
  async getTasks(): Promise<Task[]> {
    return Task.query().orderBy('created_at', 'asc')
  }

  async getTaskOrFail(uid: string): Promise<Task> {
    return Task.findByOrFail('uid', uid)
  }

  async createTask(schema: StoreTaskSchema): Promise<Task> {
    return Task.create(schema)
  }

  async updateTask(task: Task, schema: UpdateTaskSchema): Promise<Task> {
    return task.merge(schema).save()
  }

  async deleteTask(task: Task): Promise<void> {
    return task.delete()
  }
}
