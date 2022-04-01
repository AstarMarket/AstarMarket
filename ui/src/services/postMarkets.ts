import { Market } from '@prisma/client'

import * as request from '~/services/request'

type Data = {
  title: string,
  contract: string,
}

export function postMarkets(data: Data) {
  return request.post<Market>('/api/markets', data)
}
