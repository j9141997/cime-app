import React, { FC, useState } from 'react'
import { Flex, Box, Heading, Collapse, CloseButton } from '@chakra-ui/react'
import { Icon } from '@components/shared'

type Props = {
  title?: string
  titleSize?: 'xs' | 'sm' | 'md' | 'lg'
  onClose?: () => void
  disabled?: boolean
  defaultIsExpanded?: boolean
  heading?: string
  expandable?: boolean
}

const Panel: FC<Props> = ({
  children,
  title,
  titleSize = 'md',
  onClose,
  disabled = false,
  defaultIsExpanded = false,
  expandable = true,
}) => {
  const [isExpanded, setExpanded] = useState(defaultIsExpanded)
  return (
    <Box w="100%" borderWidth="1px" borderRadius="md" p={3}>
      {!!title && (
        <Flex
          alignItems="center"
          justifyContent="space-between"
          onClick={() => setExpanded(!isExpanded)}
          cursor="pointer"
        >
          <Flex alignItems="center">
            <Heading as="h3" size={titleSize} mr={1}>
              {title}
            </Heading>
            {expandable && (
              <Icon
                name={isExpanded ? 'ChevronDownIcon' : 'ChevronRightIcon'}
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
