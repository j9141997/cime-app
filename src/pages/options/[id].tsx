import React, { useState, ComponentProps } from 'react'
import { NextPage, GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import useSWR from 'swr'
import { useToast } from '@chakra-ui/react'
import Error from '@components/Error'
import baseURL from 'src/utils/baseURL'
import OptionInteractor from 'src/interactors/options/OptionInteractor'
import { Option } from 'src/interactors/options/OptionMapper'
import { OptionDetailPresenter } from '@components/pages/options/details'
import routes from 'src/routes'

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
  ComponentProps<typeof OptionDetailPresenter>,
  'data'
>

const OptionPage: NextPage<Props> = ({ initialData, ...props }) => {
  const [submitting, setSubmitting] = useState(false)
  const key = `${baseURL}/option/${initialData?.id}`
  const router = useRouter()
  const toast = useToast()
  const OI = new OptionInteractor()
  const { data, mutate } = useSWR<Option | null>(
    key,
    () => OI.findOne(initialData?.id),
    { initialData }
  )

  const handleSubmitSuccess = () => {
    mutate()
  }

  const handleRemoveSubmit = async () => {
    try {
      await OI.remove(data.id)
      toast({
        position: 'bottom-left',
        title: 'Article Created!!',
        description: '選択肢の削除に成功しました。',
        status: 'success',
        isClosable: true,
      })
      router.push(routes.root)
    } catch (e) {
      console.error(e)
      setSubmitting(false)
    }
  }
  const presenterProps = {
    data,
    router,
    toast,
    submitting,
    onSubmit: handleRemoveSubmit,
    onSubmitSuccess: handleSubmitSuccess,
    ...props,
  }

  if (!data) {
    return <Error />
  }

  return (
    <>
      <NextSeo title={`${data.title} | Cime`} />
      <OptionDetailPresenter {...presenterProps} />
    </>
  )
}

export default OptionPage
