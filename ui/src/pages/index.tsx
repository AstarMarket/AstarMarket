import type { InferGetServerSidePropsType, NextPage } from 'next'
import { useRouter } from 'next/router'
import type { FormEvent } from 'react'
import { useState } from 'react'

import SampleCounter from '~/components/organisms/SampleCounter'
import { prisma } from '~/lib/prisma'
import * as api from '~/services'

export const getServerSideProps = async () => {
  const tasks = await prisma.task.findMany()
  return { props: { tasks } }
}

export default function Index({
  tasks,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter()
  const [task, setTask] = useState('')
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const res = await api.postTasks({ title: task })
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
        <p>Tasks</p>
        <ul>
          {tasks.map((task) => {
            return <li key={task.id}>・{task.title}</li>
          })}
        </ul>
        <form onSubmit={handleSubmit} className="mt-5">
          <input
            type="text"
            placeholder="type your task ..."
            className="input input-bordered input-sm mr-2"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button className="btn btn-sm">Add</button>
        </form>
      </div>
    </>
  )
}
