import { ethers } from 'ethers'
import { useEffect, useState, VFC } from 'react'

import ContractClient from '~/lib/contractClient'
import * as api from '~/services'
import { Vote } from '~/types/vote'

type Props = {
  marketId: string
}

const MarketHistory: VFC<Props> = ({ marketId }) => {
  type HistoryItem = {
    id: string
    account: string
    action: 'buy' | 'sell'
    vote: Vote
    amount: string
    date: Date
    hash: string
  }
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [isLoadingHistory, setIsLoadingHistory] = useState(false)

  useEffect(() => {
    async function init() {
      try {
        if (isLoadingHistory) return
        setIsLoadingHistory(true)
        const transactions = await api.getMarketsMarketIdTransactions(marketId)
        const contractClient = new ContractClient(window)
        const buyerMap = new Map<string, [string, Vote]>()
        const history = await Promise.all(
          transactions.map(async ({ id, hash, createdAt }) => {
            const transaction = await contractClient.provider.getTransaction(
              hash
            )
            const account = transaction.from
            const amount = ethers.utils.formatEther(transaction.value)
            const action =
              amount === '0.0' ? ('sell' as const) : ('buy' as const)
            const vote =
              action === 'buy'
                ? transaction.data.split('').reverse()[0] === '0'
                  ? Vote.Yes
                  : Vote.No
                : Vote.Yes // 仮の値
            let updatedAmount = amount
            let updatedVote = vote
            if (action === 'buy') {
              buyerMap.set(account, [amount, vote])
            } else if (action === 'sell') {
              updatedAmount = buyerMap.get(account)?.[0] ?? '0.0'
              updatedVote = buyerMap.get(account)?.[1] ?? Vote.Yes
              buyerMap.delete(account)
            }
            const date = new Date(createdAt)
            return {
              id,
              account,
              action,
              vote: updatedVote,
              amount: updatedAmount,
              date,
              hash,
            }
          })
        )
        setHistory(history.reverse())
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoadingHistory(false)
      }
    }
    if (!marketId || !window) return
    init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [marketId])

  if (isLoadingHistory) return <div className="animate-pulse">Loading...</div>
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
              <th>
                {`${historyItem.account.slice(
                  0,
                  6
                )}...${historyItem.account.slice(-4)}`}
              </th>
              <td className="capitalize">{historyItem.action}</td>
              <td>{Vote[historyItem.vote]}</td>
              <td>{historyItem.amount} SBY</td>
              <td>{historyItem.date.toLocaleString()}</td>
              <td>
                <a
                  href={`${process.env.SHIBUYA_SUBSCAN_URL}/tx/${historyItem.hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  {`${historyItem.hash.slice(0, 6)}...${historyItem.hash.slice(
                    -4
                  )}`}
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
