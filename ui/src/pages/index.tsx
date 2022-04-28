import { Market, MarketTransaction } from '@prisma/client'
import dayjs from 'dayjs'
import type { InferGetServerSidePropsType } from 'next'
import Link from 'next/link'

import AppHero from '~/components/AppHero'
import { prisma } from '~/lib/prisma'

export const getServerSideProps = async () => {
  const markets = await prisma.market.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      transactions: {
        select: {
          amount: true,
        },
      },
    },
  })
  return { props: { markets } }
}

export default function Index({
  markets,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const isNew = (market: Market) => {
    return dayjs().subtract(3, 'day').isBefore(dayjs(market.createdAt))
  }

  const marketVolume = (marketTransactions: Pick<MarketTransaction, 'amount'>[]) => {
    const sum = marketTransactions.reduce((sum, history) => {
      return sum + Number(history.amount)
    }, 0)

    return Math.round(sum * 100) / 100
  }

  return (
    <>
      <AppHero />
      <p className="font-bold mt-8">Popular Markets</p>
      <ul className="grid grid-cols-3 gap-6 mt-4 mb-8">
        {markets.map((market) => {
          return (
            <Link key={market.id} href={`/markets/${market.contract}`}>
              <a className="flex flex-col p-5 border rounded cursor-pointer hover:border-gray-300">
                <div className="flex">
                  <span className="mr-2">{market.title}</span>
                  {isNew(market) && (
                    <span className="p-1 text-green-400 bg-green-100 rounded ml-auto h-8 w-12 text-center">
                      New
                    </span>
                  )}
                </div>
                <div className="mt-6">
                  <p className="text-xs text-gray-500">Volume</p>
                  <p className="text-sm mt-2">
                    {marketVolume(market.transactions)}
                    &nbsp;SBY
                  </p>
                </div>
              </a>
            </Link>
          )
        })}
      </ul>
    </>
  )
}
