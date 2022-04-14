import { Market } from '@prisma/client'
import { FormEvent, useState, VFC } from 'react'

import { useMetaMask } from '~/hooks/useMetaMask'
import ContractClient from '~/lib/contractClient'
import * as api from '~/services'
import { Vote } from '~/types/vote'

interface Props {
  market: Market
}

const BuyForm: VFC<Props> = (props) => {
  const [isCheckedYes, setIsCheckedYes] = useState(true)
  const [isCheckedNo, setIsCheckedNo] = useState(false)
  const [buyPrice, setBuyPrice] = useState('')
  const [isProcessingBuy, setIsProcessingBuy] = useState(false)
  const [isBuySuccess, setIsBuySuccess] = useState(false)
  const { account, isLoadingAccount } = useMetaMask()

  const handleBuy = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!props.market || !account) return
    setIsProcessingBuy(true)
    const contractClient = new ContractClient(window)
    const vote = isCheckedYes ? Vote.Yes : Vote.No
    try {
      const res = await contractClient.buy(
        props.market.contract,
        account,
        vote,
        buyPrice
      )
      await api.postMarketTransactions({
        hash: res.hash,
        account,
        amount: buyPrice,
        vote: isCheckedYes ? 'Yes' : 'No',
        action: 'Buy',
        marketId: props.market.id,
      })
      setIsBuySuccess(true)
      alert('The purchase process has been completed.')
      window.location.reload()
    } catch (error) {
      console.error(error)
    } finally {
      setIsProcessingBuy(false)
    }
  }

  return (
    <form className="border rounded p-5 h-72" onSubmit={(e) => handleBuy(e)}>
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
        disabled={isProcessingBuy || buyPrice === '' || !account}
        className={`btn btn-primary text-white w-full ${
          isProcessingBuy && 'loading'
        }`}
      >
        Buy
      </button>
      {!isLoadingAccount && !account && (
        <div className="text-error mt-2">
          Please connect your account first.
        </div>
      )}
    </form>
  )
}

export default BuyForm
