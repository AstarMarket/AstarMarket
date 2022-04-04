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

  public deploy = (title: string) => {
    return this.factory.deploy(title)
  }

  public buy = async (contractAddress: string, vote: number) => {
    const signer = this.provider.getSigner()
    const contract = new ethers.Contract(
      contractAddress,
      PredictionMarketConstruct.abi,
      signer
    )
    await contract.buy(vote)
  }
}

export default ContractClient
