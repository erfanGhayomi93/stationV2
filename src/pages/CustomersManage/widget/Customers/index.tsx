import { useQueryCustomerSearch, useQueryDefaultCustomer } from '@api/customer';
import useDebounce from '@hooks/useDebounce';
import CustomersManageFilters from '@pages/CustomersManage/components/CustomersManageFilters';

import CustomersTable from '@pages/CustomersManage/widget/Customers/components/CustomersTable';
import { useMemo, useState } from 'react';
import CustomersInformation from './components/CustomerInformation';

type TCustomerType = 'Natural' | 'Legal' | 'All';

const Customers = () => {
     const [term, setTerm] = useState('');

     const [customerType, setCustomerType] = useState<TCustomerType>('All');

     const { data: searchCustomers } = useQueryCustomerSearch({ term: useDebounce(term, 400), customerType });

     const { data: defaultCustomers } = useQueryDefaultCustomer();

     const isDefaultUse = useMemo(() => !term?.length, [term]);

     const listGroups = useMemo(() => {
          return isDefaultUse ? defaultCustomers : searchCustomers;
     }, [defaultCustomers, searchCustomers, isDefaultUse]);

     return (
          <>
               <div className="grid grid-rows-min-one gap-6 rounded-md bg-back-surface p-6">
                    <CustomersManageFilters
                         onChangeSearchInput={value => setTerm(value)}
                         onChangeSelectInput={item => setCustomerType(item.id as TCustomerType)}
                    />
                    <CustomersTable data={listGroups} />
               </div>

               <CustomersInformation />
          </>
     );
};

export default Customers;
