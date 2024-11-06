import { DeleteIcon, UserGroupIcon } from '@assets/icons';
import Popup from '@components/popup';
import { useCustomerStore } from '@store/customer';
import { useModalStore } from '@store/modal';
import SearchInput from '@uiKit/Inputs/SearchInput';
import { useMemo } from 'react';

const CustomersSearch = () => {
     const { setCustomersSearchModalSheet } = useModalStore();

     const { selectedCustomers, setSelectedCustomers, removeAllSelectedCustomers, removeSelectedCustomers } = useCustomerStore();


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
               <div className="w-9/12">
                    <SearchInput
                         handleOpenModal={() => setCustomersSearchModalSheet({ symbolTitle: 'title in store' })}
                         placeholder="مشتری"
                         onChangeValue={() => null}
                         values={selectedCustomerInputValues ?? []}
                         removeAllSelectedCustomers={removeAllSelectedCustomers}
                         removeSelectedCustomers={removeSelectedCustomers}
                    />
               </div>

               <div className="flex w-3/12 items-center justify-center">
                    <Popup
                         margin={{
                              y: 8,
                         }}
                         defaultPopupWidth={200}
                         renderer={({ setOpen }) => (
                              <ul className="rtl flex flex-col rounded-md bg-back-surface p-4 shadow-E2">
                                   {selectedCustomers.map((item, index) => (
                                        <li
                                             key={index}
                                             className="group flex items-center justify-between rounded-lg p-2 text-xs text-content-paragraph hover:bg-back-primary/80"
                                        >
                                             <span>{item.title}</span>
                                             <button
                                                  onClick={() => {
                                                       const filterSelectCustomer = selectedCustomers.filter(
                                                            customer => customer.customerISIN !== item.customerISIN
                                                       );

                                                       setSelectedCustomers([...filterSelectCustomer]);
                                                  }}
                                             >
                                                  <DeleteIcon className="text-icon-error opacity-0 transition-opacity group-hover:opacity-100" />
                                             </button>
                                        </li>
                                   ))}
                              </ul>
                         )}
                    >
                         {({ setOpen, open }) => (
                              <div
                                   onClick={() => {
                                        if (selectedCustomers.length === 0) return;
                                        setOpen(!open);
                                   }}
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
          </div>
     );
};

export default CustomersSearch;
