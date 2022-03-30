import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async function tasksIndex(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'POST': {
      type PostData = {
        title: string
      }
      const { title = '' } = req.body as PostData
      const result = await prisma.task.create({
        data: {
          title,
          done: false,
        },
      })
      return res.status(200).json(result)
    }
  }
}
