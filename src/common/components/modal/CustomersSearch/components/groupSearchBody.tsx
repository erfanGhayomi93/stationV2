import { useQueryCustomerSearchGroup, useQueryDefaultGroup } from '@api/customer';
import { DeleteIcon, UserGroupIcon } from '@assets/icons';
import Popup from '@components/popup';
import useDebounce from '@hooks/useDebounce';
import { useCustomerStore } from '@store/customer';
import SearchInput from '@uiKit/Inputs/SearchInput';
import { useMemo, useState } from 'react';
import GroupItem from './groupItem';
import ResultHeader from './resultHeader';

const GroupSearchBody = () => {
     const [term, setTerm] = useState('');

     const debouncedTerm = useDebounce(term, 400);

     const { selectedCustomers, setAllSelectedCustomersWithPrevious, setSelectedCustomers } = useCustomerStore();

     const { data: searchGroups } = useQueryCustomerSearchGroup(debouncedTerm);

     const { data: defaultGroups } = useQueryDefaultGroup();

     const isDefaultUse = useMemo(() => !term?.length, [term]);

     const listGroups = useMemo(() => {
          return isDefaultUse ? defaultGroups : searchGroups;
     }, [defaultGroups, searchGroups, isDefaultUse]);

     const isGroupChecked = (id: number) => {
          if (selectedCustomers.length === 0 || !selectedCustomers) return false;

          const findCustomer = listGroups?.find(item => item.id === id);

          const customerISINs = findCustomer?.children?.map(item => item.customerISIN);
          if (!customerISINs || customerISINs.length === 0) return false;

          const selectedCustomeISINs = selectedCustomers.map(item => item.customerISIN);

          return customerISINs?.every(item => selectedCustomeISINs.includes(item));
     };

     const isALLSelected = useMemo(() => {
          if (!listGroups || listGroups.length === 0) return false;
          // Flatten the list of groups, extract customerISINs, and remove duplicates
          const allCustomerISINs =
               listGroups?.flatMap(group => group.children?.map(child => child.customerISIN)).filter(Boolean) || [];
          const uniqueCustomerISINs = Array.from(new Set(allCustomerISINs)) as string[];

          // Extract the selected customerISINs
          const selectedCustomerISINs = selectedCustomers.map(customer => customer.customerISIN).filter(Boolean) as string[];

          // Check if every unique ISIN is in the selected ISINs
          return uniqueCustomerISINs.every(isin => selectedCustomerISINs.includes(isin));
     }, [listGroups, selectedCustomers]);

     const onGroupSelectionChanged = (checked: boolean, id: number) => {
          const findCustomer = listGroups?.find(item => item.id === id);

          if (!findCustomer?.children?.length) return;

          if (checked) {
               setAllSelectedCustomersWithPrevious(findCustomer.children);
               return;
          }

          const customerISINUnChecked = findCustomer.children.map(item => item.customerISIN);

          const detectCustomer = selectedCustomers.filter(item => {
               if (customerISINUnChecked.includes(item.customerISIN)) return false;
               return true;
          });

          setSelectedCustomers(detectCustomer);
     };

     const onALLSelectionChanged = (checked: boolean) => {
          if (!listGroups) return;

          // Flatten the list of groups and extract children
          const allChildren = listGroups.flatMap(group => group?.children || []);

          if (checked) {
               // If checked, select all customers
               setAllSelectedCustomersWithPrevious(allChildren);
          } else {
               // If not checked, filter out customers from the selected list that are in the current group
               const customerISINs = allChildren.map(child => child.customerISIN);
               const filteredSelectedCustomers = selectedCustomers.filter(
                    customer => !customerISINs.includes(customer.customerISIN)
               );
               setSelectedCustomers(filteredSelectedCustomers);
          }
     };

     const rowUI = useMemo(
          () =>
               !listGroups?.length
                    ? null
                    : listGroups?.map((item, ind) => (
                         <GroupItem<ICustomerAdvancedSearchRes>
                              key={ind}
                              ind={ind}
                              customer={item}
                              getLabel={v => v.title}
                              getChildren={v => v.children}
                              getId={v => v?.id}
                              isGroupChecked={isGroupChecked}
                              onGroupSelectionChanged={onGroupSelectionChanged}
                         />
                    )),
          [searchGroups, defaultGroups, isDefaultUse, isGroupChecked, onGroupSelectionChanged]
     );

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
                         onChangeValue={(value, input) => setTerm(input)}
                         values={selectedCustomerInputValues ?? []}
                         placeholder='جستجوی گروه / مشتری / کدبورسی / کد ملی'
                    />

                    <Popup
                         margin={{
                              y: 8,
                         }}
                         defaultPopupWidth={200}
                         renderer={({ setOpen }) => (
                              <ul className="rtl flex flex-col rounded-md bg-back-surface p-4 shadow-E2">
                                   {selectedCustomers.map((item, index) => (
                                        <li className="group flex items-center justify-between rounded-lg p-2 text-xs text-content-paragraph hover:bg-back-primary/80">
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

               <div className="grid h-80 grid-rows-min-one rounded-lg">
                    <ResultHeader isAllSelected={isALLSelected} onALLSelectionChanged={onALLSelectionChanged} />
                    <div className="overflow-auto">{rowUI}</div>
               </div>
          </div>
     );
};

export default GroupSearchBody;
