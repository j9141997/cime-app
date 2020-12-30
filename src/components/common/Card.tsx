import React, { VFC, memo } from 'react'
import { Box, Flex, useTheme, Avatar, Heading, Text } from '@chakra-ui/react'

type Props = {
  title?: string
}

const Card: VFC<Props> = memo(function ItemPanel({ title }) {
  const theme = useTheme()
  return (
    <Box
      as="article"
      w={['100%', '47.5%']}
      borderWidth={1}
      mt={4}
      _hover={{ bg: 'teal.600', transition: theme.transition.duration.normal }}
      cursor="pointer"
    >
      <Flex align="center" px={4} pt={4}>
        <Avatar size="xs" mr={2} />
        <Text fontSize="sm">Junki Yoshida</Text>
      </Flex>
      <Box p={4}>
        <Heading as="h2" size="md">
          {title}
        </Heading>
      </Box>
    </Box>
  )
})

export default Card
