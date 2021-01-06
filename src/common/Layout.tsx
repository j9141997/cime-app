import React, {
  FC,
  useState,
  cloneElement,
  Children,
  isValidElement,
  ComponentProps,
} from 'react'
import { Header } from '@components/Header'
import { Footer } from '@components/Footer'
import { Container } from '@chakra-ui/react'
import { Modal, useDisclosure, ModalOverlay } from '@chakra-ui/react'

type Props = {
  pageProps: {
    title?: string
  }
}
const Layout: FC<Props> = ({ children }) => {
  const [modalComponent, setModalComponent] = useState<JSX.Element | null>(null)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleOpen: ComponentProps<typeof Header>['onOpen'] = (component) => {
    setModalComponent(component)
    onOpen()
  }
  const handleClose = (): void => {
    setModalComponent(null)
    onClose()
  }

  return (
    <>
      <Header onOpen={handleOpen} />

      {!!modalComponent && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          {cloneElement(modalComponent, { onClose: handleClose })}
        </Modal>
      )}

      <Container
        as="main"
        minH="calc(100vh - 7rem)"
        maxW={1200}
        marginTop="5rem"
      >
        {Children.map(children, (child) => {
          if (isValidElement(child)) {
            return cloneElement(child, { onOpen: handleOpen })
          }
          return child
        })}
      </Container>

      <Footer />
    </>
  )
}

export default Layout
