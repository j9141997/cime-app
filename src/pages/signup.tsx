import React from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import SignUpContainer from '@components/SignUpContainer'

const LoginPage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Cime/Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SignUpContainer />
    </div>
  )
}

export default LoginPage
