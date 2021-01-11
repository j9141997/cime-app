import React from 'react'
import { NextPage, GetServerSideProps } from 'next'
import { NextSeo } from 'next-seo'
import useSWR from 'swr'
import { Flex, Box, Heading } from '@chakra-ui/react'
import Container from 'src/common/Container'
import OptionInteractor from 'src/interactors/options/OptionInteractor'
import { Option } from 'src/interactors/options/OptionMapper'
import Card from '@components/Card'
import { TabLayout, Tooltip, Icon } from '@components/shared'

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

const IndexPage: NextPage<Props> = ({ options = [] }) => {
  const initialData = options
  const baseURL = process.env.NEXT_PUBLIC_API_ENDOPOINT
  const { data } = useSWR(
    `${baseURL}/options`,
    () => new OptionInteractor().findAll(),
    { initialData }
  )
  const tabs = [
    {
      key: 'business',
      name: 'ビジネス',
      Component: (
        <Flex justify="space-between" css={{ flexWrap: 'wrap' }}>
          {data.length ? (
            data.map((option, i) => <Card key={`option-${i}`} data={option} />)
          ) : (
            <Heading as="h2">投稿がありません。</Heading>
          )}
        </Flex>
      ),
    },
    {
      key: 'lifestyle',
      name: '暮らし',
      Component: (
        <Flex justify="space-between" css={{ flexWrap: 'wrap' }}>
          {data.length ? (
            data.map((option, i) => <Card key={`option-${i}`} data={option} />)
          ) : (
            <Heading as="h2">投稿がありません。</Heading>
          )}
        </Flex>
      ),
    },
    {
      key: 'others',
      name: 'その他',
      Component: (
        <Flex justify="space-between" css={{ flexWrap: 'wrap' }}>
          {data.length ? (
            data.map((option, i) => <Card key={`option-${i}`} data={option} />)
          ) : (
            <Heading as="h2">投稿がありません。</Heading>
          )}
        </Flex>
      ),
    },
  ]

  return (
    <Container>
      <NextSeo title="Cime --多くの選択肢を" />
      <Box>
        <Flex alignItems="baseline">
          <Heading as="h2" size="lg" mr={1}>
            Article
          </Heading>
          <Tooltip label="テストです。">
            <Flex color="gray.400">
              <Icon name="InfoIcon" fontSize="sm" />
            </Flex>
          </Tooltip>
        </Flex>

        <TabLayout tabs={tabs} />
      </Box>
    </Container>
  )
}

export default IndexPage
