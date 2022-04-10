import type { MarketTransaction } from '@prisma/client'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { useEffect, useState, VFC } from 'react'

import { useMetaMask } from '~/hooks/useMetaMask'
import { truncate } from '~/lib/text'
import * as api from '~/services'

type Props = {
  marketId: string
}

const MarketHistory: VFC<Props> = ({ marketId }) => {
  dayjs.extend(utc)
  const [history, setHistory] = useState<MarketTransaction[]>([])
  const [isLoadingHistory, setIsLoadingHistory] = useState(false)
  const { hasProvider } = useMetaMask()

  useEffect(() => {
    async function init() {
      try {
        if (isLoadingHistory) return
        setIsLoadingHistory(true)
        const transactions = await api.getMarketsMarketIdTransactions(marketId)
        setHistory(transactions.reverse())
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoadingHistory(false)
      }
    }
    if (!marketId || !hasProvider) return
    init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [marketId, hasProvider])

  if (isLoadingHistory) return <div className="animate-pulse">Loading...</div>
  if (!hasProvider)
    return <div>Please install MetaMask to show the market history.</div>
  if (history.length === 0) return <div>No trading history.</div>
  return (
    <table className="table border">
      <thead>
        <tr>
          <th>Account</th>
          <th>Action</th>
          <th>Vote</th>
          <th>Amount</th>
          <th>Date</th>
          <th>Hash</th>
        </tr>
      </thead>
      <tbody>
        {history.map((historyItem) => {
          return (
            <tr key={historyItem.id}>
              <th>{truncate(historyItem.account)}</th>
              <td className="capitalize">{historyItem.action}</td>
              <td>{historyItem.vote}</td>
              <td>{historyItem.amount} SBY</td>
              <td>
                {dayjs
                  .utc(historyItem.createdAt)
                  .local()
                  .format('YYYY/MM/DD hh:mm:ss')}
              </td>
              <td>
                <a
                  href={`${process.env.SHIBUYA_SUBSCAN_URL}/tx/${historyItem.hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  {truncate(historyItem.hash)}
                </a>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default MarketHistory
