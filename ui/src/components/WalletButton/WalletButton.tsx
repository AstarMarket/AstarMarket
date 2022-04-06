import { useEffect, useState, VFC } from 'react'

import { useWalletMutators, useWalletState } from '~/state/wallet'

const WalletButton: VFC = () => {
  const wallet = useWalletState()
  const { setWallet } = useWalletMutators()
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    setConnected(wallet.length > 0)
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: any) => {
        if (accounts.length > 0) setWallet(accounts[0])
      })
      window.ethereum.on('chainChanged', () => {
        window.location.reload()
      })
    }
  }, [wallet, setWallet])

  const connect = async () => {
    if (window.ethereum) {
      try {
        const result = await window.ethereum.request<string[]>({
          method: 'eth_requestAccounts',
        })
        if (result?.[0]) setWallet(result[0])
      } catch (e) {
        console.log(e)
      }
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

  return <>{connected ? walletDropdown() : connectWalletButton()}</>
}

export default WalletButton
