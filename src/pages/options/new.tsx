import React from 'react'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import Container from 'src/common/Container'
import OptionForm from '@components/pages/options/forms/OptionForm'

const NewPage: NextPage = () => {
  return (
    <Container>
      <NextSeo title="新規共有 | Cime" />
      <OptionForm method="POST" />
    </Container>
  )
}

export default NewPage
