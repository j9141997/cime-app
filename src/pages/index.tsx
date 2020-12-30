import React from 'react'
import { NextPage, GetServerSideProps } from 'next'
import Head from 'next/head'
import useSWR from 'swr'
import { Flex } from '@chakra-ui/react'
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
  const initialData = options
  const baseURL = process.env.NEXT_PUBLIC_API_ENDOPOINT
  const { data, error } = useSWR<Option[]>(
    `${baseURL}/options`,
    () => new OptionInteractor().findAll(),
    { initialData }
  )
  return (
    <div>
      <Head>
        <title>Create yoshida App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex justify="space-between" css={{ flexWrap: 'wrap' }}>
        {options.map((option, i) => (
          <Card key={`option-${i}`} title={option.title} />
        ))}
      </Flex>
    </div>
  )
}

export default HomePage
