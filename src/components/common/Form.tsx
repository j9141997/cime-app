import React, { memo, FC } from 'react'
import NextLink from 'next/link'
import { useForm } from 'react-hook-form'
import { Box, Button } from '@chakra-ui/react'

type Props = {
  submitButtonText?: string
  onSubmit?: () => void
}
const Form: FC<Props> = memo(function Form({
  children,
  onSubmit,
  submitButtonText,
}) {
  const { handleSubmit } = useForm()
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {children}
      <Box>
        <NextLink href="/" passHref>
          <Button variant="link" marginRight="0.5rem">
            キャンセル
          </Button>
        </NextLink>
        <Button variant="solid">
          {submitButtonText ? submitButtonText : '保存する'}
        </Button>
      </Box>
    </form>
  )
})

export default Form
