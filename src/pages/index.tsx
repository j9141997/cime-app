import React from 'react'
import { NextPage, GetServerSideProps } from 'next'
import { NextSeo } from 'next-seo'
import useSWR from 'swr'
import { Flex, Spinner } from '@chakra-ui/react'
import OptionInteractor from 'src/interactors/options/OptionInteractor'
import { Option } from 'src/interactors/options/OptionMapper'
import Card from '@components/Card'

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
  const { data } = useSWR(
    `${baseURL}/options`,
    () => new OptionInteractor().findAll(),
    { initialData }
  )

  return (
    <div>
      <NextSeo title="Cime --多くの選択肢を" />
      <Flex justify="space-between" css={{ flexWrap: 'wrap' }}>
        {data.length ? (
          data.map((option, i) => <Card key={`option-${i}`} data={option} />)
        ) : (
          <Spinner size="lg" speed="0.65s" />
        )}
      </Flex>
    </div>
  )
}

export default HomePage
