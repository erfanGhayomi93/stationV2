import { CustomersContext } from '@pages/CustomersManage';
import Button from '@uiKit/Button';
import { useCallback, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import EmptyCustomerInformation from './EmptyCustomerInformation';
import MultiCustomerInformation from './MultiCustomerInformation';
import OneCustomerInformation from './OneCustomerInformation';

type TCustomerInformationTab = 'personalInformation' | 'financialStatus' | 'contracts';

const CustomerInformation = () => {
     const { t } = useTranslation();

     const { customers } = useContext(CustomersContext);

     console.log(customers, 'customers');

     const [selectCustomerInformationTab] = useState<TCustomerInformationTab>('personalInformation');

     const CustomerInformationSelectRender = useCallback(() => {
          const customerInformationSelectComponents = {
               emptyCustomers: <EmptyCustomerInformation />,
               oneCustomers: <OneCustomerInformation />,
               multiCustomers: <MultiCustomerInformation />,
          };
          const select = customers.length === 0 ? 'emptyCustomers' : customers.length === 1 ? 'oneCustomers' : 'multiCustomers';

          return customerInformationSelectComponents[select];
     }, [selectCustomerInformationTab, customers]);

     return (
          <section className="flex max-h-full flex-col items-center gap-4 overflow-hidden rounded-md bg-back-surface py-6">
               <CustomerInformationSelectRender />

               {customers.length !== 0 && (
                    <div className="flex w-full items-center gap-4 p-6 pb-0 shadow-E1">
                         <Button variant="primary-darkness">{t('customersManage.addGroupButton')}</Button>
                         <Button variant="primary-darkness-outline">{t('customersManage.createGroupButton')}</Button>
                    </div>
               )}
          </section>
     );
};

export default CustomerInformation;
