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
      <div className="max-w-5xl mx-auto">{children}</div>
    </>
  )
}

export default DefaultLayout
