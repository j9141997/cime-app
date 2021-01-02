import React from 'react'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import Container from 'src/common/Container'
import { OptionForm } from '@components/optionForm'
import routes from 'routes'

const NewPage: NextPage = () => {
  const breadcrumb = [
    { title: 'HOME', href: routes.root },
    { title: '新規公開', href: routes.options.new },
  ]
  return (
    <Container breadcrumb={breadcrumb}>
      <NextSeo title="新規公開" />
      <OptionForm />
    </Container>
  )
}

export default NewPage
