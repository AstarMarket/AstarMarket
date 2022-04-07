import { useRouter } from 'next/router'
import { useState, VFC } from 'react'

import { useMetaMask } from '~/hooks/useMetaMask'
import ContractClient from '~/lib/contractClient'
import * as api from '~/services'

const MarketForm: VFC = () => {
  const [marketTitle, setMarketTitle] = useState('')
  const [isProcessingDeploy, setIsProcessingDeploy] = useState(false)
  const router = useRouter()
  const { account, isLoadingAccount } = useMetaMask()

  const deployContract = async (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    e.preventDefault()

    try {
      if (typeof window.ethereum === undefined) return
      setIsProcessingDeploy(true)
      const contractClient = new ContractClient(window)
      const contract = await contractClient.deploy()
      await contract.deployed()
      await api.postMarkets({ title: marketTitle, contract: contract.address })
      alert('Successfully added the market!')
      router.push(`/markets/${contract.address}`)
    } catch (error: any) {
      alert(error?.message ?? 'deploy transaction is failed')
    } finally {
      setIsProcessingDeploy(false)
    }
  }

  return (
    <>
      {!isLoadingAccount && !account && (
        <div className="alert alert-error mb-4">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current flex-shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Please connect your account first.</span>
          </div>
        </div>
      )}
      <form className="border rounded p-6">
        <div>
          <label htmlFor="title" className="w-full">
            Set Market Title
          </label>
        </div>
        <div className="mt-4">
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Title"
            onChange={(e) => setMarketTitle(e.target.value)}
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="mt-8">
          <button
            type="submit"
            className={`btn btn-info text-white ${
              isProcessingDeploy && 'loading'
            }`}
            onClick={deployContract}
            disabled={marketTitle === '' || !account || isProcessingDeploy}
          >
            Deploy
          </button>
        </div>
      </form>
    </>
  )
}

export default MarketForm
