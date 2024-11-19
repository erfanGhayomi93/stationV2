import { useQueryCustomerSearch, useQueryDefaultCustomer } from '@api/customer';
import useDebounce from '@hooks/useDebounce';
import { useMemo, useState } from 'react';
import CustomersManageFilter from '../../components/CustomersManageFilter';
import CustomersTable from './components/CustomersTable';

const Customers = () => {
     const [term, setTerm] = useState('');

     const [customerType, setCustomerType] = useState<TCustomerType>('All');

     const termDebounce = useDebounce(term, 100);

     const { data: searchCustomers } = useQueryCustomerSearch(termDebounce, customerType);

     const { data: defaultCustomers, isLoading: isLoadingDefaultCustomers } = useQueryDefaultCustomer();

     const onChangeSearchInput = (value: string) => {
          setTerm(value);
     };

     const onChangeSelectInput = (item: TItem) => {
          setCustomerType(item.id as TcustomerType);
     };

     const isDefaultUse = useMemo(() => !term?.length, [term]);

     const listGroups = useMemo(() => {
          return isDefaultUse ? defaultCustomers : searchCustomers;
     }, [defaultCustomers, searchCustomers, isDefaultUse]);

     return (
          <>
               <CustomersManageFilter onChangeSearchInput={onChangeSearchInput} onChangeSelectInput={onChangeSelectInput} />

               <CustomersTable data={listGroups} loading={isLoadingDefaultCustomers} />
          </>
     );
};

export default Customers;
