import type { Market } from '@prisma/client'
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import ErrorPage from 'next/error'
import Link from 'next/link'
import { useState } from 'react'

import BuyForm from '~/components/BuyForm'
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
              href={
                process.env.SHIBUYA_SUBSCAN_URL + '/account/' + market.contract
              }
            >
              <a
                className="text-sky-400"
                target="_blank"
                rel="noreferrer noopener"
              >
                {market.contract.slice(0, 6) +
                  '...' +
                  market.contract.slice(-4)}
              </a>
            </Link>
          </p>
        </div>
      </div>
      <BuyForm market={market} />
    </div>
  )
}
