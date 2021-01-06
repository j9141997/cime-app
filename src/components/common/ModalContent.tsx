import React, { FC, ReactElement } from 'react'
import {
  ModalContent as Content,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
} from '@chakra-ui/react'

type Props = {
  title: string
  onClose?: () => void
  footerComponent?: ReactElement
}

const ModalContent: FC<Props> = ({ children, title, footerComponent }) => {
  return (
    <Content>
      <ModalHeader>{title}</ModalHeader>
      <ModalCloseButton />

      <ModalBody>{children}</ModalBody>

      {!!footerComponent && <ModalFooter>{footerComponent}</ModalFooter>}
    </Content>
  )
}

export default ModalContent
