import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import MarketDepthTab from '@pages/Dashboard/components/marketDepth'
import Button from '@uiKit/Button'
import { useState } from 'react'


const OrderBookTabsWidget = () => {

    const [selectedIndex, setSelectedIndex] = useState(0)



    return (
        <TabGroup selectedIndex={selectedIndex} onChange={setSelectedIndex}>
            <TabList className={"flex gap-x-2"}>
                <Tab className="flex-1" as={Button} variant='primary' >Tab 1</Tab>
                <Tab className="flex-1" as={Button} variant='secondary' >Tab 2</Tab>
                <Tab className="flex-1" as={Button} variant='danger' >Tab 3</Tab>
            </TabList>
            <TabPanels>
                <TabPanel className={"mt-4"}>
                    <MarketDepthTab />
                </TabPanel>
                <TabPanel>Content 2</TabPanel>
                <TabPanel>Content 3</TabPanel>
            </TabPanels>
        </TabGroup>
    )
}

export default OrderBookTabsWidget