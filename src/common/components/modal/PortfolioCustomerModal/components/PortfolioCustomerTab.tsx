import { Tab, TabGroup, TabList } from '@headlessui/react';
import { useTabSlice } from '@store/tab';
import clsx from 'clsx';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

const PortfolioCustomerTab = () => {
     const { t } = useTranslation();

     const { portfolioCustomerTab, setPortfolioCustomerTab } = useTabSlice();

     const TABS = useMemo<{ id: TPortfolioCustomerTab; label: string }[]>(
          () => [
               {
                    id: 'portfolio',
                    label: t('portfolioCustomerModal.portfolioTab'),
               },
               {
                    id: 'positions',
                    label: t('portfolioCustomerModal.positionsTab'),
               },
          ],
          []
     );

     const handleChangeTab = (id: TPortfolioCustomerTab) => {
          setPortfolioCustomerTab(id);
     };

     return (
          <TabGroup>
               <TabList className="flex gap-x-4">
                    {TABS.map(({ id, label }) => (
                         <Tab
                              key={id}
                              className={clsx('tab-primary', portfolioCustomerTab === id && 'active')}
                              onClick={() => handleChangeTab(id)}
                         >
                              {label}
                         </Tab>
                    ))}
               </TabList>
          </TabGroup>
     );
};

export default PortfolioCustomerTab;
