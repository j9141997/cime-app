import React from 'react'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import Container from 'src/common/Container'
import { OptionForm } from '@components/optionForm'

const NewPage: NextPage = () => {
  return (
    <Container>
      <NextSeo title="新規公開" />
      <OptionForm method="POST" />
    </Container>
  )
}

export default NewPage
