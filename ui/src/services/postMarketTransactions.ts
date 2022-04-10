import type { MarketTransaction, Vote } from '@prisma/client'

import * as request from '~/services/request'

type Data =
  | {
      action: 'Buy'
      hash: string
      marketId: string
      account: string
      amount: string
      vote: Vote
    }
  | {
      action: 'Sell'
      hash: string
      marketId: string
      account: string
    }

export function postMarketTransactions(data: Data) {
  return request.post<MarketTransaction>('/api/market_transactions', data)
}
