import React, { VFC } from 'react'
import NextLink from 'next/link'
import { Box, Flex, Heading, Button, useColorMode } from '@chakra-ui/react'
import routes from 'routes'
import Icon from '@components/common/Icon'

export const Header: VFC = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  console.log(colorMode, toggleColorMode)

  return (
    <Box as="header" pos="fixed" width="100%" top={0}>
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
          <Button type="button" marginRight="0.5rem" onClick={toggleColorMode}>
            <Icon name={colorMode === 'light' ? 'SunIcon' : 'MoonIcon'} />
          </Button>
          <NextLink href={routes.login}>
            <Button type="button">Login</Button>
          </NextLink>
        </Box>
      </Flex>
    </Box>
  )
}
