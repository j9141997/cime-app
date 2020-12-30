import React, { VFC } from 'react'
import { Box, Flex } from '@chakra-ui/react'

export const Footer: VFC = () => {
  return (
    <Box as="footer" mt={20}>
      <Flex maxWidth={1200} mx="auto" justify="center">
        Powered by Junki Yoshida
      </Flex>
    </Box>
  )
}
