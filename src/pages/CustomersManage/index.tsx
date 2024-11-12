import { useTabSlice } from '@store/tab';
import { createContext, Dispatch, SetStateAction, useCallback, useState } from 'react';
import CustomersMangeLayout from './layout';
import CustomerGroup from './widget/CustomerGroup';
import Customers from './widget/Customers';
import MyGroups from './widget/MyGroups';

export const CustomersContext = createContext<{
     customers: ICustomerAdvancedSearchRes[];
     setCustomers: Dispatch<SetStateAction<ICustomerAdvancedSearchRes[]>>;
}>({
     customers: [],
     setCustomers: () => null,
});

const CustomerManage = () => {
     const { customersManageTab } = useTabSlice();

     const [customers, setCustomers] = useState<ICustomerAdvancedSearchRes[]>([]);

     const CustomerTabRenderer = useCallback(() => {
          const components = {
               customers: <Customers />,
               customerGroup: <CustomerGroup />,
               myGroups: <MyGroups />,
          };

          return components[customersManageTab];
     }, [customersManageTab]);

     return (
          <CustomersContext.Provider
               value={{
                    customers,
                    setCustomers,
               }}
          >
               <CustomersMangeLayout>{<CustomerTabRenderer />}</CustomersMangeLayout>
          </CustomersContext.Provider>
     );
};

export default CustomerManage;
