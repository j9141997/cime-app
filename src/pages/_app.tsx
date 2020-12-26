import React from 'react'
import { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import Layout from 'src/common/Layout'

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  console.log(pageProps)
  return (
    <ChakraProvider resetCSS={true}>
      <Layout pageProps={pageProps}>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  )
}
