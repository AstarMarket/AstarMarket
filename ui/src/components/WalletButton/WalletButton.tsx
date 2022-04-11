import { VFC } from 'react'

import { useMetaMask } from '~/hooks/useMetaMask'
import { truncate } from '~/lib/text'

const WalletButton: VFC = () => {
  const {
    hasProvider,
    account,
    connectAccount,
    isShibuyaNetwork,
    isLocalhostNetwork,
    switchToShibuya,
    switchToLocalhost,
    isLoadingChainId,
  } = useMetaMask()
  if (isLoadingChainId) return null
  if (!hasProvider)
    return (
      <a
        href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-error text-white rounded-full"
      >
        Please install MetaMask
      </a>
    )
  return (
    <>
      {isShibuyaNetwork || isLocalhostNetwork ? (
        account ? (
          <div className="bg-accent px-4 py-3 text-white rounded-full">
            {truncate(account)}
          </div>
        ) : (
          <button
            className="btn btn-info text-white rounded-full"
            onClick={() => connectAccount()}
          >
            Connect Wallet
          </button>
        )
      ) : (
        <div className="flex gap-3">
          <button
            className="btn btn-error text-white rounded-full"
            onClick={() => switchToShibuya()}
          >
            Switch to Shibuya
          </button>
          {/* TODO: 様子を見て削除する */}
          <button
            className="btn btn-warning text-white rounded-full"
            onClick={() => switchToLocalhost()}
          >
            Switch to Localhost
          </button>
        </div>
      )}
    </>
  )
}

export default WalletButton
