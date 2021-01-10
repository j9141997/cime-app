import React from 'react'
import { GetServerSideProps, NextPage } from 'next'
import { NextSeo } from 'next-seo'
import useSWR from 'swr'
import baseURL from 'src/utils/baseURL'
import Container from 'src/common/Container'
import { OptionForm } from '@components/optionForm'
import OptionInteractor from 'src/interactors/options/OptionInteractor'
import { Option } from 'src/interactors/options/OptionMapper'
import routes from 'src/routes'

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id as string
  const option = await new OptionInteractor().findOne(id)
  return {
    props: {
      option,
    },
  }
}

type Props = {
  option: Option
}

const EditPage: NextPage<Props> = ({ option }) => {
  const initialData = option
  const { data, error } = useSWR<Option | null>(
    `${baseURL}/option/${option.id}`,
    () => new OptionInteractor().findOne(option.id),
    { initialData }
  )
  const breadcrumb = [
    { title: 'HOME', href: routes.root },
    { title: '編集', href: routes.options.new },
  ]
  return (
    <Container breadcrumb={breadcrumb}>
      <NextSeo title="編集" />
      <OptionForm params={data} method="PUT" />
    </Container>
  )
}

export default EditPage
