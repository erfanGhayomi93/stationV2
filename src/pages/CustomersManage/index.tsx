import { useTabSlice } from '@store/tab';
import { useCallback } from 'react';
import CustomerInformation from './components/CustomerInformation';
import CustomersManageTabs from './components/CustomersManageTab';
import CustomerContextProvider from './context';
import CustomersMangeLayout from './layout';
import CustomerGroup from './widget/CustomerGroup';
import Customers from './widget/Customers';
import MyGroups from './widget/MyGroups';

const CustomerManage = () => {
     const { customersManageTab } = useTabSlice();

     const CustomerCategoryRenderer = useCallback(() => {
          const components = {
               customers: <Customers />,
               customerGroup: <CustomerGroup />,
               myGroups: <MyGroups />,
          };

          return components[customersManageTab];
     }, [customersManageTab]);

     return (
          <CustomerContextProvider>
               <CustomersMangeLayout>
                    {
                         <>
                              <div className="grid grid-cols-2 grid-rows-min-one gap-6 rounded-md bg-back-surface p-6">
                                   <CustomersManageTabs />

                                   <CustomerCategoryRenderer />
                              </div>
                              <CustomerInformation />
                         </>
                    }
               </CustomersMangeLayout>
          </CustomerContextProvider>
     );
};

export default CustomerManage;
