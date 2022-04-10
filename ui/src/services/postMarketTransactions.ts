import type { MarketAction, MarketTransaction, Vote } from '@prisma/client'

import * as request from '~/services/request'

type Data = {
  hash: string
  action: MarketAction
  marketId: string
  account?: string
  amount?: string
  vote?: Vote
}

export function postMarketTransactions(data: Data) {
  return request.post<MarketTransaction>('/api/market_transactions', data)
}
