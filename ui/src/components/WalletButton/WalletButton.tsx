import type { VFC } from 'react'

import { useWalletMutators, useWalletState } from '~/state/wallet'

const WalletButton: VFC = () => {
  const wallet = useWalletState()
  const { setWallet } = useWalletMutators()

  const connect = () => {
    if (window.ethereum) {
      window.ethereum
        .request<string[]>({ method: 'eth_requestAccounts' })
        .then((result) => {
          if (result?.[0]) {
            setWallet(result[0])
          }
        })
    } else {
      // TODO: error
    }
  }

  const disconnect = () => {
    setWallet('')
  }

  const connectWalletButton = () => {
    return (
      <button
        className="btn btn-info text-white rounded-full"
        onClick={() => connect()}
      >
        Connect Wallet
      </button>
    )
  }

  const walletDropdown = () => {
    return (
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-info text-white rounded-full">
          {wallet.slice(0, 6) + '...' + wallet.slice(-4)}
        </label>
        <ul
          tabIndex={0}
          className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-52 mt-4"
        >
          <li>
            <a onClick={() => disconnect()}>Disconnect</a>
          </li>
        </ul>
      </div>
    )
  }

  return <>{wallet.length > 0 ? walletDropdown() : connectWalletButton()}</>
}

export default WalletButton
