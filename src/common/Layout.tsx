import React, { FC } from 'react'
import { Header } from '@components/Header'
import { Footer } from '@components/Footer'
import { Container } from '@chakra-ui/react'

type Props = {
  pageProps: {
    title?: string
  }
}
const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <Container
        as="main"
        minH="calc(100vh - 7rem)"
        maxW={1200}
        marginTop="5rem"
      >
        {children}
      </Container>
      <Footer />
    </>
  )
}

export default Layout
