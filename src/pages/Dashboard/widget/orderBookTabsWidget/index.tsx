import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import MarketDepthTab from '@pages/Dashboard/components/marketDepth';
import OptionContracts from '@pages/Dashboard/components/OptionContracts';
import SameGroups from '@pages/Dashboard/components/SameGroups';
import SupervisorMessage from '@pages/Dashboard/components/SupervisorMessages';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const OrderBookTabsWidget = () => {
     const [selectedIndex, setSelectedIndex] = useState(0);
     const { t } = useTranslation();

     const tabs = [
          t('orderBookTabs.marketDepthTab'),
          t('orderBookTabs.sameGroupTab'),
          t('orderBookTabs.optionContractTab'),
          t('orderBookTabs.messagesTab'),
     ];

     return (
          <TabGroup className="grid h-full grid-rows-min-one p-4" selectedIndex={selectedIndex} onChange={setSelectedIndex}>
               <TabList className={'flex gap-x-2 border-b border-line-div-2'}>
                    {tabs.map((item, ind) => (
                         <Tab
                              key={ind}
                              className="flex-1 py-2 text-xs text-content-deselecttab transition-colors focus:outline-none data-[selected]:border-b-2 data-[selected]:border-content-selected data-[selected]:font-bold data-[selected]:text-content-selected data-[focus]:outline-none"
                         >
                              {item}
                         </Tab>
                    ))}
               </TabList>
               <TabPanels className="data-[selected]:bg-line-error">
                    <TabPanel className={'h-full py-2'}>
                         <MarketDepthTab />
                    </TabPanel>
                    <TabPanel>
                         <SameGroups />
                    </TabPanel>
                    <TabPanel>
                         <OptionContracts />
                    </TabPanel>
                    <TabPanel>
                         <SupervisorMessage />
                    </TabPanel>
               </TabPanels>
          </TabGroup>
     );
};

export default OrderBookTabsWidget;
