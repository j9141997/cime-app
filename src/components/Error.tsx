import React, { FC } from 'react'
import { Heading, Text, Button } from '@chakra-ui/react'

const ErrorBoundary: FC = ({ children }) => {
  return (
    <>
      <Heading as="h2" size="md">
        エラーが発生しました。
      </Heading>
      {children ? (
        children
      ) : (
        <Text>
          誠に恐れ入りますが、しばらくしてから再度アクセスをお試しください。
        </Text>
      )}
      <Button
        variant="outline"
        size="md"
        mt={2}
        onClick={() => (location.href = '/')}
      >
        トップページに戻る
      </Button>
    </>
  )
}

export default ErrorBoundary
