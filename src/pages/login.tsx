import React from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import LoginFormContainer from '@components/LoginFormContainer'

const LoginPage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Cime/Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LoginFormContainer />
    </div>
  )
}

export default LoginPage
