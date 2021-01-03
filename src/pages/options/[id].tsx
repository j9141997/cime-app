import React from 'react'
import { NextPage, GetServerSideProps } from 'next'
import NextLink from 'next/link'
import useSWR from 'swr'
import baseURL from 'src/utils/baseURL'
import OptionInteractor from 'src/interactors/options/OptionInteractor'
import { Option } from 'src/interactors/options/OptionMapper'
import routes from 'routes'
import Container from 'src/common/Container'

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

const OptionPage: NextPage<Props> = ({ option }) => {
  const initialData = option
  const { data, error } = useSWR<Option | null>(
    `${baseURL}/option/${option?.id}`,
    () => new OptionInteractor().findOne(option?.id),
    { initialData }
  )

  return (
    <Container>
      <NextLink href={routes.options.edit(data.id)}>編集</NextLink>
      <NextLink href={routes.options.edit(data.id)}>削除</NextLink>
      <h1>{data.title}</h1>
      <p>{data.id}</p>
    </Container>
  )
}

export default OptionPage
