import { useCallback } from 'react'
import { atom, useRecoilValue, useSetRecoilState } from 'recoil'
import { recoilPersist } from 'recoil-persist'

import type { SetterOrUpdaterArg } from '~/types/recoil'

const { persistAtom } = recoilPersist({
  key: 'recoil-persist',
  storage: typeof window === 'undefined' ? undefined : window.localStorage,
})

const walletAtom = atom<string>({
  key: 'wallet',
  default: '',
  effects_UNSTABLE: [persistAtom]
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
