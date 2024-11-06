import { useQueryCustomerSearch, useQueryDefaultCustomer } from '@api/customer';
import { DeleteIcon, UserGroupIcon } from '@assets/icons';
import Popup from '@components/popup';
import useDebounce from '@hooks/useDebounce';
import SearchInput from '@uiKit/Inputs/SearchInput';
import { Dispatch, FC, HTMLAttributes, useMemo } from 'react';
import { Virtuoso } from 'react-virtuoso';
import ResultHeader from './resultHeader';
import ResultItem from './resultItem';
import { useState } from 'react';

interface ICustomersSearchBodyProps {
     dispatch: Dispatch<ICustomerAction>,
     selectedCustomers: ICustomerAdvancedSearchRes[];
}

const CustomersSearchBody: FC<ICustomersSearchBodyProps> = ({ dispatch, selectedCustomers }) => {
     const [term, setTerm] = useState('');


     const debouncedTerm = useDebounce(term, 400);

     // const { selectedCustomers, setAllSelectedCustomersWithPrevious, setSelectedCustomers } = useCustomerStore();

     const { data: searchCustomers } = useQueryCustomerSearch(debouncedTerm);

     const { data: defaultCustomers } = useQueryDefaultCustomer();

     const isDefaultUse = useMemo(() => !term?.length, [term]);

     const listGroups = useMemo(() => {
          return isDefaultUse ? defaultCustomers : searchCustomers;
     }, [defaultCustomers, searchCustomers, isDefaultUse]);

     const ItemRenderer = (props: HTMLAttributes<HTMLDivElement>) => {
          return <div className="text-sm odd:bg-table-row1 even:bg-table-row2" {...props}></div>;
     };

     const isALLSelected = useMemo(() => {
          if (!listGroups || listGroups.length === 0) return false;

          const selectedCustomersISINs = selectedCustomers?.map(item => item.customerISIN);

          return listGroups?.every(item => selectedCustomersISINs.includes(item.customerISIN));
     }, [listGroups, selectedCustomers]);

     const onALLSelectionChanged = (checked: boolean) => {
          if (!listGroups) return;

          if (checked) {
               dispatch({ type: "ADD_SELECTED_CUSTOMERS", payload: listGroups });
          } else {
               // If not checked, filter out customers from the selected list that are in the current group
               const customerISINs = listGroups.map(child => child.customerISIN);
               const filteredSelectedCustomers = selectedCustomers.filter(
                    customer => !customerISINs.includes(customer.customerISIN)
               );

               dispatch({ type: "SET_SELECTED_CUSTOMERS", payload: filteredSelectedCustomers });
          }
     };

     const rowUI = useMemo(() => {
          if (!listGroups) return null;

          return (
               <Virtuoso
                    data={listGroups}
                    className="rounded-lg rounded-t-none"
                    itemContent={(index, data) => <ResultItem
                         key={index}
                         data={data}
                         dispatch={dispatch}
                         selectedCustomers={selectedCustomers}

                    />}
                    components={{
                         Item: ItemRenderer,
                    }}
                    totalCount={listGroups.length}
               />
          );
     }, [searchCustomers, defaultCustomers, isDefaultUse, selectedCustomers]);

     const selectedCustomerInputValues = useMemo(() => {
          return selectedCustomers.map(customer => {
               return {
                    id: customer.customerISIN,
                    label: customer.title,
               };
          });
     }, [selectedCustomers]);

     return (
          <div className="flex flex-col gap-y-6">
               <div className="flex items-center gap-4">
                    <SearchInput
                         onChangeValue={(_, input) => setTerm(input)}
                         values={selectedCustomerInputValues ?? []}
                         placeholder='جستجوی مشتری / کدبورسی / کد ملی'
                         removeAllSelectedCustomers={() => dispatch({ type: "REMOVE_ALL_SELECTED_CUSTOMERS" })}
                         removeSelectedCustomers={(customerISIN) => dispatch({ type: "REMOVE_SELECTED_CUSTOMER", payload: customerISIN })}
                    />

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
                                                       dispatch({ type: "SET_SELECTED_CUSTOMERS", payload: filterSelectCustomer })
                                                       if (selectedCustomers.length === 1) setOpen(false)
                                                  }}
                                             >
                                                  <DeleteIcon className="text-icon-error opacity-0 transition-opacity group-hover:opacity-100" />
                                             </button>
                                        </li>
                                   ))}
                              </ul>
                         )}
                         className="dropdown-portal"
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

               <div className="grid h-80 grid-rows-min-one rounded-lg">
                    <ResultHeader isAllSelected={isALLSelected} onALLSelectionChanged={onALLSelectionChanged} />
                    {rowUI}
               </div>
          </div>
     );
};

export default CustomersSearchBody;
