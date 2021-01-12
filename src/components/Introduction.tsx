import React, { VFC, memo } from 'react'
import { Box, Flex, Heading, Text, useMediaQuery } from '@chakra-ui/react'
import UnDraw from './shared/UnDraw'

const Introduction: VFC = () => {
  const [isLargerThan1280] = useMediaQuery('(min-width: 1280px)')
  return (
    <Box mb={20}>
      <Box>
        <Heading as="h1">多くの選択肢を</Heading>
        <Text my={4} fontWeight="600">
          自分の可能性を、選択肢を、可処分時間を最大化させる
        </Text>
      </Box>
      <Flex
        flexWrap="wrap"
        textAlign="center"
        justifyContent="space-around"
        color="black"
        bg="gray.100"
        borderRadius={4}
        py={8}
      >
        <Box p={2}>
          <Text a="p" fontWeight="700" mb={2}>
            選択肢を共有する
          </Text>
          <Box>
            <UnDraw name="ShareOpinion" />
          </Box>
        </Box>
        {isLargerThan1280 && (
          <>
            <Box p={2}>
              <Text as="p" fontWeight="700" mb={2}>
                選択肢を知る・広げる
              </Text>
              <Box>
                <UnDraw name="TeamWork" />
              </Box>
            </Box>
            <Box p={2}>
              <Text as="p" fontWeight="700" mb={2}>
                選択肢を出し合う
              </Text>
              <Box>
                <UnDraw name="Brainstorming" />
              </Box>
            </Box>
          </>
        )}
      </Flex>
    </Box>
  )
}

export default memo(Introduction)
