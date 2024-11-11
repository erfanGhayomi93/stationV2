import { useTabSlice } from '@store/tab';
import { useCallback } from 'react';
import CustomersMangeLayout from './layout';
import CustomerGroup from './widget/CustomerGroup';
import Customers from './widget/Customers';
import MyGroups from './widget/MyGroups';

const CustomerManage = () => {
     const { customersManageTab, setCustomersManageTab } = useTabSlice();

     const CustomerTabRenderer = useCallback(() => {
          const components = {
               customers: <Customers />,
               customerGroup: <CustomerGroup />,
               myGroups: <MyGroups />,
          };

          return components[customersManageTab];
     }, [customersManageTab]);

     return <CustomersMangeLayout>{<CustomerTabRenderer />}</CustomersMangeLayout>;
};

export default CustomerManage;
