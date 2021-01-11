import React, { useState } from 'react'
import { NextPage, GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import useSWR from 'swr'
import {
  Divider,
  Heading,
  List,
  ListItem,
  ListIcon,
  Button,
  Stack,
  Flex,
  useToast,
} from '@chakra-ui/react'
import Error from '@components/Error'
import Author from '@components/Author'
import baseURL from 'src/utils/baseURL'
import OptionInteractor from 'src/interactors/options/OptionInteractor'
import { Option } from 'src/interactors/options/OptionMapper'
import Container from 'src/common/Container'
import Panel from '@components/Panel'
import Icon, { iconMap } from '@components/shared/Icon'
import ModalForm from '@components/ModalForm'
import { OptionForm } from '@components/optionForm'

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
  onOpen: (component: JSX.Element) => void
  onClose: () => void
}

const OptionPage: NextPage<Props> = ({ option, onOpen, onClose }) => {
  console.log(option)
  const router = useRouter()
  const toast = useToast()
  const OI = new OptionInteractor()
  const initialData = option
  const { data } = useSWR<Option | null>(
    `${baseURL}/option/${option?.id}`,
    () => OI.findOne(option?.id),
    { initialData }
  )
  const [submitting, setSubmitting] = useState(false)

  if (!data) {
    return <Error />
  }

  return (
    <Container>
      <NextSeo title={`${data.title} | Cime`} />
      <Heading as="h1" size="xl">
        {data.title}
      </Heading>
      <Flex justifyContent="space-between" mt={2}>
        <Author createdAt={data.createdAt} />
        <Flex>
          <Button
            type="button"
            size="xs"
            mr={1}
            leftIcon={<Icon name="EditIcon" />}
            onClick={() => onOpen(<OptionForm params={data} method="PUT" />)}
          >
            編集
          </Button>
          <Button
            type="button"
            size="xs"
            leftIcon={<Icon name="DeleteIcon" />}
            onClick={() =>
              onOpen(
                <ModalForm
                  title="記事削除の確認"
                  text="この記事を削除しますか？"
                  submitButtonText="削除する"
                  submitting={submitting}
                  onSubmit={async () => {
                    setSubmitting(true)
                    try {
                      await OI.remove(data.id)
                      toast({
                        position: 'bottom-left',
                        title: 'Article Created!!',
                        description: '選択肢の削除に成功しました。',
                        status: 'success',
                        isClosable: true,
                      })
                      onClose()
                      router.push('/')
                    } catch (e) {
                      console.error(e)
                      setSubmitting(false)
                    }
                  }}
                  onClose={onClose}
                />
              )
            }
          >
            削除
          </Button>
        </Flex>
      </Flex>
      <Divider mt={4} mb={8} />
      <div>
        {data.options.map((option, i) => (
          <Panel
            key={`option-${i}`}
            title={`${i + 1}: ${option.name}`}
            defaultIsExpanded={true}
          >
            <Stack spacing={2}>
              <Panel title="メリット" expandable={false}>
                <List>
                  {option.merits.map((merit, j) => (
                    <ListItem key={`merit-${j}`}>
                      <ListIcon as={iconMap.MdCheckCircle} color="green.500" />
                      {merit}
                    </ListItem>
                  ))}
                </List>
              </Panel>

              <Panel title="デメリット" expandable={false}>
                <List>
                  {option.demerits.map((demerit, j) => (
                    <ListItem key={`demerit-${j}`}>
                      <ListIcon as={iconMap.MdError} color="red.500" />
                      {demerit}
                    </ListItem>
                  ))}
                </List>
              </Panel>
            </Stack>
          </Panel>
        ))}
      </div>
    </Container>
  )
}

export default OptionPage
