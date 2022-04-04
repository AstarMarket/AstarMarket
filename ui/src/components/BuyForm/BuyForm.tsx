import { Market } from '@prisma/client'
import { FC, useState } from 'react'

import ContractClient from '~/lib/contractClient'

interface Props {
  market: Market
}

const BuyForm: FC<Props> = (props) => {
  const [isCheckedYes, setIsCheckedYes] = useState(true)
  const [isCheckedNo, setIsCheckedNo] = useState(false)

  const buy = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (!props.market) {
      return
    }

    e.preventDefault()
    const contractClient = new ContractClient(window)
    const vote = isCheckedYes ? 0 : 1
    contractClient.buy(props.market.contract, vote)
  }

  return (
    <form className="mt-8 grid grid-cols-3 gap-4">
      <div className="col-span-2 border rounded p-5"></div>
      <div className="border rounded p-5">
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
              isCheckedYes
                ? 'bg-green-500 text-white'
                : 'bg-gray-100 text-black'
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
            />
            <span>USD</span>
          </label>
        </div>
        <button
          type="submit"
          onClick={buy}
          className="btn btn-primary text-white w-full"
        >
          Buy
        </button>
      </div>
    </form>
  )
}

export default BuyForm