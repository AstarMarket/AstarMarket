import type { ReactNode, VFC } from 'react'

import AppHeader from '~/components/AppHeader'

type DefaultLayoutProps = {
  children: ReactNode
}

const DefaultLayout: VFC<DefaultLayoutProps> = ({ children }) => {
  return (
    <>
      <div className="border-b">
        <AppHeader />
      </div>
      <div className="max-w-5xl mx-auto pb-10">{children}</div>
    </>
  )
}

export default DefaultLayout
