import React from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import { Button, useColorMode } from '@chakra-ui/react'
import Panel from '@components/common/Panel'

const HomePage: NextPage = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <div>
      <Head>
        <title>Create yoshida App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <Panel /> */}
    </div>
  )
}

export default HomePage
