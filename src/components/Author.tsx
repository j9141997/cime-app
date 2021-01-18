import React, { VFC, memo } from 'react'
import NextLink from 'next/link'
import { Avatar, Flex, Box, Text, Link } from '@chakra-ui/react'
import { distanceToNow, isRecently } from 'src/utils/formatTime'
import { Badge } from '@components/shared'

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
          <Link fontSize="sm" mr={1}>
            {name}
          </Link>
        </NextLink>
        {isRecently(new Date(createdAt)) && <Badge text="New" color="purple" />}

        <Text as="div" fontSize="xs" color="gray.500">
          {distanceToNow(new Date(createdAt)) + '前'}
        </Text>
      </Box>
    </Flex>
  )
}

export default memo(Author)
