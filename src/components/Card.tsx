import React, { VFC, memo } from 'react'
import NextLink from 'next/link'
import { Box, Flex, Heading } from '@chakra-ui/react'
import Author from '@components/Author'
import routes from 'routes'
import { Option } from 'src/interactors/options/OptionMapper'

type Props = {
  data: Option
}

const Card: VFC<Props> = memo(function Card({ data }) {
  return (
    <Box
      as="article"
      w={['100%', '47.5%']}
      mt={4}
      p={4}
      borderWidth="1px"
      borderRadius="md"
      cursor="pointer"
    >
      <NextLink href={routes.options.show(data.id)}>
        <Box>
          <Heading as="h2" size="lg">
            {data.title}
          </Heading>
        </Box>
      </NextLink>
      <Flex align="center" mt={1}>
        <Author createdAt={data.createdAt} />
      </Flex>
    </Box>
  )
})

export default Card
