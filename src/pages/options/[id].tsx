import React from 'react'
import { NextPage, GetServerSideProps } from 'next'
import { NextSeo } from 'next-seo'
import NextLink from 'next/link'
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
} from '@chakra-ui/react'
import Author from '@components/Author'
import baseURL from 'src/utils/baseURL'
import OptionInteractor from 'src/interactors/options/OptionInteractor'
import { Option } from 'src/interactors/options/OptionMapper'
import routes from 'routes'
import Container from 'src/common/Container'
import Panel from '@components/Panel'
import Icon, { iconMap } from '@components/Icon'
import ModalForm from '@components/ModalForm'

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

const OptionPage: NextPage<Props> = ({ option, onOpen }) => {
  const initialData = option
  const { data, error } = useSWR<Option | null>(
    `${baseURL}/option/${option?.id}`,
    () => new OptionInteractor().findOne(option?.id),
    { initialData }
  )

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
