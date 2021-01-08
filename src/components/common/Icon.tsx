import React, { VFC, memo } from 'react'
import {
  SunIcon,
  MoonIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons'
import { MdCheckCircle, MdError } from 'react-icons/md'

type Props = {
  name: string
}

export const iconMap = {
  SunIcon: SunIcon,
  MoonIcon: MoonIcon,
  ChevronRightIcon: ChevronRightIcon,
  ChevronDownIcon: ChevronDownIcon,
  MdCheckCircle: MdCheckCircle,
  MdError: MdError,
}

const Icon: VFC<Props> = ({ name, ...props }) => {
  const Icon = iconMap[name]
  return <Icon {...props} />
}

export default memo(Icon)
