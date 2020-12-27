import React, { VFC, memo } from 'react'
import { SunIcon, MoonIcon } from '@chakra-ui/icons'

type Props = {
  name: string
}

const iconMap = {
  SunIcon: SunIcon,
  MoonIcon: MoonIcon,
}

const Icon: VFC<Props> = memo(function Icon({ name }) {
  const Icon = iconMap[name]
  return <Icon />
})

export default Icon
