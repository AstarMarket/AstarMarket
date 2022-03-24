import type { VFC, ReactNode } from 'react'

type DefaultLayoutProps = {
  children: ReactNode
}

const DefaultLayout: VFC<DefaultLayoutProps> = ({ children }) => {
  return <div className="container p-5 mx-auto">{children}</div>
}

export default DefaultLayout
