import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import type { ReactElement, ReactNode } from 'react'
import { RecoilRoot } from 'recoil'
import DefaultLayout from '~/layouts/DefaultLayout'
import '~/styles/globals.css'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout =
    Component.getLayout ?? ((page) => <DefaultLayout>{page}</DefaultLayout>)
  return <RecoilRoot>{getLayout(<Component {...pageProps} />)}</RecoilRoot>
}

export default MyApp
