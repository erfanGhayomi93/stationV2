import { UserGroupIcon } from '@assets/icons';
import Popup from '@components/popup';
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
          <div className="flex flex-1 items-center gap-2">
               <SearchInput
                    handleOpenModal={() => setCustomersSearchModalSheet({ symbolTitle: 'title in store' })}
                    placeholder="مشتری"
                    onChangeValue={() => null}
                    values={selectedCustomerInputValues ?? []}
               />

               <Popup
                    margin={{
                         y: 8,
                    }}
                    defaultPopupWidth={200}
                    renderer={({ setOpen }) => (
                         <ul className="rtl flex flex-col rounded-md bg-back-surface p-4 shadow-E2">
                              {selectedCustomers.map((item, index) => (
                                   <li className="py-3 text-xs text-content-paragraph">{item.title}</li>
                              ))}
                         </ul>
                    )}
               >
                    {({ setOpen, open }) => (
                         <div
                              onClick={() => setOpen(!open)}
                              className="bg- flex items-center gap-1 rounded-lg bg-button-primary-bg-selected px-4 py-3"
                         >
                              <UserGroupIcon className="text-button-primary-default" />

                              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-button-primary-hover text-icon-white">
                                   <span className="text-xs">{selectedCustomers.length}</span>
                              </div>
                         </div>
                    )}
               </Popup>
          </div>
     );
};

export default CustomersSearch;
