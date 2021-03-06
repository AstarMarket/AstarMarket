import type { MetaMaskInpageProvider } from '@metamask/providers'
import { ethers } from 'ethers'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { localhostChainId, shibuyaChainId } from '~/constants'

export const useMetaMask = () => {
  const [provider, setProvider] = useState<MetaMaskInpageProvider | null>(null)
  const [isShibuyaNetwork, setIsShibuyaNetwork] = useState(false)
  const [isLocalhostNetwork, setIsLocalhostNetwork] = useState(false)
  const [chainId, setChainId] = useState<number | null>(null)
  const [account, setAccount] = useState<string | null>(null)
  const [isLoadingChainId, setIsLoadingChainId] = useState(false)
  const [isLoadingAccount, setIsLoadingAccount] = useState(false)
  const hasProvider = useMemo(() => !!provider, [provider])

  useEffect(() => {
    const metaMaskProvider =
      // @ts-expect-error
      window?.ethereum?.providers?.find((p: any) => p.isMetaMask)
        ? // @ts-expect-error
          window?.ethereum?.providers?.find((p: any) => p.isMetaMask)
        : window?.ethereum?.isMetaMask
        ? window?.ethereum
        : null
    if (!metaMaskProvider) return
    setProvider(metaMaskProvider)

    function handleChainChanged(_chainId: any) {
      setIsLoadingChainId(true)
      const formattedChainId = Number(_chainId)
      setChainId(formattedChainId)
      setIsShibuyaNetwork(shibuyaChainId === formattedChainId)
      setIsLocalhostNetwork(localhostChainId === formattedChainId)
      setIsLoadingChainId(false)
    }

    function handleAccountsChanged(accounts: any) {
      setIsLoadingAccount(true)
      if (accounts.length > 0) setAccount(accounts[0] ?? null)
      setIsLoadingAccount(false)
    }

    metaMaskProvider.on('chainChanged', handleChainChanged)
    metaMaskProvider.on('accountsChanged', handleAccountsChanged)
    return () => {
      if (metaMaskProvider?.off) {
        metaMaskProvider.off('chainChanged', handleChainChanged)
        metaMaskProvider.off('accountsChanged', handleAccountsChanged)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    async function checkChainId() {
      if (!provider) return
      setIsLoadingChainId(true)
      const _chainId = await provider.request<string>({
        method: 'eth_chainId',
      })
      const formattedChainId = Number.isNaN(Number(_chainId))
        ? null
        : Number(_chainId)
      setChainId(formattedChainId)
      setIsShibuyaNetwork(shibuyaChainId === formattedChainId)
      setIsLocalhostNetwork(localhostChainId === formattedChainId)
      setIsLoadingChainId(false)
    }

    async function fetchAccount() {
      if (!provider) return
      setIsLoadingAccount(true)
      const _accounts = await provider.request<string[]>({
        method: 'eth_requestAccounts',
      })
      if (_accounts?.[0]) setAccount(_accounts?.[0])
      setIsLoadingAccount(false)
    }

    checkChainId()
    fetchAccount()
  }, [provider])

  const connectAccount = useCallback(async () => {
    if (!provider) return
    const _accounts = await provider.request<string[]>({
      method: 'eth_requestAccounts',
    })
    if (_accounts?.[0]) setAccount(_accounts?.[0])
  }, [setAccount, provider])

  const switchToShibuya = useCallback(async () => {
    if (!provider) return
    await provider.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: ethers.utils.hexlify(shibuyaChainId) }],
    })
  }, [provider])

  const switchToLocalhost = useCallback(async () => {
    if (!provider) return
    await provider.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: ethers.utils.hexlify(localhostChainId) }],
    })
  }, [provider])

  return {
    hasProvider,
    chainId,
    account,
    connectAccount,
    isShibuyaNetwork,
    isLocalhostNetwork,
    isLoadingChainId,
    isLoadingAccount,
    switchToShibuya,
    switchToLocalhost,
  }
}
