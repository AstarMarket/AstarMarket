import Link from 'next/link'
import type { VFC } from 'react'

import WalletButton from '~/components/WalletButton'

const AppHeader: VFC = () => {
  return (
    <div className="relative max-w-5xl mx-auto bg-white">
      <div className="flex items-center container mx-auto py-6 px-2">
        <Link href="/">
          <a className="text-2xl font-bold">DEMO</a>
        </Link>
        <span className="ml-auto">
          <WalletButton />
        </span>
      </div>
    </div>
  )
}

export default AppHeader
