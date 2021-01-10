import React, { VFC, memo } from 'react'
import { Select as ChakraSelect, SelectProps } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'

type Props = {
  options?: {
    name: string
    value: string
  }[]
} & SelectProps

const Select: VFC<Props> = ({ options = [], ...props }) => {
  const { register } = useFormContext()
  return (
    <ChakraSelect ref={register} {...props}>
      {options.map((option, i) => (
        <option key={`option-${option.name}-${i}`} value={option.value}>
          {option.name}
        </option>
      ))}
    </ChakraSelect>
  )
}

export default memo(Select)
