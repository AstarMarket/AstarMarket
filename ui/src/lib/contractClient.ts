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

  public buy = async (contractAddress: string, currentAccountAddress: string, vote: number, price: string) => {
    const signer = this.provider.getSigner()
    const contract = new ethers.Contract(
      contractAddress,
      PredictionMarketConstruct.abi,
      signer
    )
    const overrides = { from: currentAccountAddress, value: ethers.utils.parseEther(price) }
    await contract.functions.buy(vote, overrides)
  }
}

export default ContractClient
