import React, { FC } from 'react'
import { Header } from '@components/Header'
import { Footer } from '@components/Footer'
import { Box } from '@chakra-ui/react'

type Props = {
  pageProps: any
}
const Layout: FC<Props> = ({ children }) => {
  return (
    <div>
      <Header />
      <Box as="main" minHeight="calc(100vh - 88px)">
        {children}
      </Box>
      <Footer />
    </div>
  )
}

export default Layout
