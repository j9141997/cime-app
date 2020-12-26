import React, { VFC } from 'react'
import { Box, Flex, Heading } from '@chakra-ui/react'
export const Header: VFC = () => {
  return (
    <Box as="header">
      <Flex maxWidth={1200} mx="auto">
        <Heading as="h1" size="lg" letterSpacing={'-.1rem'}>
          Cime
        </Heading>
      </Flex>
    </Box>
  )
}
