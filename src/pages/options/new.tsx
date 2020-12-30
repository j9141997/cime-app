import React from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import { Box, FormControl, FormLabel, Input } from '@chakra-ui/react'
import Form from '@components/common/Form'

const NewPage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Create yoshida App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box>
        <Form>
          <FormControl id="title">
            <FormLabel>Title</FormLabel>
            <Input type="text" name="title" />
          </FormControl>
        </Form>
      </Box>
    </div>
  )
}

export default NewPage
