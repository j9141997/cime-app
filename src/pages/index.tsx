import React from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import Panel from '@components/common/Panel'

const HomePage: NextPage = () => {
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
