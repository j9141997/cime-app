import React, { memo, FC } from 'react'
import NextLink from 'next/link'
import { FormProvider, useForm } from 'react-hook-form'
import { Box, Button, Spinner } from '@chakra-ui/react'

type Props = {
  submitButtonText?: string
  onSubmit?: (data: any) => void
  submitting?: boolean
}
const Form: FC<Props> = memo(function Form({
  children,
  onSubmit,
  submitButtonText,
  submitting,
}) {
  const methods = useForm()
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {children}
        <Box textAlign="end" mt={2}>
          <NextLink href="/" passHref>
            <Button type="button" variant="link" marginRight={4}>
              キャンセル
            </Button>
          </NextLink>
          <Button
            type="submit"
            variant="solid"
            color="white"
            bgGradient="linear(to-l, #7928CA,#FF0080)"
            _hover={{}}
          >
            {submitButtonText ? submitButtonText : '保存する'}
          </Button>
        </Box>
        {submitting && (
          <Box
            position="fixed"
            bg="rgba(0, 0, 0, 0.48)"
            w="100%"
            h="100%"
            top={0}
            left={0}
            bottom={0}
            right={0}
            zIndex={100}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Spinner size="xl" speed="0.65s" />
          </Box>
        )}
      </form>
    </FormProvider>
  )
})

export default Form
