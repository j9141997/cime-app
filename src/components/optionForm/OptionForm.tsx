import React, { VFC, useState, useCallback, ComponentProps } from 'react'
import { useRouter } from 'next/router'
import {
  FormControl,
  FormLabel,
  Button,
  Stack,
  CloseButton,
  Flex,
  useToast,
  Box,
} from '@chakra-ui/react'
import Panel from '@components/Panel'
import OptionInteractor from 'src/interactors/options/OptionInteractor'
import OptionMapper from 'src/interactors/options/OptionMapper'
import { Option } from 'src/interactors/options/OptionMapper'
import { Select, Form, Input } from '../shared'
import routes from 'src/routes'

type ContainerProps = {
  params?: Omit<Option, 'createdAt' | 'updatedAt'>
  method: 'POST' | 'PUT'
  onSubmitSuccess?: () => void
}

type Props = {
  onClickAddOptionField: () => void
  onClickRemoveOptionField: (i: number) => void
  onClickAddField: (fieldName: 'merits' | 'demerits', i: number) => void
  onClickRemoveField: (
    fieldName: 'merits' | 'demerits',
    i: number,
    j: number
  ) => void
  onSubmit: (data: any) => void
  indexes: {
    merits: number[]
    demerits: number[]
  }[]
  submitting: boolean
} & ContainerProps

// for Web Designer
const OptionComponent: VFC<Props> = ({
  onClickAddOptionField,
  onClickRemoveOptionField,
  onClickAddField,
  onClickRemoveField,
  onSubmit,
  indexes,
  submitting,
  params = {},
}) => (
  <Form submitting={submitting} onSubmit={onSubmit}>
    <Stack spacing={4}>
      <FormControl id="title" isRequired>
        <FormLabel fontWeight="bold">タイトル</FormLabel>
        <Input
          type="text"
          variant="unstyled"
          name="title"
          defaultValue={params.title}
          placeholder="Title..."
          size="lg"
          autoFocus={true}
        />
      </FormControl>
      <FormControl id="category" isRequired>
        <FormLabel fontWeight="bold">カテゴリ</FormLabel>
        <Select
          name="category"
          defaultValue={params.category || ''}
          options={OptionMapper.CATEGORY_OPTIONS}
        />
      </FormControl>
      {indexes.map((item, i) => (
        <Panel
          title={`選択肢 #${i + 1}`}
          titleSize="sm"
          key={`option-${i}`}
          onClose={() => onClickRemoveOptionField(i)}
          disabled={indexes.length <= 1}
          defaultIsExpanded={true}
        >
          <Stack spacing={2}>
            <FormControl id="options" isRequired>
              <FormLabel fontWeight="bold">選択肢</FormLabel>
              <Input
                type="text"
                name={`options.${i}.name`}
                defaultValue={params.options[i]?.name}
                mr={1}
              />
            </FormControl>
            <FormControl id="merits" isRequired>
              <FormLabel fontWeight="bold">メリット</FormLabel>
              <Stack spacing={1}>
                {item.merits.map((j, _, array) => (
                  <Flex key={`merits${j}`} alignItems="center" w="100%">
                    <Input
                      type="text"
                      name={`options.${i}.merits.${j}`}
                      defaultValue={params.options[i]?.merits[j]}
                      mr={1}
                    />
                    <CloseButton
                      size="sm"
                      disabled={array.length < 2}
                      onClick={() => onClickRemoveField('merits', i, j)}
                    />
                  </Flex>
                ))}
              </Stack>
              <Button
                type="button"
                mt={1}
                size="xs"
                onClick={() => onClickAddField('merits', i)}
              >
                追加する
              </Button>
            </FormControl>
            <FormControl id="demerits" isRequired>
              <FormLabel fontWeight="bold">デメリット</FormLabel>
              <Stack spacing={1}>
                {item.demerits.map((j, _, array) => (
                  <Flex key={`demerits${j}`} alignItems="center" w="100%">
                    <Input
                      type="text"
                      name={`options.${i}.demerits.${j}`}
                      defaultValue={params.options[i]?.demerits[j]}
                      mr={1}
                    />
                    <CloseButton
                      type="button"
                      size="sm"
                      disabled={array.length < 2}
                      onClick={() => onClickRemoveField('demerits', i, j)}
                    />
                  </Flex>
                ))}
              </Stack>
              <Button
                type="button"
                mt={1}
                size="xs"
                onClick={() => onClickAddField('demerits', i)}
              >
                追加する
              </Button>
            </FormControl>
          </Stack>
        </Panel>
      ))}
    </Stack>
    <Box w="100%">
      <Button
        type="button"
        mt={1}
        size="sm"
        textAlign="start"
        onClick={onClickAddOptionField}
      >
        選択肢を増やす
      </Button>
    </Box>
  </Form>
)

// for Frontend Developer
const OptionContainer: VFC<ContainerProps> = ({ params, method, ...props }) => {
  const router = useRouter()
  const toast = useToast()
  const action = method === 'POST' ? 'post' : 'update'
  const [submitting, setSubmitting] = useState(false)
  const [indexes, setIndexes] = useState(
    params.options.map((option) => ({
      merits: option.merits?.length ? option.merits.map((_, j) => j) : [0],
      demerits: option.demerits?.length
        ? option.demerits.map((_, j) => j)
        : [0],
    }))
  )
  const [counter, setCounter] = useState(
    params.options.length
      ? params.options.map((option) => ({
          merits: option.merits?.length || 1,
          demerits: option.demerits?.length || 1,
        }))
      : [{ merits: 1, demerits: 1 }]
  )

  const handleAddOptionField = useCallback(() => {
    const newIndexes = [].concat(indexes)
    const newCounter = [].concat(counter)
    newIndexes.push({ merits: [0], demerits: [0] })
    newCounter.push({ merits: 1, demerits: 1 })
    setIndexes(newIndexes)
    setCounter(newCounter)
  }, [counter, indexes])

  const handleRemoveOptionField = useCallback(
    (i) => {
      const newValue = [].concat(indexes)
      newValue.splice(i, 1)
      setIndexes(newValue)
    },
    [indexes]
  )

  const handleAddField: ComponentProps<
    typeof OptionComponent
  >['onClickAddField'] = useCallback(
    (fieldName, i) => {
      const newValue = [].concat(indexes)
      const newCounter = [].concat(counter)
      newValue[i][fieldName].push(counter[i][fieldName])
      newCounter[i][fieldName] = newCounter[i][fieldName] + 1
      setIndexes(newValue)
      setCounter(newCounter)
    },
    [counter, indexes]
  )

  const handleRemoveField: ComponentProps<
    typeof OptionComponent
  >['onClickRemoveField'] = useCallback(
    (fieldName, i, j) => {
      const newValue = Object.assign([], indexes)
      const newCounter = [].concat(counter)
      newValue[i][fieldName] = newValue[i][fieldName].filter(
        (num: number) => num !== j
      )
      newCounter[i][fieldName] = newCounter[i][fieldName] + 1
      setIndexes(newValue)
      setCounter(newCounter)
    },
    [counter, indexes]
  )

  const handleSubmit = useCallback(
    async (data) => {
      setSubmitting(true)
      try {
        const result = await new OptionInteractor()[action]({
          id: params.id,
          ...data,
        })
        console.log(result)
        toast({
          position: 'bottom-left',
          title: 'Article Created!!',
          description: '選択肢の公開に成功しました。',
          status: 'success',
          isClosable: true,
        })
        if (props.onSubmitSuccess) {
          props.onSubmitSuccess()
        }
        router.push(routes.root)
      } catch (e) {
        console.error(e)
        setSubmitting(false)
        toast({
          position: 'bottom-left',
          title: 'An error occurred.',
          description: '選択肢の公開に失敗しました。',
          status: 'error',
          isClosable: true,
        })
      }
    },
    [action, params.id, toast, props, router]
  )

  return (
    <OptionComponent
      onClickAddOptionField={handleAddOptionField}
      onClickRemoveOptionField={handleRemoveOptionField}
      onClickAddField={handleAddField}
      onClickRemoveField={handleRemoveField}
      onSubmit={handleSubmit}
      indexes={indexes}
      submitting={submitting}
      params={params}
      method={method}
      {...props}
    />
  )
}

OptionContainer.defaultProps = {
  params: {
    id: '',
    title: '',
    options: [
      {
        name: '',
        merits: [],
        demerits: [],
      },
    ],
  },
}

export default OptionContainer
