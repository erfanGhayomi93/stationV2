import { DraftOutlineIcon } from '@assets/icons';
import { Tab, TabGroup, TabList } from '@headlessui/react';
import { useModalStore } from '@store/modal';
import { useTabSlice } from '@store/tab';
import clsx from 'clsx';
import { useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { CustomersContext } from '../context';

const CustomersManageTab = () => {
     const { t } = useTranslation();

     const { resetCustomersState } = useContext(CustomersContext);

     const { setManageCustomerGroupModal } = useModalStore();

     const { customersManageTab, setCustomersManageTab } = useTabSlice();

     const TABS = useMemo<{ id: TCustomersManageTab; label: string }[]>(
          () => [
               { id: 'customers', label: t('customersManage.customersTab') },
               { id: 'customerGroup', label: t('customersManage.customerGroupTab') },
               { id: 'myGroups', label: t('customersManage.myGroupsTab') },
          ],
          []
     );

     const handleChangeTab = (id: TCustomersManageTab) => {
          setCustomersManageTab(id);
          if (customersManageTab !== id) {
               resetCustomersState();
          }
     };

     const handleManageCustomerGroup = () => {
          setManageCustomerGroupModal(true);
     };

     return (
          <div className="flex items-center gap-4">
               <TabGroup>
                    <TabList className="flex gap-x-4">
                         {TABS.map(({ id, label }) => (
                              <Tab
                                   key={id}
                                   className={clsx('tab-primary', id === customersManageTab && 'active')}
                                   onClick={() => {
                                        handleChangeTab(id);
                                   }}
                              >
                                   {label}
                              </Tab>
                         ))}
                    </TabList>
               </TabGroup>

               <button
                    onClick={handleManageCustomerGroup}
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-button-tab-deactive text-icon-default"
               >
                    <DraftOutlineIcon />
               </button>
          </div>
     );
};

export default CustomersManageTab;
