import React, { FC, useState } from 'react'
import {
  Flex,
  Box,
  Heading,
  Collapse,
  IconButton,
  CloseButton,
} from '@chakra-ui/react'
import { Icon } from '@components/shared'

type Props = {
  title?: string
  onClose?: () => void
  disabled?: boolean
  defaultIsExpanded?: boolean
  heading?: string
  expandable?: boolean
}

const Panel: FC<Props> = ({
  children,
  title,
  onClose,
  disabled = false,
  defaultIsExpanded = false,
  expandable = true,
}) => {
  const [isExpanded, setExpanded] = useState(defaultIsExpanded)
  return (
    <Box w="100%" borderWidth="1px" borderRadius="md" p={3}>
      {!!title && (
        <Flex alignItems="center" justifyContent="space-between">
          <Flex alignItems="center">
            <Heading as="h3" size="sm">
              {title}
            </Heading>
            {expandable && (
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
            )}
          </Flex>
          {!!onClose && <CloseButton onClick={onClose} disabled={disabled} />}
        </Flex>
      )}
      <Collapse in={!expandable || isExpanded} animateOpacity>
        <Box pt={4} px={1}>
          {children}
        </Box>
      </Collapse>
    </Box>
  )
}

export default Panel
