import { useCustomerStore } from '@store/customer';
import { useModalStore } from '@store/modal';
import SearchInput from '@uiKit/Inputs/SearchInput';
import { useMemo } from 'react';

const CustomersSearch = () => {

     const { setCustomersSearchModalSheet } = useModalStore();

     const { selectedCustomers } = useCustomerStore();


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
               <SearchInput
                    handleOpenModal={() => setCustomersSearchModalSheet({ symbolTitle: 'title in store' })}
                    placeholder="مشتری"
                    onChangeValue={() => null}
                    values={selectedCustomerInputValues ?? []}
               />
          </div>
     );
};

export default CustomersSearch;