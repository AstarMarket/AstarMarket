import { atom, useRecoilValue, useSetRecoilState } from 'recoil'

import Wallet from '~/types/Wallet'

const walletAtom = atom<string>({
  key: 'wallet',
  default: ''
})

export const useWalletState = () => {
  return useRecoilValue(walletAtom)
}

export const useWalletMutators = () => {
  const setWallet = useSetRecoilState(walletAtom)
  return { setWallet }
}
