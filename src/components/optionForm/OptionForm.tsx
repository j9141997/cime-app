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
} from '@chakra-ui/react'
import Form from '@components/common/Form'
import OptionInteractor from 'src/interactors/options/OptionInteractor'
import { Option } from 'src/interactors/options/OptionMapper'
import { Input } from '@components/common'
import routes from 'routes'

type ContainerProps = {
  params?: Option
  method: 'POST' | 'PUT'
}

type Props = {
  onClickAddField: (fieldName: 'merits' | 'demerits') => void
  onClickRemoveField: (fieldName: 'merits' | 'demerits', index: number) => void
  onSubmit: (data: any) => void
  indexes: {
    merits: number[]
    demerits: number[]
  }
  submitting: boolean
} & Omit<ContainerProps, 'method'>
// for Web Designer
const Component: VFC<Props> = ({
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
        <FormLabel>タイトル</FormLabel>
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
      <FormControl id="merits" isRequired>
        <FormLabel>メリット</FormLabel>
        <VStack spacing={1}>
          {indexes.merits.map((i, _, array) => (
            <Flex key={`merits${i}`} alignItems="center" w="100%">
              <Input type="text" name={`merits[${i}]`} mr={1} />
              <CloseButton
                size="sm"
                disabled={array.length < 2}
                onClick={() => onClickRemoveField('merits', i)}
              />
            </Flex>
          ))}
        </VStack>
        <Button
          type="button"
          mt={1}
          size="xs"
          onClick={() => onClickAddField('merits')}
        >
          追加する
        </Button>
      </FormControl>
      <FormControl id="demerits" isRequired>
        <FormLabel>デメリット</FormLabel>
        <VStack spacing={1}>
          {indexes.demerits.map((i, _, array) => (
            <Flex key={`demerits${i}`} alignItems="center" w="100%">
              <Input type="text" name={`demerits[${i}]`} mr={1} />
              <CloseButton
                type="button"
                size="sm"
                disabled={array.length < 2}
                onClick={() => onClickRemoveField('demerits', i)}
              />
            </Flex>
          ))}
        </VStack>
        <Button
          type="button"
          mt={1}
          size="xs"
          onClick={() => onClickAddField('demerits')}
        >
          追加する
        </Button>
      </FormControl>
    </VStack>
  </Form>
)

// for Frontend Developer
const Container: VFC<ContainerProps> = ({ params, method }) => {
  const toast = useToast()
  const router = useRouter()
  const action = method === 'POST' ? 'post' : 'update'
  const [submitting, setSubmitting] = useState(false)
  const [indexes, setIndexes] = useState({
    merits: params.merits?.length ? params.merits.map((_, i) => i) : [0],
    demerits: params.demerits?.length ? params.demerits.map((_, i) => i) : [0],
  })
  const [counter, setCounter] = useState({
    merits: params.merits?.length || 1,
    demerits: params.demerits?.length || 1,
  })

  const handleAddField: ComponentProps<
    typeof Component
  >['onClickAddField'] = useCallback(
    (fieldName) => {
      setIndexes((prevState) => {
        return {
          ...prevState,
          [fieldName]: [...prevState[fieldName], counter[fieldName]],
        }
      })
      setCounter((prevState) => ({
        ...prevState,
        [fieldName]: prevState[fieldName] + 1,
      }))
    },
    [counter]
  )

  const handleRemoveField: ComponentProps<
    typeof Component
  >['onClickRemoveField'] = useCallback((fieldName, index) => {
    setIndexes((prevState) => ({
      ...prevState,
      [fieldName]: prevState[fieldName].filter((item) => item !== index),
    }))
    setCounter((prevState) => ({
      ...prevState,
      [fieldName]: prevState[fieldName] - 1,
    }))
  }, [])

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
    [action, toast, router]
  )

  return (
    <Component
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
    merits: [],
    demerits: [],
  },
}

export default memo(Container)
