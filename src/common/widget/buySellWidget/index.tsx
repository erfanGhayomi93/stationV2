import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import BodyBuySell from './components/bodyBuySell';
import { BuySellProviderContext, useBuySellContext } from './context/buySellContext';

const BuySellWidget = () => {
     const { t } = useTranslation();

     const { side, setSide } = useBuySellContext();

     const tabs: TSide[] = ['Buy', 'Sell'];

     return (
          <div className="h-full">
               <TabGroup className="relative" selectedIndex={side === 'Buy' ? 0 : 1} onChange={index => setSide(tabs[index])}>
                    <TabList className={'flex gap-x-2 border-b border-line-div-2'}>
                         {tabs.map((item, ind) => (
                              <Tab
                                   key={ind}
                                   className={clsx('flex-1 py-2 text-content-deselecttab transition-colors focus:outline-none select-none text-sm', {
                                        'data-[selected]:border:content-success-buy data-[selected]:border-b-2 data-[selected]:text-content-success-buy':
                                             side === 'Buy',
                                        'data-[selected]:border:content-error-sell data-[selected]:border-b-2 data-[selected]:text-content-error-sell':
                                             side === 'Sell',
                                   })}       
                              >
                                   {t(`common.${item as TSide}`)}
                              </Tab>
                         ))}
                    </TabList>
                    <TabPanels className="px-2">
                         <TabPanel className="focus:outline-none focus:border-none">
                              <BodyBuySell />
                         </TabPanel>
                         <TabPanel className="focus:outline-none focus:border-none">
                              <BodyBuySell />
                         </TabPanel>
                    </TabPanels>
               </TabGroup>
          </div>
     );
};

export const BuySellWidgetWrapper = () => {
     return (
          <BuySellProviderContext>
               <BuySellWidget />
          </BuySellProviderContext>
     );
};

export default BuySellWidgetWrapper;
