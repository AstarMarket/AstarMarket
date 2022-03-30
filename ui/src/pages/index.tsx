import type { InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import type { FormEvent } from 'react'
import { useState } from 'react'

import SampleCounter from '~/components/organisms/SampleCounter'
import { prisma } from '~/lib/prisma'
import * as api from '~/services'

export const getServerSideProps = async () => {
  const markets = await prisma.market.findMany()
  return { props: { markets } }
}

export default function Index({
  markets,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter()
  const [marketTitle, setMarketTitle] = useState('')
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const res = await api.postMarkets({ title: marketTitle })
    console.log(res)
    router.reload() // タスク一覧の更新が面倒なのでリロードしてごまかしている
  }
  return (
    <>
      <div className="p-4 font-bold">Hello Tailwind CSS and daisyUI!</div>
      <button className="btn btn-primary">Button</button>
      <SampleCounter />
      <hr />
      <div className="p-5 border rounded">
        <p>Markets</p>
        <ul>
          {markets.map((market) => {
            return <li key={market.id}>・{market.title}</li>
          })}
        </ul>
        <form onSubmit={handleSubmit} className="mt-5">
          <input
            type="text"
            placeholder="type your market title ..."
            className="input input-bordered input-sm mr-2"
            value={marketTitle}
            onChange={(e) => setMarketTitle(e.target.value)}
          />
          <button className="btn btn-sm">Add</button>
        </form>
      </div>
    </>
  )
}
