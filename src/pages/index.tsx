import React from 'react'
import { NextPage, GetServerSideProps } from 'next'
import Head from 'next/head'
import useSWR from 'swr'
import OptionInteractor from 'src/interactors/options/OptionInteractor'
import { Option } from 'src/interactors/options/OptionMapper'

type Props = {
  options: Option[]
}

export const getServerSideProps: GetServerSideProps = async () => {
  const options = await new OptionInteractor().findAll()
  return {
    props: {
      options,
    },
  }
}

const HomePage: NextPage<Props> = ({ options = [] }) => {
  return (
    <div>
      <Head>
        <title>Create yoshida App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {options.map((option) => (
        <h1>{option.title}</h1>
      ))}
    </div>
  )
}

export default HomePage
