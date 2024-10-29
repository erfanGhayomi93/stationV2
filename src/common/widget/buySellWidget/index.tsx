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
               <TabGroup className="grid grid-rows-min-one h-full max-h-full overflow-y-auto" selectedIndex={side === 'Buy' ? 0 : 1} onChange={index => setSide(tabs[index])}>
                    <TabList className={'flex border-b border-line-div-2 mx-4'}>
                         {tabs.map((item, ind) => (
                              <Tab
                                   key={ind}
                                   className={clsx(
                                        'flex-1 select-none text-sm text-content-deselecttab transition-colors focus:outline-none p-4',
                                        {
                                             'data-[selected]:border:content-success-buy data-[selected]:border-b-2 data-[selected]:text-content-success-buy':
                                                  side === 'Buy',
                                             'data-[selected]:border:content-error-sell data-[selected]:border-b-2 data-[selected]:text-content-error-sell':
                                                  side === 'Sell',
                                        }
                                   )}
                              >
                                   {t(`common.${item as TSide}`)}
                              </Tab>
                         ))}
                    </TabList>
                    <TabPanels className="overflow-x-hidden">
                         <TabPanel className="focus:border-none focus:outline-none h-full overflow-y-auto relative">
                              <div className='absolute top-0 w-full px-2'>
                                   <BodyBuySell />
                              </div>
                         </TabPanel>
                         <TabPanel className="focus:border-none focus:outline-none h-full overflow-y-auto relative">
                              <div className='absolute top-0 w-full px-2'>
                                   <BodyBuySell />
                              </div>
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
