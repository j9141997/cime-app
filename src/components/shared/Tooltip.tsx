import React, { FC, memo } from 'react'
import { Tooltip as ChakraTooltip, TooltipProps } from '@chakra-ui/react'

const Tooltip: FC<TooltipProps> = ({ label, children }) => {
  return <ChakraTooltip label={label}>{children}</ChakraTooltip>
}

export default memo(Tooltip)
