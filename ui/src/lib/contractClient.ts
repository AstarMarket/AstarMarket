import type { BigNumber } from 'ethers'
import { ethers } from 'ethers'

import PredictionMarketConstruct from '~/contracts/construct/PredictionMarket'

class ContractClient {
  private provider
  private factory

  constructor(window: any) {
    this.provider = new ethers.providers.Web3Provider(window.ethereum)
    this.factory = new ethers.ContractFactory(
      PredictionMarketConstruct.abi,
      PredictionMarketConstruct.bytecode,
      this.provider.getSigner()
    )
  }

  public deploy = () => {
    return this.factory.deploy()
  }

  public buy = async (
    contractAddress: string,
    currentAccountAddress: string,
    vote: number,
    price: string
  ) => {
    const signer = this.provider.getSigner()
    const contract = new ethers.Contract(
      contractAddress,
      PredictionMarketConstruct.abi,
      signer
    )
    const overrides = {
      from: currentAccountAddress,
      value: ethers.utils.parseEther(price),
    }
    const buyTxn = await contract.functions.buy(vote, overrides)
    await buyTxn.wait()
  }

  public getPosition = async (
    contractAddress: string,
    currentAccountAddress: string
  ): Promise<[BigNumber, number] & { amount: BigNumber; vote: number }> => {
    const signer = this.provider.getSigner()
    const contract = new ethers.Contract(
      contractAddress,
      PredictionMarketConstruct.abi,
      signer
    )
    const res = await contract.functions.getPosition(currentAccountAddress)
    return res?.[0]
  }

  public sell = async (
    contractAddress: string,
    currentAccountAddress: string
  ) => {
    const signer = this.provider.getSigner()
    const contract = new ethers.Contract(
      contractAddress,
      PredictionMarketConstruct.abi,
      signer
    )
    const overrides = {
      from: currentAccountAddress,
      gasLimit: 100000, // 現状、適当な値で妥当性があるか不明
    }
    const sellTxn = await contract.functions.sell(overrides)
    await sellTxn.wait()
  }
}

export default ContractClient
