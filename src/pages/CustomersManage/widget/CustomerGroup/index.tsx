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

     const { data: defaultCustomerGroupData, isLoading: isLoadingDefaultCustomerGroup } = useQueryDefaultGroup();

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

     const filterDataBasedOnCustomerType = useMemo(() => {
          return rowData?.map(child => {
               const filteredChildren = child.children?.filter(item => {
                    if (customerType === 'All') return item;
                    if (customerType === 'Legal') return item.customerType === 'Legal';
                    if (customerType === 'Natural') return item.customerType === 'Natural';
               });

               return { ...child, children: filteredChildren };
          });
     }, [rowData, customerType]);

     return (
          <>
               <CustomersManageFilter onChangeSearchInput={onChangeSearchInput} onChangeSelectInput={onChangeSelectInput} />

               <CustomerGroupTable data={filterDataBasedOnCustomerType ?? []} loading={isLoadingDefaultCustomerGroup} />
          </>
     );
};

export default CustomerGroup;
