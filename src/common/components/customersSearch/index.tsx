import { useQueryPortfolio } from '@api/portfolio';
import { DeleteIcon, UserGroupIcon } from '@assets/icons';
import Popup from '@components/popup';
import { sepNumbers } from '@methods/helper';
import { useCustomerStore } from '@store/customer';
import { useModalStore } from '@store/modal';
import { useSymbolStore } from '@store/symbol';
import SearchInput from '@uiKit/Inputs/SearchInput';
import clsx from 'clsx';
import { useBuySellStore } from 'common/widget/buySellWidget/context/buySellContext';
import { useEffect, useMemo } from 'react';

interface CustomersSearchProps {
     onChange?: (selectedCustomerISIN: ICustomerAdvancedSearchRes[]) => void;
     bgPlaceholder?: boolean;
     isDetailsCustomerData?: boolean;
}

const CustomersSearch = ({ onChange, bgPlaceholder, isDetailsCustomerData = true }: CustomersSearchProps) => {
     const { setCustomersSearchModalSheet } = useModalStore();

     const { selectedCustomers, setSelectedCustomers, removeAllSelectedCustomers, removeSelectedCustomers } = useCustomerStore();

     const { selectedSymbol } = useSymbolStore();

     const { data, refetch: refetchPortlolio } = useQueryPortfolio({
          CustomerISIN: [selectedCustomers[0]?.customerISIN],
          SymbolISIN: [selectedSymbol],
     });

     const asset = useMemo(() => data?.result[0]?.asset, [data?.result]);

     const { side } = useBuySellStore();

     const selectedCustomerInputValues = useMemo(() => {
          return selectedCustomers.map(customer => {
               return {
                    id: customer.customerISIN,
                    label: customer.title,
               };
          });
     }, [selectedCustomers]);

     useEffect(() => {
          if (side === 'Sell' && selectedCustomers?.length === 1) {
               refetchPortlolio();
          }
     }, [side, selectedCustomers, refetchPortlolio]);

     useEffect(() => {
          onChange?.(selectedCustomers);
     }, [selectedCustomers]);

     return (
          <div className="mb-3 flex items-center">
               <div className="w-9/12 pl-4">
                    <div className="relative">
                         <SearchInput
                              handleOpenModal={() => setCustomersSearchModalSheet({ symbolTitle: 'title in store' })}
                              placeholder="مشتری"
                              onChangeValue={() => null}
                              values={selectedCustomerInputValues ?? []}
                              removeAllSelectedCustomers={removeAllSelectedCustomers}
                              removeSelectedCustomers={removeSelectedCustomers}
                              bgPlaceholder={clsx(
                                   bgPlaceholder !== false && {
                                        'bg-button-error-bg-selected': side === 'Sell',
                                        'bg-button-success-bg-selected': side === 'Buy',
                                   }
                              )}
                         />

                         {selectedCustomers.length === 1 && isDetailsCustomerData && (
                              <div className="absolute mt-0.5 flex gap-x-1 pr-1 text-xs">
                                   {side === 'Buy' && (
                                        <>
                                             <span className="text-content-paragraph">قدرت خرید مشتری:</span>
                                             <span className="text-content-success-buy">
                                                  {sepNumbers(
                                                       selectedCustomers[0].customerRemainAndOptionRemainDto.purchasePower
                                                  )}
                                             </span>
                                             <span className="text-content-paragraph">ریال</span>
                                        </>
                                   )}
                                   {side === 'Sell' && !!asset && (
                                        <>
                                             <span className="text-content-paragraph">دارایی مشتری:</span>
                                             <span className="text-content-title">{sepNumbers(asset)}</span>
                                             <span className="text-content-paragraph">سهم</span>
                                        </>
                                   )}
                              </div>
                         )}
                    </div>
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

                                                       setOpen(false);
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
                              <button
                                   onClick={() => {
                                        if (selectedCustomers.length === 0) return;
                                        setOpen(!open);
                                   }}
                                   className={clsx('flex items-center gap-1 rounded-lg px-3 py-3', {
                                        'bg-button-error-bg-selected': side === 'Sell',
                                        'bg-button-success-bg-selected': side === 'Buy',
                                   })}
                              >
                                   <UserGroupIcon
                                        className={clsx({
                                             'text-button-primary-default': side === 'Buy',
                                             'text-button-error-default': side === 'Sell',
                                        })}
                                   />

                                   <div
                                        className={clsx('flex h-5 w-5 items-center justify-center rounded-full text-icon-white', {
                                             'bg-button-primary-hover': side === 'Buy',
                                             'bg-button-error-hover': side === 'Sell',
                                        })}
                                   >
                                        <span className="text-xs">{selectedCustomers.length}</span>
                                   </div>
                              </button>
                         )}
                    </Popup>
               </div>
          </div>
     );
};

export default CustomersSearch;
