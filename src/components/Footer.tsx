import React, { VFC } from 'react'
import { Box, Flex } from '@chakra-ui/react'

export const Footer: VFC = () => {
  return (
    <Box as="footer">
      <Flex
        h={10}
        maxWidth={1200}
        mx="auto"
        justify="center"
        alignItems="center"
      >
        Powered by Junki Yoshida
      </Flex>
    </Box>
  )
}
