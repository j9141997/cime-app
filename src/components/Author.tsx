import React, { VFC, memo } from 'react'
import { Avatar, Flex, Box, Text } from '@chakra-ui/react'
import { format } from 'date-fns'

type Props = {
  name?: string
  createdAt: number
}
const Author: VFC<Props> = ({ name = 'Anonymous', createdAt }) => {
  return (
    <Flex alignItems="center">
      <Avatar size="sm" mr={2} />
      <Box>
        <Text as="div" fontSize="xs">
          {name}
        </Text>
        <Text as="div" fontSize="xs" color="gray.500">
          {format(new Date(createdAt), 'yyyy/MM/dd')}
        </Text>
      </Box>
    </Flex>
  )
}

export default memo(Author)
