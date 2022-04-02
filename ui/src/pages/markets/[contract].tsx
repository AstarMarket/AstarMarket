import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'

import { prisma } from '~/lib/prisma'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { contract } = context.query
  const market = await prisma.market.findFirst({
    where: { contract: contract as string },
  })
  return { props: { market } }
}

export default function Index({
  market,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="mt-8">
      <div className="p-5 border rounded">{market.title}</div>
    </div>
  )
}
