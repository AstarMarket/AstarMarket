import { MarketTransaction } from '@prisma/client'

import * as request from '~/services/request'

export function getMarketsMarketIdTransactions(marketId: string) {
  return request.get<MarketTransaction[]>(
    `/api/markets/${marketId}/transactions`
  )
}
