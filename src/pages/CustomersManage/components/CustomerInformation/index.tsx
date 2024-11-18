import { CustomersContext } from '@pages/CustomersManage/context';
import { useModalStore } from '@store/modal';
import { useTabSlice } from '@store/tab';
import Button from '@uiKit/Button';
import { useCallback, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import EmptyCustomerInformation from './EmptyCustomerInformation';
import MultiCustomerInformation from './MultiCustomerInformation';
import OneCustomerInformation from './OneCustomerInformation';

type TCustomerInformationTab = 'personalInformation' | 'financialStatus' | 'contracts';

const CustomerInformation = () => {
     const { t } = useTranslation();

     const { customersManageTab } = useTabSlice();

     const { customers, customerGroup, myGroups } = useContext(CustomersContext);

     const { setCreateNewCustomerGroupModal, setAddCustomersToGroupModal } = useModalStore();

     const [selectCustomerInformationTab] = useState<TCustomerInformationTab>('personalInformation');

     const CustomerInformationSelectRender = useCallback(() => {
          const selectDataMultiCustomer = {
               customers,
               customerGroup,
               myGroups,
          };

          const customerInformationSelectComponents = {
               emptyCustomers: <EmptyCustomerInformation />,
               oneCustomers: <OneCustomerInformation />,
               multiCustomers: <MultiCustomerInformation data={selectDataMultiCustomer[customersManageTab]} />,
          };
          const select =
               selectDataMultiCustomer[customersManageTab].length === 0
                    ? 'emptyCustomers'
                    : customers.length === 1 && customersManageTab === 'customers'
                      ? 'oneCustomers'
                      : 'multiCustomers';

          return customerInformationSelectComponents[select];
     }, [selectCustomerInformationTab, customers, customerGroup, myGroups]);

     const handleCreateCustomerGroup = () => {
          setCreateNewCustomerGroupModal(true);
     };

     const handleAddCustomersToGroup = () => {
          if (customersManageTab === 'customers') {
               setAddCustomersToGroupModal({ customers: customers.map(customer => customer.customerISIN) });
          }
          if (customersManageTab === 'customerGroup') {
               setAddCustomersToGroupModal({ customers: customerGroup.map(customer => customer.customerISIN) });
          }
          if (customersManageTab === 'myGroups') {
               setAddCustomersToGroupModal({ customers: myGroups.map(customer => customer.customerISIN) });
          }
     };

     return (
          <section className="flex max-h-full flex-col items-center gap-4 overflow-hidden rounded-md bg-back-surface py-6">
               <CustomerInformationSelectRender />

               {(customers.length !== 0 || customerGroup.length !== 0 || myGroups.length !== 0) && (
                    <div className="flex w-full items-center gap-4 p-6 pb-0 shadow-E1">
                         <Button onClick={handleAddCustomersToGroup} variant="primary-darkness">
                              {t('customersManage.addGroupButton')}
                         </Button>
                         <Button onClick={handleCreateCustomerGroup} variant="primary-darkness-outline">
                              {t('customersManage.createGroupButton')}
                         </Button>
                    </div>
               )}
          </section>
     );
};

export default CustomerInformation;
