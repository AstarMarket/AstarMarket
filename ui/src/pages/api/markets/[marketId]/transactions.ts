import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async function marketsMarketIdTransactions(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET': {
      const marketId = `${req.query.marketId}`
      const result = await prisma.marketTransaction.findMany({
        where: { marketId },
      })
      return res.status(200).json(result)
    }
  }
}
