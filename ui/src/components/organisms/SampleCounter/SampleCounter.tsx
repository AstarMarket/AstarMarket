import type { VFC } from 'react'

import { useCounterMutators,useCounterState } from '~/state/counter'

const SampleCounter: VFC = () => {
  const counter = useCounterState()
  const { setCounter } = useCounterMutators()
  return (
    <div className="border rounded p-4 flex flex-col gap-4 w-52">
      <div>Count: {counter}</div>
      <button className="btn" onClick={() => setCounter((p) => p + 1)}>
        +1
      </button>
      <button className="btn" onClick={() => setCounter((p) => p - 1)}>
        -1
      </button>
    </div>
  )
}

export default SampleCounter
