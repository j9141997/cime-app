import React, { VFC, memo } from 'react'
import {
  SunIcon,
  MoonIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons'

type Props = {
  name: string
}

const iconMap = {
  SunIcon: SunIcon,
  MoonIcon: MoonIcon,
  ChevronRightIcon: ChevronRightIcon,
  ChevronDownIcon: ChevronDownIcon,
}

const Icon: VFC<Props> = ({ name, ...props }) => {
  const Icon = iconMap[name]
  return <Icon {...props} />
}

export default memo(Icon)
