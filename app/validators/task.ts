import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

export const storeTaskValidator = vine.compile(
  vine.object({
    uid: vine.string().uuid(),
    content: vine.string(),
    isComplete: vine.boolean(),
  })
)

export const updateTaskValidator = vine.compile(
  vine.object({
    content: vine.string().optional(),
    isComplete: vine.boolean().optional(),
  })
)

export type StoreTaskSchema = Infer<typeof storeTaskValidator>
export type UpdateTaskSchema = Infer<typeof updateTaskValidator>
