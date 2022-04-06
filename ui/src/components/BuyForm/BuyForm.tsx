import { Market } from '@prisma/client'
import { FC, FormEvent, useState } from 'react'

import ContractClient from '~/lib/contractClient'
import { useWalletState } from '~/state/wallet'
import { Vote } from '~/types/vote'

interface Props {
  market: Market
}

const BuyForm: FC<Props> = (props) => {
  const [isCheckedYes, setIsCheckedYes] = useState(true)
  const [isCheckedNo, setIsCheckedNo] = useState(false)
  const [buyPrice, setBuyPrice] = useState('')
  const [isProcessingBuy, setIsProcessingBuy] = useState(false)
  const [isBuySuccess, setIsBuySuccess] = useState(false)
  const wallet = useWalletState()

  const handleBuy = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!props.market) return

    setIsProcessingBuy(true)
    const contractClient = new ContractClient(window)
    const vote = isCheckedYes ? Vote.Yes : Vote.No

    try {
      await contractClient.buy(props.market.contract, wallet, vote, buyPrice)
      setIsBuySuccess(true)
    } catch (error) {
      console.error(error)
    } finally {
      setIsProcessingBuy(false)
    }
  }

  return (
    <form className="border rounded p-5" onSubmit={(e) => handleBuy(e)}>
      <span className="text-md">Pick outcome</span>
      <div className="mt-2 grid grid-cols-2 gap-4">
        <input
          id="yes"
          className="hidden"
          type="checkbox"
          checked={isCheckedYes}
          onChange={() => {
            setIsCheckedYes(!isCheckedYes)
            setIsCheckedNo(!isCheckedNo)
          }}
        />
        <label
          className={`p-4 rounded ${
            isCheckedYes ? 'bg-green-500 text-white' : 'bg-gray-100 text-black'
          }`}
          htmlFor="yes"
        >
          Yes
        </label>
        <input
          id="no"
          className="hidden"
          type="checkbox"
          checked={isCheckedNo}
          onChange={() => {
            setIsCheckedYes(!isCheckedYes)
            setIsCheckedNo(!isCheckedNo)
          }}
        />
        <label
          className={`p-4 rounded ${
            isCheckedNo ? 'bg-green-500 text-white' : 'bg-gray-100 text-black'
          }`}
          htmlFor="no"
        >
          No
        </label>
      </div>
      <div className="form-control my-4">
        <span className="text-md">Amount</span>
        <label className="mt-2 input-group">
          <input
            type="text"
            placeholder="10"
            className="input input-bordered w-full"
            onChange={(e) => setBuyPrice(e.target.value)}
          />
          <span>SBY</span>
        </label>
      </div>
      <button
        type="submit"
        disabled={isProcessingBuy}
        className={`btn btn-primary text-white w-full ${
          isProcessingBuy && 'loading'
        }`}
      >
        Buy
      </button>
      {isBuySuccess && <div className="mt-4">購入が成功しました。</div>}
    </form>
  )
}

export default BuyForm
