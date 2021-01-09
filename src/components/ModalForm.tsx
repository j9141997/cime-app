import React, { memo, FC } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import {
  Box,
  Button,
  Spinner,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalContent,
  ModalCloseButton,
} from '@chakra-ui/react'

type Props = {
  title: string
  text?: string
  submitButtonText?: string
  onSubmit?: (data: any) => void
  submitting?: boolean
  onClose?: () => void
}
const ModalForm: FC<Props> = memo(function Form({
  children,
  onSubmit,
  onClose,
  submitButtonText,
  submitting,
  title,
  text,
}) {
  const methods = useForm()
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{children ? children : text}</ModalBody>
          <ModalFooter>
            <Button
              type="button"
              variant="link"
              marginRight={4}
              onClick={onClose}
            >
              キャンセル
            </Button>
            <Button
              type="submit"
              variant="solid"
              color="white"
              bgGradient="linear(to-l, #7928CA,#FF0080)"
              _hover={{}}
            >
              {submitButtonText ? submitButtonText : '保存する'}
            </Button>
          </ModalFooter>
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
        </ModalContent>
      </form>
    </FormProvider>
  )
})

export default ModalForm
