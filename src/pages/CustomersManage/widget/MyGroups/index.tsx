import { useMyGroupsAdvanced, useMyGroupsDefault } from '@api/customer';
import useDebounce from '@hooks/useDebounce';
import CustomersManageFilter from '@pages/CustomersManage/components/CustomersManageFilter';
import { useMemo, useState } from 'react';
import MyGroupTable from './components/MyGroupTable';

type TCustomerType = 'Natural' | 'Legal' | 'All';

const MyGroups = () => {
     const [term, setTerm] = useState('');

     const [customerType, setCustomerType] = useState<TCustomerType>('All');

     const termDebounce = useDebounce(term, 100);

     const { data: advancedMyGroupData } = useMyGroupsAdvanced(termDebounce, customerType);

     const { data: defaultMyGroupData, isLoading: isLoadingDefaultCustomerGroup } = useMyGroupsDefault();

     const isDefaultUse = useMemo(() => !term?.length, [term]);

     const rowData = useMemo(() => {
          return isDefaultUse ? defaultMyGroupData : advancedMyGroupData;
     }, [defaultMyGroupData, advancedMyGroupData, isDefaultUse]);

     const onChangeSearchInput = (value: string) => {
          setTerm(value);
     };

     const onChangeSelectInput = (item: TItem) => {
          setCustomerType(item.id as TcustomerType);
     };

     const filterDataBasedOnCustomerType = useMemo(() => {
          return rowData
               ?.map(child => {
                    const filteredChildren = child.children?.filter(item => {
                         if (customerType === 'All') return item;
                         if (customerType === 'Legal') return item.customerType === 'Legal';
                         if (customerType === 'Natural') return item.customerType === 'Natural';
                    });

                    if (customerType === 'All') {
                         return { ...child, children: filteredChildren };
                    } else {
                         return filteredChildren.length > 0 ? { ...child, children: filteredChildren } : null;
                    }
               })
               .filter(Boolean);
     }, [rowData, customerType]);

     return (
          <>
               <CustomersManageFilter onChangeSearchInput={onChangeSearchInput} onChangeSelectInput={onChangeSelectInput} />

               <MyGroupTable
                    loading={isLoadingDefaultCustomerGroup}
                    data={(filterDataBasedOnCustomerType as IMyGroupsInformationRes[]) ?? []}
               />
          </>
     );
};

export default MyGroups;
