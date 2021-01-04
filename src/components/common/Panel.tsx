import React, { FC, useState } from 'react'
import {
  Flex,
  Box,
  Heading,
  Collapse,
  useDisclosure,
  IconButton,
  CloseButton,
} from '@chakra-ui/react'
import Icon from '@components/common/Icon'

type Props = {
  title?: string
  onClose?: () => void
  disabled?: boolean
  defaultIsExpanded?: boolean
}

const Panel: FC<Props> = ({
  children,
  title,
  onClose,
  disabled = false,
  defaultIsExpanded = false,
}) => {
  const [isExpanded, setExpanded] = useState(defaultIsExpanded)
  return (
    <Box w="100%" borderWidth="1px" borderRadius="md" py={1} px={4}>
      {!!title && (
        <Flex alignItems="center" justifyContent="space-between">
          <Flex alignItems="center">
            <Heading as="h3" size="sm">
              {title}
            </Heading>
            <IconButton
              aria-label="toggle expanded"
              type="button"
              onClick={() => setExpanded(!isExpanded)}
              variant="ghost"
              icon={
                <Icon
                  name={isExpanded ? 'ChevronDownIcon' : 'ChevronRightIcon'}
                />
              }
            />
          </Flex>
          <CloseButton onClick={onClose} disabled={disabled} />
        </Flex>
      )}
      <Collapse in={isExpanded} animateOpacity>
        <Box>{children}</Box>
      </Collapse>
    </Box>
  )
}

export default Panel
