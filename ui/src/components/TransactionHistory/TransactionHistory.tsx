import type { MarketTransaction } from '@prisma/client'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { useEffect, useState, VFC } from 'react'

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
    if (!marketId) return
    init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [marketId])

  return (
    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
      <table className="w-full min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-50">
          <tr>
            <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-14">
              Account
            </th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Action
            </th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Vote
            </th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Amount
            </th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Date
            </th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Hash
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {marketTransactions.length == 0 ? (
            <tr>
              <td className="text-center whitespace-nowrap px-3 py-4 text-sm text-gray-500"></td>
              <td className="text-center whitespace-nowrap px-3 py-4 text-sm text-gray-500"></td>
              <td className="text-center whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                No Data
              </td>
              <td className="text-center whitespace-nowrap px-3 py-4 text-sm text-gray-500"></td>
            </tr>
          ) : (
            marketTransactions.map((marketTransaction) => {
              return (
                <tr key={marketTransaction.id}>
                  <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-14">
                    {truncate(marketTransaction.account)}
                  </th>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 capitalize">
                    {marketTransaction.action}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {marketTransaction.vote}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {marketTransaction.amount} SBY
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {dayjs
                      .utc(marketTransaction.createdAt)
                      .local()
                      .format('YYYY/MM/DD hh:mm:ss')}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
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
            })
          )}
        </tbody>
      </table>
    </div>
  )
}

export default TransactionHistory
