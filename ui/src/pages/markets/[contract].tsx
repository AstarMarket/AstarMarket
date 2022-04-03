import type { Market } from '@prisma/client'
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import ErrorPage from 'next/error'
import Link from 'next/link'
import { useState } from 'react'

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
  const [isCheckedYes, setIsCheckedYes] = useState(true)
  const [isCheckedNo, setIsCheckedNo] = useState(false)
  const buy = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault()
    // TODO
  }

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
      <form className="mt-8 grid grid-cols-3 gap-4">
        <div className="col-span-2 border rounded p-5"></div>
        <div className="border rounded p-5">
          <span className="text-md">Pick outcome</span>
          <div className="mt-2 grid grid-cols-2 gap-4">
            <input
              id="yes"
              className='hidden'
              type="checkbox"
              checked={isCheckedYes}
              onChange={() => {
                setIsCheckedYes(!isCheckedYes)
                setIsCheckedNo(!isCheckedNo)
              }}
            />
            <label
              className={`p-4 rounded ${isCheckedYes ? 'bg-green-500 text-white' : 'bg-gray-100 text-black'}`}
              htmlFor="yes"
            >
              Yes
            </label>
            <input
              id="no"
              className="hidden"
              type="checkbox"
              checked={isCheckedNo}
              onChange={() => {
                setIsCheckedYes(!isCheckedYes)
                setIsCheckedNo(!isCheckedNo)
              }}
            />
            <label
              className={`p-4 rounded ${isCheckedNo ? 'bg-green-500 text-white' : 'bg-gray-100 text-black'}`}
              htmlFor="no"
            >
              No
            </label>
          </div>
          <div className="form-control my-4">
            <span className="text-md">Amount</span>
            <label className="mt-2 input-group">
              <input
                type="text"
                placeholder="10"
                className="input input-bordered w-full"
              />
              <span>USD</span>
            </label>
          </div>
          <button type="submit" onClick={buy} className="btn btn-primary text-white w-full">
            Buy
          </button>
        </div>
      </form>
    </div>
  )
}
