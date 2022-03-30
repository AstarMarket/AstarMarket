import { Task } from '@prisma/client'

import * as request from '~/services/request'

type Data = {
  title: string
}

export function postTasks(data: Data) {
  return request.post<Task>('/api/tasks', data)
}
