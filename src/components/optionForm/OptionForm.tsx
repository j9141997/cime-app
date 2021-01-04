import React, { memo, VFC, useState, useCallback, ComponentProps } from 'react'
import { useRouter } from 'next/router'
import {
  FormControl,
  FormLabel,
  Button,
  VStack,
  CloseButton,
  Flex,
  useToast,
  Box,
} from '@chakra-ui/react'
import Form from '@components/common/Form'
import Panel from '@components/common/Panel'
import OptionInteractor from 'src/interactors/options/OptionInteractor'
import { Option } from 'src/interactors/options/OptionMapper'
import { Input } from '@components/common'
import routes from 'routes'

type ContainerProps = {
  params?: Option
  method: 'POST' | 'PUT'
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
} & Omit<ContainerProps, 'method'>
// for Web Designer
const Component: VFC<Props> = ({
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
    <VStack spacing={4}>
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
      {indexes.map((item, i) => (
        <Panel
          title={`選択肢 #${i + 1}`}
          key={`option-${i}`}
          onClose={() => onClickRemoveOptionField(i)}
          disabled={indexes.length <= 1}
          defaultIsExpanded={true}
        >
          <VStack spacing={2}>
            <FormControl id="options" isRequired>
              <FormLabel fontWeight="bold">選択肢</FormLabel>
              <Input type="text" name="optionName" mr={1} />
            </FormControl>
            <FormControl id="merits" isRequired>
              <FormLabel fontWeight="bold">メリット</FormLabel>
              <VStack spacing={1}>
                {item.merits.map((j, _, array) => (
                  <Flex key={`merits${j}`} alignItems="center" w="100%">
                    <Input type="text" name={`merits[${j}]`} mr={1} />
                    <CloseButton
                      size="sm"
                      disabled={array.length < 2}
                      onClick={() => onClickRemoveField('merits', i, j)}
                    />
                  </Flex>
                ))}
              </VStack>
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
              <VStack spacing={1}>
                {item.demerits.map((j, _, array) => (
                  <Flex key={`demerits${j}`} alignItems="center" w="100%">
                    <Input type="text" name={`demerits[${j}]`} mr={1} />
                    <CloseButton
                      type="button"
                      size="sm"
                      disabled={array.length < 2}
                      onClick={() => onClickRemoveField('demerits', i, j)}
                    />
                  </Flex>
                ))}
              </VStack>
              <Button
                type="button"
                mt={1}
                size="xs"
                onClick={() => onClickAddField('demerits', i)}
              >
                追加する
              </Button>
            </FormControl>
          </VStack>
        </Panel>
      ))}
    </VStack>
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
const Container: VFC<ContainerProps> = ({ params, method }) => {
  const toast = useToast()
  const router = useRouter()
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
    counter.push({ merits: 1, demerits: 1 })
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
    typeof Component
  >['onClickAddField'] = useCallback(
    (fieldName, i) => {
      const newValue = [].concat(indexes)
      newValue[i][fieldName].push(counter[fieldName])
      setIndexes(newValue)
      setCounter((prevState) => ({
        ...prevState,
        [fieldName]: prevState[fieldName] + 1,
      }))
    },
    [counter, indexes]
  )

  const handleRemoveField: ComponentProps<
    typeof Component
  >['onClickRemoveField'] = useCallback(
    (fieldName, i, j) => {
      const newValue = Object.assign([], indexes)
      newValue[i][fieldName] = newValue[i][fieldName].filter(
        (num: number) => num !== j
      )
      setIndexes(newValue)
      setCounter((prevState) => ({
        ...prevState,
        [fieldName]: prevState[fieldName] - 1,
      }))
    },
    [indexes]
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
    [action, params.id, toast, router]
  )

  return (
    <Component
      onClickAddOptionField={handleAddOptionField}
      onClickRemoveOptionField={handleRemoveOptionField}
      onClickAddField={handleAddField}
      onClickRemoveField={handleRemoveField}
      onSubmit={handleSubmit}
      indexes={indexes}
      submitting={submitting}
      params={params}
    />
  )
}

Container.defaultProps = {
  params: {
    id: '',
    title: '',
    options: [
      {
        merits: [],
        demerits: [],
      },
    ],
  },
}

export default memo(Container)
