import { Market } from '@prisma/client'
import type { FormEvent } from 'react'
import { useState, VFC } from 'react'

import { useMetaMask } from '~/hooks/useMetaMask'
import ContractClient from '~/lib/contractClient'

interface Props {
  market: Market
}

const SellForm: VFC<Props> = ({ market }) => {
  const { account } = useMetaMask()
  const [isProcessingSell, setIsProcessingSell] = useState(false)

  async function handleSell(e: FormEvent<HTMLFormElement>, market: Market) {
    try {
      e.preventDefault()
      if (isProcessingSell || !account) return
      setIsProcessingSell(true)
      const contractClient = new ContractClient(window)
      await contractClient.sell(market.contract, account)
      alert('The sell has been completed.')
      window.location.reload()
    } catch (error) {
      console.error(error)
    } finally {
      setIsProcessingSell(false)
    }
  }
  return (
    <form
      className="border rounded p-5"
      onSubmit={(e) => handleSell(e, market)}
    >
      <div className="mb-4">
        You can sell your position by clicking on the button below.
      </div>
      <button
        className={`btn btn-primary text-white w-full ${
          isProcessingSell && 'loading'
        }`}
        type="submit"
        disabled={isProcessingSell}
      >
        {!isProcessingSell ? 'Sell' : 'Loading...'}
      </button>
    </form>
  )
}

export default SellForm
