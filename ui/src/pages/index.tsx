import type { NextPage } from 'next'
import SampleCounter from '~/components/organisms/SampleCounter'

const Index: NextPage = () => {
  return (
    <>
      <div className="p-4 font-bold">Hello Tailwind CSS and daisyUI!</div>
      <button className="btn btn-primary">Button</button>
      <SampleCounter />
    </>
  )
}

export default Index
