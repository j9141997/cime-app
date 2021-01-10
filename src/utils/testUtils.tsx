import React, { ReactElement } from 'react'
import '@testing-library/jest-dom'
import { render, RenderResult } from '@testing-library/react'
import { ChakraProvider } from '@chakra-ui/react'

const AllTheProviders = ({ children }) => {
  return <ChakraProvider resetCSS={true}>{children}</ChakraProvider>
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const customRender = (ui: ReactElement, options = {}): RenderResult =>
  render(ui, { wrapper: AllTheProviders, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
