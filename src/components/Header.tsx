import React, { VFC } from 'react'
import NextLink from 'next/link'
import {
  Box,
  Flex,
  Heading,
  Button,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react'
import routes from 'routes'
import Icon from '@components/common/Icon'

export const Header: VFC = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const bg = useColorModeValue('white', 'gray.800')
  return (
    <Box
      as="header"
      pos="fixed"
      width="100%"
      top={0}
      zIndex={1}
      bg={bg}
      shadow="sm"
    >
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
          <Button>New</Button>
        </Box>
      </Flex>
    </Box>
  )
}
