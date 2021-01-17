import React, { VFC } from 'react'
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
import Container from 'src/common/Container'
import Author from '@components/Author'
import Panel from '@components/Panel'
import Icon, { iconMap } from '@components/shared/Icon'
import ModalForm from '@components/ModalForm'
import { Option } from 'src/interactors/options/OptionMapper'
import { OptionForm } from '@components/optionForm'

type Props = {
  data: Option
  onOpen: (component: JSX.Element) => void
  onClose: () => void
  onSubmit: (bool: boolean) => void
  onSubmitSuccess: () => void
  submitting: boolean
}

const OptionPresenter: VFC<Props> = ({
  data,
  onOpen,
  onClose,
  onSubmit,
  onSubmitSuccess,
  submitting,
}) => (
  <Container>
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
          onClick={() =>
            onOpen(
              <OptionForm
                params={data}
                method="PUT"
                onSubmitSuccess={onSubmitSuccess}
              />
            )
          }
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
                onSubmit={onSubmit}
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
    <Stack spacing={4}>
      {data.options.map((option, i) => (
        <Panel
          key={`option-${i}`}
          title={`${i + 1}. ${option.name}`}
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
    </Stack>
  </Container>
)

export default OptionPresenter
