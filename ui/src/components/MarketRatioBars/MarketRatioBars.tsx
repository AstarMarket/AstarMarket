import { useEffect, VFC } from 'react'

const MarketRatioBars: VFC = () => {
  useEffect(() => {
    async function init() {
      try {
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
              <div className="ml-auto">100%</div>
            </div>
            <div className="relative mt-2 bg-gray-100 h-2 rounded-xl w-full">
              <div
                style={{
                  backgroundColor: '#e0bee6', width: `100%` }}
                className="absolute rounded-xl h-2 w-20"
              ></div>
            </div>
          </td>
        </tr>
        <tr>
          <td className="px-4">
            <div className="flex">
              <div>No</div>
              <div className="ml-auto">0%</div>
            </div>
            <div className="relative mt-2 bg-gray-100 h-2 rounded-xl w-full">
              <div
                style={{ backgroundColor: '#b2dfdb', width: `0%` }}
                className="absolute rounded-xl h-2 w-20"
              ></div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default MarketRatioBars
