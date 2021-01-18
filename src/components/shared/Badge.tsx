import React, { VFC, memo } from 'react'
import { Badge as ChakraBadge } from '@chakra-ui/react'

type Props = {
  text: string
  color?: string
}

const Badge: VFC<Props> = ({ text, color = '' }) => {
  return <ChakraBadge colorScheme={color}>{text}</ChakraBadge>
}

export default memo(Badge)
