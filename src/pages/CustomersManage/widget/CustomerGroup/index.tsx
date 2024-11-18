import { useQueryCustomerSearchGroup, useQueryDefaultGroup } from '@api/customer';
import useDebounce from '@hooks/useDebounce';
import CustomersManageFilter from '@pages/CustomersManage/components/CustomersManageFilter';
import { useMemo, useState } from 'react';
import CustomerGroupTable from './components/CustomerGroupTable';

const CustomerGroup = () => {
     const [term, setTerm] = useState('');

     const [customerType, setCustomerType] = useState<TCustomerType>('All');

     const termDebounce = useDebounce(term, 100);

     const { data: searchCustomerGroupData } = useQueryCustomerSearchGroup(termDebounce, customerType);

     const { data: defaultCustomerGroupData } = useQueryDefaultGroup();

     const isDefaultUse = useMemo(() => !term?.length, [term]);

     const rowData = useMemo(() => {
          return isDefaultUse ? defaultCustomerGroupData : searchCustomerGroupData;
     }, [defaultCustomerGroupData, searchCustomerGroupData, isDefaultUse]);

     const onChangeSearchInput = (value: string) => {
          setTerm(value);
     };

     const onChangeSelectInput = (item: TItem) => {
          setCustomerType(item.id as TcustomerType);
     };

     return (
          <>
               <CustomersManageFilter onChangeSearchInput={onChangeSearchInput} onChangeSelectInput={onChangeSelectInput} />

               <CustomerGroupTable data={rowData ?? []} />
          </>
     );
};

export default CustomerGroup;
