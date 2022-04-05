import { useCallback } from 'react'
import { atom, useRecoilValue, useSetRecoilState } from 'recoil'

import type { SetterOrUpdaterArg } from '~/types/recoil'

const walletAtom = atom<string>({
  key: 'wallet',
  default: '',
})

export const useWalletState = () => {
  return useRecoilValue(walletAtom)
}

export const useWalletMutators = () => {
  const setState = useSetRecoilState(walletAtom)
  const setWallet = useCallback(
    (wallet: SetterOrUpdaterArg<string>) => setState(wallet),
    [setState]
  )

  return { setWallet }
}
