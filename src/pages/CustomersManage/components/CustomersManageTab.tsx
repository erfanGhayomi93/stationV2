import { Tab, TabGroup, TabList } from '@headlessui/react';
import { useTabSlice } from '@store/tab';
import clsx from 'clsx';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

const CustomersManageTab = () => {
     const { t } = useTranslation();

     const { customersManageTab, setCustomersManageTab } = useTabSlice();

     const TABS = useMemo<{ id: TCustomersManageTab; label: string }[]>(
          () => [
               { id: 'customers', label: t('customersManage.customersTab') },
               { id: 'customerGroup', label: t('customersManage.customerGroupTab') },
               { id: 'myGroups', label: t('customersManage.myGroupsTab') },
          ],
          []
     );

     return (
          <TabGroup>
               <TabList className="flex gap-x-4">
                    {TABS.map(({ id, label }) => (
                         <Tab
                              className={clsx('tab-primary', id === customersManageTab && 'active')}
                              onClick={() => setCustomersManageTab(id)}
                         >
                              {label}
                         </Tab>
                    ))}
               </TabList>
          </TabGroup>
     );
};

export default CustomersManageTab;
