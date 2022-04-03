import type { InferGetServerSidePropsType } from 'next'
import Link from 'next/link'

import AppHero from '~/components/AppHero'
import { prisma } from '~/lib/prisma'

export const getServerSideProps = async () => {
  const markets = await prisma.market.findMany()
  return { props: { markets } }
}

export default function Index({
  markets,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <AppHero />
      <p className="font-bold mt-8">Popular Markets</p>
      <ul className="grid grid-cols-3 gap-10 mt-4">
        {markets.map((market) => {
          return (
            <Link key={market.id} href={`/markets/${market.contract}`}>
              <a className="p-5 border rounded cursor-pointer hover:border-gray-300">
                {market.title}
              </a>
            </Link>
          )
        })}
      </ul>
    </>
  )
}
