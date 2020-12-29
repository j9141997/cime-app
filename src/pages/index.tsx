import React from 'react'
import { NextPage, GetServerSideProps } from 'next'
import Head from 'next/head'
import useSWR from 'swr'
import { Wrap, Flex } from '@chakra-ui/react'
import OptionInteractor from 'src/interactors/options/OptionInteractor'
import { Option } from 'src/interactors/options/OptionMapper'
import Card from '@components/common/Card'

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
      <Flex flexWrap={[]} justify="space-between">
        {options.map((option, i) => (
          <Card key={`option-${i}`} title={option.title} />
        ))}
      </Flex>
    </div>
  )
}

export default HomePage
