import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import MarketDepthTab from '@pages/Dashboard/components/marketDepth'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'


const OrderBookTabsWidget = () => {

    const [selectedIndex, setSelectedIndex] = useState(0)
    const { t } = useTranslation()


    const tabs = [t('orderBookTabs.marketDepthTab'), t('orderBookTabs.sameGroupTab'), t('orderBookTabs.optionContractTab'), t('orderBookTabs.messagesTab')]



    return (
        <TabGroup selectedIndex={selectedIndex} onChange={setSelectedIndex}>
            <TabList className={"flex gap-x-2 border-b border-line-div-2"}>
                {
                    tabs.map((item, ind) => (
                        <Tab key={ind}
                            className="flex-1 text-content-deselecttab data-[selected]:text-content-selected data-[selected]:border-b-2 data-[selected]:border-content-selected py-2 transition-colors text-sm"
                        >{item}</Tab>
                    ))
                }
            </TabList>
            <TabPanels>
                <TabPanel className={"mt-4"}>
                    <MarketDepthTab />
                </TabPanel>
                <TabPanel>Content 2</TabPanel>
                <TabPanel>Content 3</TabPanel>
                <TabPanel>Content 4</TabPanel>
            </TabPanels>
        </TabGroup>
    )
}

export default OrderBookTabsWidget