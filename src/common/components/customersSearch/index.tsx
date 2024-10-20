// import { useQueryCustomerSearch, useQueryCustomerSearchGroup } from '@api/customer';
// import { useState } from 'react';
// import clsx from 'clsx';

import { useCustomerStore } from '@store/customer';
import { useModalStore } from '@store/modal';
import SearchInput from '@uiKit/Inputs/SearchInput';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

const CustomersSearch = () => {
     const [value, setValue] = useState('');

     const { setCustomersSearchModalSheet } = useModalStore();

     const { selectedCustomers } = useCustomerStore();

     const { t } = useTranslation();

     // const { data: customerSearchData } = useQueryCustomerSearch();

     // const { data: customerSearchGroupData } = useQueryCustomerSearchGroup();

     const selectedCustomerInputValues = useMemo(() => {
          return selectedCustomers.map(customer => {
               return {
                    id: customer.customerISIN,
                    label: customer.title,
               };
          });
     }, [selectedCustomers]);

     return (
          <div className="flex-1">
               {/* <Input
                    value={value}
                    onChange={v => setValue(v)}
                    placeholder={'مشتری'}
                    maxLength={10}
                    onClick={() => setCustomersSearchModalSheet({ symbolTitle: 'title in store' })}
               /> */}
               <SearchInput
                    onClick={() => setCustomersSearchModalSheet({ symbolTitle: 'title in store' })}
                    placeholder="مشتری"
                    onChangeValue={() => null}
                    values={selectedCustomerInputValues ?? []}
               />
          </div>
     );
};

export default CustomersSearch;
