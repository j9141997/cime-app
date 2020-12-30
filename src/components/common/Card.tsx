import React, { VFC, memo } from 'react'
import NextLink from 'next/link'
import { Box, Flex, Avatar, Heading, Text } from '@chakra-ui/react'
import routes from 'routes'

type Props = {
  data: {
    id: string
    title: string
  }
}

const Card: VFC<Props> = memo(function ItemPanel({ data }) {
  return (
    <Box
      as="article"
      w={['100%', '47.5%']}
      borderWidth={1}
      mt={4}
      cursor="pointer"
    >
      <Flex align="center" px={4} pt={4}>
        <Avatar size="xs" mr={2} />
        <Text fontSize="sm">Junki Yoshida</Text>
      </Flex>
      <NextLink href={routes.option(data.id)}>
        <Box p={4}>
          <Heading as="h2" size="md">
            {data.title}
          </Heading>
        </Box>
      </NextLink>
    </Box>
  )
})

export default Card
