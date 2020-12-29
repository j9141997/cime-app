import React, { VFC, memo } from 'react'
import { Box, useColorModeValue } from '@chakra-ui/react'

type Props = {
  title?: string
}

const Card: VFC<Props> = memo(function ItemPanel({ title }) {
  return (
    <Box as="article" w="47.5%" borderWidth={1} mt={4} p="6">
      {title}
    </Box>
  )
})

export default Card
