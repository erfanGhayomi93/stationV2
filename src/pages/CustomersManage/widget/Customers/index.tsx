import { useQueryCustomerSearch, useQueryDefaultCustomer } from '@api/customer';
import useDebounce from '@hooks/useDebounce';
import CustomersManageFilters from '@pages/CustomersManage/components/CustomersManageFilters';

import CustomersTable from '@pages/CustomersManage/widget/Customers/components/CustomersTable';
import { useMemo, useState } from 'react';
import CustomersInformation from './components/CustomerInformation';

const Customers = () => {
     const [term, setTerm] = useState('');

     const { data: searchCustomers } = useQueryCustomerSearch(useDebounce(term, 400));

     const { data: defaultCustomers } = useQueryDefaultCustomer();

     const isDefaultUse = useMemo(() => !term?.length, [term]);

     const listGroups = useMemo(() => {
          return isDefaultUse ? defaultCustomers : searchCustomers;
     }, [defaultCustomers, searchCustomers, isDefaultUse]);

     return (
          <>
               <div className="grid grid-rows-min-one gap-6 rounded-md bg-back-surface p-6">
                    <CustomersManageFilters onChangeSearchInput={value => setTerm(value)} onChangeSelectInput={() => null} />
                    <CustomersTable data={listGroups} />
               </div>

               <CustomersInformation />
          </>
     );
};

export default Customers;
