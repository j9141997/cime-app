import React, { FC } from 'react'
import NextLink from 'next/link'
import {
  Box as Wrapper,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@chakra-ui/react'

type Props = {
  maxW?: number
  breadcrumb?: {
    title: string
    href: string
  }[]
}

const Container: FC<Props> = ({ children, breadcrumb = [], maxW }) => {
  const defaultMaxW = '900px'
  return (
    <Wrapper maxW={maxW || defaultMaxW} m="0 auto" py={8}>
      {!!breadcrumb.length && (
        <Breadcrumb>
          {breadcrumb.map((item, i) => (
            <BreadcrumbItem key={`breadcrumb-${i}`}>
              <NextLink href={item.href} passHref>
                <BreadcrumbLink>{item.title}</BreadcrumbLink>
              </NextLink>
            </BreadcrumbItem>
          ))}
        </Breadcrumb>
      )}
      {children}
    </Wrapper>
  )
}

export default Container
