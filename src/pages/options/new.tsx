import React from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import { Container } from '@chakra-ui/react'
import { OptionForm } from '@components/optionForm'

const NewPage: NextPage = () => {
  return (
    <Container py={4}>
      <Head>
        <title>投稿</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <OptionForm />
    </Container>
  )
}

export default NewPage
