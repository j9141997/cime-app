import React, { VFC, memo } from 'react'
import {
  Alert as ChakraAlert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'

type Props = {
  title: string
  description: string
}

const Alert: VFC<Props> = ({ title, description }) => {
  return (
    <ChakraAlert status="error">
      <AlertIcon />
      <AlertTitle mr={2}>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </ChakraAlert>
  )
}

export default memo(Alert)
