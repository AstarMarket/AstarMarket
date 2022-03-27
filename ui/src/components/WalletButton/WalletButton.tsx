import type { VFC } from 'react'

import { useWalletMutators,useWalletState } from '~/state/wallet'

const WalletButton: VFC = () => {
  const Wallet = useWalletState()
  const { setWallet } = useWalletMutators()

  const connect = () => {
    const ethereum = (window as any).ethereum
    if (ethereum) {
      ethereum.request({method: 'eth_requestAccounts'})
        .then((result: Array<string>) => {
          setWallet(result[0])
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
      <button className="btn btn-info text-white rounded-full" onClick={() => connect()}>
        Connect Wallet
      </button>
    )
  }

  const disconnectWalletButton = () => {
    return (
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-info text-white rounded-full">{Wallet.slice(0, 6) + '...' + Wallet.slice(-4)}</label>
        <ul tabIndex={0} className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-52 mt-4">
          <li><a onClick={() => disconnect()}>Disconnect</a></li>
        </ul>
      </div>
    )
  }

  return (
    <>
      {Wallet.length > 0 ? disconnectWalletButton() : connectWalletButton()}
    </>
  )
}

export default WalletButton
