import React, { VFC, memo } from 'react'
import NextLink from 'next/link'
import { Avatar, Flex, Box, Text, Link } from '@chakra-ui/react'
import { distanceToNow } from 'src/utils/formatTime'

type Props = {
  name?: string
  createdAt: number
}
const Author: VFC<Props> = ({ name = 'Anonymous', createdAt }) => {
  return (
    <Flex alignItems="center">
      <Avatar size="sm" mr={2} />
      <Box>
        <NextLink href="/" passHref>
          <Link fontSize="sm">{name}</Link>
        </NextLink>

        <Text as="div" fontSize="xs" color="gray.500">
          {distanceToNow(new Date(createdAt)) + '前'}
        </Text>
      </Box>
    </Flex>
  )
}

export default memo(Author)
