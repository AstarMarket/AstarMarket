import type { InferGetServerSidePropsType } from 'next'
import Link from 'next/link'

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
      <p className="font-bold">Popular Markets</p>
      <ul className="grid grid-cols-3 gap-10 mt-4">
        {markets.map((market) => {
          return (
            <Link key={market.id} passHref={true} href={`markets/${market.contract}`}>
              <li className="p-5 border rounded cursor-pointer" key={market.id}>
                {market.title}
              </li>
            </Link>
          )
        })}
      </ul>
    </>
  )
}
