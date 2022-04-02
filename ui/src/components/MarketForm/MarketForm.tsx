import { ethers } from 'ethers'
import { useState, VFC } from 'react'

import GreeterConstruct from '~/contracts/construct/Greeter'
import * as api from '~/services'

// 型 'MetaMaskInpageProvider' の引数を型 'ExternalProvider | JsonRpcFetchFunc' のパラメーターに割り当てることはできません。
declare let window: any

const MarketForm: VFC = () => {
  const [marketTitle, setMarketTitle] = useState('')
  const [contractAddress, setContractAddress] = useState('')

  const deployContract = async (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    e.preventDefault()

    if (marketTitle.length === 0) {
      alert('Please enter a title.')
      return
    }

    if (typeof window.ethereum !== undefined) {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const factory = new ethers.ContractFactory(
        GreeterConstruct.abi,
        GreeterConstruct.bytecode,
        provider.getSigner()
      )
      await factory
        .deploy(marketTitle)
        .then(async (res) => {
          await api.postMarkets({ title: marketTitle, contract: res.address })
          setContractAddress(res.address)
        })
        .catch((err) => {
          if (err?.message) {
            alert(err.message)
          } else {
            alert('deploy transaction is failed')
          }
        })
    }
  }

  return (
    <>
      <form>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Title"
          onChange={(e) => setMarketTitle(e.target.value)}
          className="input input-bordered w-full max-w-xs"
        ></input>
        <button
          type="submit"
          className="btn btn-info text-white ml-4"
          onClick={deployContract}
        >
          Deploy
        </button>
      </form>

      <div className="mt-8">
        deployed contract address:{' '}
        <a
          className="text-sky-400"
          href={process.env.SHIBUYA_SUBSCAN_URL + '/account/' + contractAddress}
          target="_blank"
          rel="noreferrer noopener"
        >
          {contractAddress}
        </a>
      </div>
    </>
  )
}

export default MarketForm
