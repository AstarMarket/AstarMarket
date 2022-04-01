import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async function markets(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'POST': {
      type PostData = {
        title: string,
        contract: string,
      }
      const { title = '', contract = '' } = req.body as PostData
      const result = await prisma.market.create({
        data: {
          title,
          contract,
        },
      })
      return res.status(200).json(result)
    }
  }
}
