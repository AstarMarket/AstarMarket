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

const TransactionHistory: VFC<Props> = ({ marketId }) => {
  dayjs.extend(utc)
  const [marketTransactions, setMarketTransactions] = useState<
    MarketTransaction[]
  >([])
  const [isLoadingHistory, setIsLoadingHistory] = useState(false)
  const { hasProvider } = useMetaMask()

  useEffect(() => {
    async function init() {
      try {
        if (isLoadingHistory) return
        setIsLoadingHistory(true)
        const transactions = await api.getMarketsMarketIdTransactions(marketId)
        setMarketTransactions(transactions)
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
    return <div>Please install MetaMask to show the market transactions.</div>
  if (marketTransactions.length === 0) return <div>No market transactions.</div>
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
        {marketTransactions.map((marketTransaction) => {
          return (
            <tr key={marketTransaction.id}>
              <th>{truncate(marketTransaction.account)}</th>
              <td className="capitalize">{marketTransaction.action}</td>
              <td>{marketTransaction.vote}</td>
              <td>{marketTransaction.amount} SBY</td>
              <td>
                {dayjs
                  .utc(marketTransaction.createdAt)
                  .local()
                  .format('YYYY/MM/DD hh:mm:ss')}
              </td>
              <td>
                <a
                  href={`${process.env.SHIBUYA_SUBSCAN_URL}/tx/${marketTransaction.hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  {truncate(marketTransaction.hash)}
                </a>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default TransactionHistory
