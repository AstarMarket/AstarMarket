import { atom, useRecoilValue, useSetRecoilState } from 'recoil'

const counterAtom = atom<number>({
  key: 'counter',
  default: 0,
})

export const useCounterState = () => {
  return useRecoilValue(counterAtom)
}

export const useCounterMutators = () => {
  const setCounter = useSetRecoilState(counterAtom)
  return { setCounter }
}
