import React, { VFC, memo } from 'react'
import NextLink from 'next/link'
import { Box, Flex, Heading } from '@chakra-ui/react'
import Author from '@components/Author'
import routes from 'src/routes'
import { Option } from 'src/interactors/options/OptionMapper'

type Props = {
  data: Option
}

const Card: VFC<Props> = memo(function Card({ data }) {
  return (
    <Flex as="article" w={['100%', '48.5%']} mb={8} cursor="pointer">
      <Box>
        <NextLink href={routes.options.show(data.id)}>
          <Box>
            <Heading as="h3" size="md">
              {data.title}
            </Heading>
          </Box>
        </NextLink>
        <Flex align="center" mt={1}>
          <Author createdAt={data.createdAt} />
        </Flex>
      </Box>
    </Flex>
  )
})

export default Card
