import type { NextPage } from 'next'
import SampleCounter from '~/components/organisms/SampleCounter'

const Index: NextPage = () => {
  return (
    <div className="container mx-auto p-10">
      <div className="p-4 font-bold">Hello Tailwind CSS and daisyUI!</div>
      <button className="btn btn-primary">Button</button>
      <SampleCounter />
    </div>
  )
}

export default Index
