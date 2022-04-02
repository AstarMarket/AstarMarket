import { VFC } from 'react'

const AppHero: VFC = () => {
  return (
    <div className="bg-gray-800">
      <div className="sm:blocksm:inset-0">
        <div className="py-24 flex flex-col items-center justify-center">
          <h1 className="font-bold text-4xl text-white">Bet on your Beliefs</h1>
          <div className="mt-4 text-lg text-gray-400 text-center">
            <p>Demo is a decentralized information markets platform, </p>
            <p>
              harnessing the power of free markets to demystify the real world
              events that matter most to you.
            </p>
          </div>
          <div className="max-w-2xl mt-12 text-sm alert shadow-lg">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="stroke-info flex-shrink-0 w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>
                The markets listed here are for informational purposes only. We
                take no profits from them.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppHero
