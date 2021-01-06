import React, { useEffect } from 'react'
import { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import Layout from 'src/common/Layout'

nprogress.configure({ showSpinner: false, speed: 400, minimum: 0.25 })
export default function App({ Component, pageProps }: AppProps): JSX.Element {
  if (process.browser) {
    nprogress.start()
  }

  useEffect(() => {
    nprogress.done()
  })

  return (
    <ChakraProvider resetCSS={true}>
      <Layout pageProps={pageProps}>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  )
}
