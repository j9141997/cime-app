import React, { ReactElement, VFC } from 'react'
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react'

type Props = {
  tabs: {
    key: string
    name: string
    Component: ReactElement
  }[]
}

const TabLayout: VFC<Props> = ({ tabs }) => {
  return (
    <Tabs>
      <TabList>
        {tabs.map((tab, i) => (
          <Tab key={`tab-${tab.key}-${i}`}>{tab.name}</Tab>
        ))}
      </TabList>

      <TabPanels>
        {tabs.map((tab, i) => (
          <TabPanel
            key={`tabPanel-${tab.key}-${i}`}
            css={{ padding: '1rem 0', outline: 0 }}
          >
            {tab.Component}
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  )
}

export default TabLayout
