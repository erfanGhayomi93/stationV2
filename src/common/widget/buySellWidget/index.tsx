import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import BodyBuySell from './components/bodyBuySell';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import clsx from 'clsx';

const BuySellWidget = () => {
     const { t } = useTranslation();

     const [tabSelected, setTabSelected] = useState(0);

     const tabs = [t('common.buy'), t('common.sell')]

     useEffect(() => {
          console.log("tabSelected", tabSelected)
     }, [tabSelected])



     return (
          <div className="overflow-y-auto">
               <TabGroup className="overflow-y-auto relative" selectedIndex={tabSelected} onChange={setTabSelected}>
                    <TabList className={"flex gap-x-2 border-b border-line-div-2"}>
                         {
                              tabs.map((item, ind) => (
                                   <Tab key={ind}
                                        className={clsx("flex-1 text-content-deselecttab py-2 transition-colors", {
                                             "data-[selected]:text-content-success-buy data-[selected]:border-b-2 data-[selected]:border:content-success-buy": tabSelected === 0,
                                             "data-[selected]:text-content-error-sell data-[selected]:border-b-2 data-[selected]:border:content-error-sell": tabSelected === 1
                                        })}
                                   >
                                        {item}
                                   </Tab>
                              ))
                         }
                    </TabList>
                    <TabPanels className="overflow-y-auto px-2">
                         <TabPanel className="">
                              <BodyBuySell
                                   side={"Buy"}
                              />
                         </TabPanel>
                         <TabPanel>
                              <BodyBuySell
                                   side={"Sell"}
                              />
                         </TabPanel>
                    </TabPanels>
               </TabGroup>
          </div>
     );
};

export default BuySellWidget;
