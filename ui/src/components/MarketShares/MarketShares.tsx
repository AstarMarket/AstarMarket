import { Market } from '@prisma/client'
import { useEffect, useState, VFC } from 'react'

import ContractClient from '~/lib/contractClient'

interface Props {
  market: Market
}

const MarketShares: VFC<Props> = (props) => {
  const [yesShare, setYesShare] = useState(0)
  const [noShare, setNoShare] = useState(0)

  useEffect(() => {
    async function init() {
      try {
        const contractClient = new ContractClient(window)
        const res = await contractClient.getMarketShares(props.market.contract)
        const yesResult = Math.round(Number(res[0]) * 10 / 100) / 10
        const noResult = Math.round(Number(res[1]) * 10 / 100) / 10
        setYesShare(yesResult)
        setNoShare(noResult)
      } catch (error) {
        console.error(error)
      }
    }
    init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <table className="col-span-2 border-separate border rounded p-5">
      <thead>
        <tr>
          <th>Outcome / Probability</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="px-4">
            <div className="flex">
              <div>Yes</div>
              <div className="ml-auto">{yesShare}%</div>
            </div>
            <div className="relative mt-2 bg-gray-100 h-2 rounded-xl w-full">
              <div
                style={{
                  backgroundColor: '#e0bee6', width: `${yesShare}%` }}
                className="absolute rounded-xl h-2 w-20"
              ></div>
            </div>
          </td>
        </tr>
        <tr>
          <td className="px-4">
            <div className="flex">
              <div>No</div>
              <div className="ml-auto">{noShare}%</div>
            </div>
            <div className="relative mt-2 bg-gray-100 h-2 rounded-xl w-full">
              <div
                style={{ backgroundColor: '#b2dfdb', width: `${noShare}%` }}
                className="absolute rounded-xl h-2 w-20"
              ></div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default MarketShares
