import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import MarketDepthDisplay from '@pages/Dashboard/components/MarketDepthDisplay';
import OptionContracts from '@pages/Dashboard/components/OptionContracts';
import SameGroups from '@pages/Dashboard/components/SameGroups';
import SupervisorMessage from '@pages/Dashboard/components/SupervisorMessages';
import { memo, useMemo, useState, useTransition } from 'react';
import { useTranslation } from 'react-i18next';

const OrderBookTabsWidget = () => {
     const [selectedIndex, setSelectedIndex] = useState(0);

     const [isPending, startTransition] = useTransition()

     const { t } = useTranslation();

     const tabs = useMemo(() => [
          t('orderBookTabs.marketDepthTab'),
          t('orderBookTabs.sameGroupTab'),
          t('orderBookTabs.optionContractTab'),
          t('orderBookTabs.messagesTab'),
     ], []);

     const handleTabChange = (ind: number) => {
          startTransition(() => {
               setSelectedIndex(ind)
          })
     }



     return (
          <TabGroup className="grid h-full grid-rows-min-one p-2" selectedIndex={selectedIndex} onChange={handleTabChange}>
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
               {
                    !isPending && (
                         <TabPanels className="data-[selected]:bg-line-error overflow-y-auto mt-1 relative">
                              <TabPanel className={'h-full py-2'}>
                                   {<MarketDepthDisplay />}
                              </TabPanel>
                              <TabPanel className="h-full">
                                   <SameGroups />
                              </TabPanel>
                              <TabPanel className="h-full">
                                   <OptionContracts />
                              </TabPanel>
                              <TabPanel className="h-full">
                                   <SupervisorMessage />
                              </TabPanel>
                         </TabPanels>
                    )
               }
          </TabGroup>
     );
};

export default memo(OrderBookTabsWidget);
