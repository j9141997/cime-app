import React, { FC } from 'react'
import { Header } from '@components/Header'

type Props = {
  pageProps: any
}
const Layout: FC<Props> = ({ children, pageProps }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  )
}

export default Layout
