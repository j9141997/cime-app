import React, { FC } from 'react'
import { Header } from '@components/Header'
import { Footer } from '@components/Footer'
import { Box, Flex } from '@chakra-ui/react'

type Props = {
  pageProps: any
}
const Layout: FC<Props> = ({ children }) => {
  return (
    <div>
      <Header />
      <Box
        as="main"
        minH="calc(100vh - 88px)"
        maxW={1200}
        marginTop="4.5rem"
        mx="1.5rem"
      >
        <Flex justify="center">{children}</Flex>
      </Box>
      <Footer />
    </div>
  )
}

export default Layout
