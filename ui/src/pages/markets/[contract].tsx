import type { Market } from '@prisma/client'
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import ErrorPage from 'next/error'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import BuyForm from '~/components/BuyForm'
import MarketHistory from '~/components/MarketHistory'
import SellForm from '~/components/SellForm'
import { useMetaMask } from '~/hooks/useMetaMask'
import ContractClient from '~/lib/contractClient'
import { prisma } from '~/lib/prisma'

type ServerSideProps = {
  market: Market | null
}

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async (
  context
) => {
  const { contract } = context.query
  const market = await prisma.market.findFirst({
    where: { contract: contract as string },
  })
  return { props: { market } }
}

export default function Index({
  market,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { account, isShibuyaNetwork, isLocalhostNetwork } = useMetaMask()
  const [hasAlreadyBought, setHasAlreadyBought] = useState(false)

  useEffect(() => {
    async function check() {
      // TODO: localhost の処理に関する条件分岐を追加
      const isCorrectNetwork = isShibuyaNetwork || isLocalhostNetwork
      if (!account || !market || !isCorrectNetwork) {
        return
      }
      try {
        const contractClient = new ContractClient(window)
        const res = await contractClient.getPosition(market.contract, account)
        const hasAlreadyBought = !res.amount.isZero()
        setHasAlreadyBought(hasAlreadyBought)
      } catch (error) {
        console.error(error)
      }
    }
    check()
  }, [
    account,
    market,
    setHasAlreadyBought,
    isShibuyaNetwork,
    isLocalhostNetwork,
  ])

  if (!market) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <div className="mt-8">
      <div className="p-5 border rounded">
        <h1 className="font-bold text-xl">{market.title}</h1>
        <div className="mt-4">
          <p className="text-sm text-gray-500">
            Deployed by:&nbsp;
            <Link
              href={`${process.env.SHIBUYA_SUBSCAN_URL}/account/${market.contract}`}
            >
              <a
                className="text-sky-400"
                target="_blank"
                rel="noreferrer noopener"
              >
                {`${market.contract.slice(0, 6)}...${market.contract.slice(
                  -4
                )}`}
              </a>
            </Link>
          </p>
        </div>
      </div>
      <div className="mt-8 grid grid-cols-3 gap-4">
        <div className="col-span-2 border rounded p-5"></div>
        {!hasAlreadyBought ? (
          <BuyForm market={market} />
        ) : (
          <SellForm market={market} />
        )}
      </div>
      <div className="mt-5">
        <MarketHistory marketId={market.id} />
      </div>
    </div>
  )
}
