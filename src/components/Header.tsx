import React, { VFC } from 'react'
import NextLink from 'next/link'
import { Box, Flex, Heading, Button } from '@chakra-ui/react'
import routes from 'routes'

export const Header: VFC = () => {
  return (
    <Box as="header" pos="fixed" width="100%">
      <Flex
        maxW={1200}
        height="4.5rem"
        mx="auto"
        align="center"
        justify="space-between"
        paddingX="1rem"
      >
        <NextLink href={routes.root}>
          <Heading as="h1" size="lg" letterSpacing={'-.1rem'}>
            Cime
          </Heading>
        </NextLink>
        <Box>
          {/* <Button>よしあ</Button> */}
          <Button marginRight="0.5rem">ログイン</Button>
          <Button>新規登録</Button>
        </Box>
      </Flex>
    </Box>
  )
}
