import React from 'react'
import { NextPage, GetServerSideProps } from 'next'
import { NextSeo } from 'next-seo'
import useSWR from 'swr'
import { Flex, Box, Heading } from '@chakra-ui/react'
import Introduction from '@components/Introduction'
import Container from 'src/common/Container'
import OptionInteractor from 'src/interactors/options/OptionInteractor'
import { Option } from 'src/interactors/options/OptionMapper'
import Card from '@components/Card'
import { Tooltip, Icon } from '@components/shared'

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

  return (
    <Container>
      <NextSeo title="Cime --多くの選択肢を" />
      <Introduction />
      <Box mb={8}>
        <Flex alignItems="baseline" mb={4}>
          <Heading as="h2" size="lg" mr={1}>
            Article
          </Heading>
          <Tooltip label="様々なユーザーが投稿した選択肢を見ることができます。">
            <Flex color="gray.400">
              <Icon name="InfoIcon" fontSize="sm" />
            </Flex>
          </Tooltip>
        </Flex>

        <Flex justify="space-between" css={{ flexWrap: 'wrap' }}>
          {data.length ? (
            data.map((option, i) => <Card key={`option-${i}`} data={option} />)
          ) : (
            <Heading as="h2">投稿がありません。</Heading>
          )}
        </Flex>
      </Box>
      <Box>
        <Flex alignItems="baseline" mb={4}>
          <Heading as="h2" size="lg" mr={1}>
            Brain Storming
          </Heading>
          <Tooltip label="様々なユーザーと意見を出し合う場です。">
            <Flex color="gray.400">
              <Icon name="InfoIcon" fontSize="sm" />
            </Flex>
          </Tooltip>
        </Flex>

        <Flex justify="space-between" css={{ flexWrap: 'wrap' }}>
          <Heading as="h3" size="sm">
            Coming Soon...
          </Heading>
        </Flex>
      </Box>
    </Container>
  )
}

export default IndexPage
