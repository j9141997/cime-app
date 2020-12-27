import React, { VFC } from 'react'
import { useForm } from 'react-hook-form'
import { FormLabel, Input, Button } from '@chakra-ui/react'

type Props = {
  onSubmit: () => void
}

const LoginFormPresenter: VFC<Props> = ({ onSubmit }) => {
  const { register, handleSubmit } = useForm()
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormLabel>Email</FormLabel>
      <Input name="email" ref={register} />
      <FormLabel>Password</FormLabel>
      <Input name="password" ref={register} />
      <Button type="submit">Login</Button>
    </form>
  )
}

export default LoginFormPresenter
