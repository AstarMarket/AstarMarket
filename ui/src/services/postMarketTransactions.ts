import { MarketTransaction } from '@prisma/client'

import * as request from '~/services/request'

type Data = {
  hash: string
  marketId: string
}

export function postMarketTransactions(data: Data) {
  return request.post<MarketTransaction>('/api/market_transactions', data)
}
