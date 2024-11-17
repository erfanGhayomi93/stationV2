import { Tab, TabGroup, TabList } from '@headlessui/react';
import { useTabSlice } from '@store/tab';
import clsx from 'clsx';
import { useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { CustomersContext } from '../context';

const CustomersManageTab = () => {
     const { t } = useTranslation();

     const { resetCustomersState } = useContext(CustomersContext);

     const { customersManageTab, setCustomersManageTab } = useTabSlice();

     const TABS = useMemo<{ id: TCustomersManageTab; label: string }[]>(
          () => [
               { id: 'customers', label: t('customersManage.customersTab') },
               { id: 'customerGroup', label: t('customersManage.customerGroupTab') },
               { id: 'myGroups', label: t('customersManage.myGroupsTab') },
          ],
          []
     );

     const handleClickTab = (id: TCustomersManageTab) => {
          setCustomersManageTab(id);
          if (customersManageTab !== id) {
               resetCustomersState();
          }
     };

     return (
          <TabGroup>
               <TabList className="flex gap-x-4">
                    {TABS.map(({ id, label }) => (
                         <Tab
                              className={clsx('tab-primary', id === customersManageTab && 'active')}
                              onClick={() => {
                                   handleClickTab(id);
                              }}
                         >
                              {label}
                         </Tab>
                    ))}
               </TabList>
          </TabGroup>
     );
};

export default CustomersManageTab;
