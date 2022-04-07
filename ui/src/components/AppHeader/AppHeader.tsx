import Link from 'next/link'
import type { VFC } from 'react'

import WalletButton from '~/components/WalletButton'

const AppHeader: VFC = () => {
  return (
    <div className="relative max-w-5xl mx-auto bg-white">
      <div
        className="flex items-center container mx-auto py-6 px-2"
        style={{ minHeight: '96px' }}
      >
        <Link href="/">
          <a className="text-2xl font-bold mr-5">DEMO</a>
        </Link>
        <span className="ml-auto flex items-center gap-5">
          <Link href="/markets/new">
            <a className="btn btn-outline">Add market</a>
          </Link>
          <WalletButton />
        </span>
      </div>
    </div>
  )
}

export default AppHeader
