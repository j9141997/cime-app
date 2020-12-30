import React from 'react'
import { NextPage, GetServerSideProps } from 'next'
import useSWR from 'swr'
import baseURL from 'src/utils/baseURL'
import OptionInteractor from 'src/interactors/options/OptionInteractor'
import { Option } from 'src/interactors/options/OptionMapper'

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
    `${baseURL}/option/${option.id}`,
    () => new OptionInteractor().findOne(option.id),
    { initialData }
  )
  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.id}</p>
    </div>
  )
}

export default OptionPage
