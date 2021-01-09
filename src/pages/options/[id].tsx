import React from 'react'
import { NextPage, GetServerSideProps } from 'next'
import NextLink from 'next/link'
import useSWR from 'swr'
import {
  Divider,
  Heading,
  List,
  ListItem,
  ListIcon,
  IconButton,
  Stack,
  Flex,
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
} from '@chakra-ui/react'
import Author from '@components/Author'
import baseURL from 'src/utils/baseURL'
import OptionInteractor from 'src/interactors/options/OptionInteractor'
import { Option } from 'src/interactors/options/OptionMapper'
import routes from 'routes'
import Container from 'src/common/Container'
import Panel from '@components/Panel'
import Icon from '@components/Icon'
import { iconMap } from '@components/Icon'

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
      <Heading as="h1" size="xl">
        {data.title}
      </Heading>
      <Flex justifyContent="space-between" mt={2}>
        <Author createdAt={data.createdAt} />
        <Menu>
          <MenuButton>
            <Icon name={'ChevronDownIcon'} />
          </MenuButton>
          <MenuList>
            <MenuItem>編集</MenuItem>
            <MenuItem>削除</MenuItem>
          </MenuList>
        </Menu>
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
