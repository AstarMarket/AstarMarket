import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async function transactions(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'POST': {
      type PostData = {
        hash: string
        marketId: string
      }
      const { hash = '', marketId = '' } = req.body as PostData
      const market = await prisma.market.findUnique({ where: { id: marketId } })
      if (!market) {
        return res.status(400).json({ message: 'Market not found.' })
      }
      const result = await prisma.marketTransaction.create({
        data: {
          hash,
          marketId,
        },
      })
      return res.status(200).json(result)
    }
  }
}
