import React, { VFC, memo } from 'react'
import { Avatar, Flex, Text } from '@chakra-ui/react'

type Props = {
  name?: string
}
const Author: VFC<Props> = ({ name = 'Anonymous' }) => {
  return (
    <Flex alignItems="center">
      <Avatar size="xs" mr={2} />
      <Text fontSize="sm">{name}</Text>
    </Flex>
  )
}

export default memo(Author)
