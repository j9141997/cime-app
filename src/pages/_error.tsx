import React from 'react'
import { NextPage, NextPageContext } from 'next'
import { ErrorProps } from 'next/error'
import ErrorBoundary from '@components/Error'

const ErrorPage: NextPage<ErrorProps> = () => {
  return <ErrorBoundary />
}

ErrorPage.getInitialProps = async ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode ?? 500 : 404

  return { statusCode }
}

export default ErrorPage
