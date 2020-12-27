import React, { VFC } from 'react'
import { Box, Flex } from '@chakra-ui/react'

export const Footer: VFC = () => {
  return (
    <Box as="footer">
      <Flex
        maxWidth={1200}
        mx="auto"
        justify="center"
        borderTop="1px"
        borderColor="gray.200"
      >
        Powered by Junki Yoshida
      </Flex>
    </Box>
  )
}
