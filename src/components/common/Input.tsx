import React, { VFC } from 'react'
import { Input as ChakraInput, InputProps } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'

type Props = InputProps
const Input: VFC<Props> = ({ ...props }) => {
  const { register } = useFormContext()
  return <ChakraInput {...props} ref={register} />
}

export default Input
