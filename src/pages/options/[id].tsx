import React from 'react'
import { NextPage, GetServerSideProps } from 'next'
import NextLink from 'next/link'
import useSWR from 'swr'
import {
  Box,
  Divider,
  Heading,
  List,
  ListItem,
  ListIcon,
  IconButton,
  Stack,
  Flex,
} from '@chakra-ui/react'
import Author from '@components/Author'
import baseURL from 'src/utils/baseURL'
import OptionInteractor from 'src/interactors/options/OptionInteractor'
import { Option } from 'src/interactors/options/OptionMapper'
import routes from 'routes'
import Container from 'src/common/Container'
import Panel from '@components/common/Panel'
import Icon from '@components/common/Icon'
import { iconMap } from '@components/common/Icon'

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
      {/* <NextLink href={routes.options.edit(data.id)}>編集</NextLink>
      <NextLink href={routes.options.edit(data.id)}>削除</NextLink> */}
      <Heading as="h1" size="xl">
        {data.title}
      </Heading>
      <Flex justifyContent="space-between" mt={2}>
        <Author />
        <IconButton
          aria-label="toggle expanded"
          type="button"
          variant="ghost"
          icon={<Icon name={'ChevronDownIcon'} />}
        />
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
