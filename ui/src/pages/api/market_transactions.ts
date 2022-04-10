import type { MarketAction, Vote } from '@prisma/client'
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
        account: string
        amount: string
        action: MarketAction
        vote: Vote
        marketId: string
      }
      const {
        hash = '',
        account,
        amount,
        action,
        vote,
        marketId = '',
      } = req.body as PostData
      const market = await prisma.market.findUnique({ where: { id: marketId } })
      if (!market) {
        return res.status(400).json({ message: 'Market not found.' })
      }
      if (action === 'Sell') {
        const buyTransactions = await prisma.marketTransaction.findMany({
          where: { marketId },
          orderBy: {
            createdAt: 'desc',
          },
        })
        const buyTransaction = buyTransactions[0]
        const result = await prisma.marketTransaction.create({
          data: {
            hash,
            account: buyTransaction.account,
            amount: buyTransaction.amount,
            action,
            vote: buyTransaction.vote,
            marketId,
          },
        })
        return res.status(200).json(result)
      }
      const result = await prisma.marketTransaction.create({
        data: {
          hash,
          account,
          amount,
          action,
          vote,
          marketId,
        },
      })
      return res.status(200).json(result)
    }
  }
}
