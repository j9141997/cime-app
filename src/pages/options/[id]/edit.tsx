import React, { ComponentProps } from 'react'
import { NextPage, GetServerSideProps } from 'next'
import { NextSeo } from 'next-seo'
import useSWR from 'swr'
import Container from 'src/common/Container'
import OptionForm from '@components/pages/options/forms/OptionForm'
import { Option } from 'src/interactors/options/OptionMapper'
import OptionInteractor from 'src/interactors/options/OptionInteractor'
import baseURL from 'src/utils/baseURL'

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id as string
  const option = await new OptionInteractor().findOne(id)
  return {
    props: {
      initialData: option,
    },
  }
}

type Props = { initialData: Option } & Omit<
  ComponentProps<typeof OptionForm>,
  'data'
>

const OptionEditPage: NextPage<Props> = ({ initialData }) => {
  const { data } = useSWR<Option | null>(
    `${baseURL}/option/${initialData?.id}`,
    () => new OptionInteractor().findOne(initialData?.id),
    { initialData }
  )

  return (
    <Container>
      <NextSeo title={`編集 | ${data.title || '-'} | Cime`} />
      <OptionForm method="PUT" params={data} />
    </Container>
  )
}

export default OptionEditPage
