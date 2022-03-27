import type { VFC, ReactNode } from 'react'

import AppHeader from '~/components/AppHeader'

type DefaultLayoutProps = {
  children: ReactNode
}

const DefaultLayout: VFC<DefaultLayoutProps> = ({ children }) => {
  return (
    <>
      <AppHeader />
      <div className="container p-5 mx-auto">{children}</div>
    </>
  )
}

export default DefaultLayout
