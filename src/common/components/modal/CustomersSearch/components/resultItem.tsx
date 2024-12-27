import { sepNumbers } from '@methods/helper';
import CheckboxButton from '@uiKit/CheckboxButton';
import { Dispatch, FC, useEffect, useMemo, useState } from 'react';

interface IResultItem {
     data: ICustomerAdvancedSearchRes;
     dispatch: Dispatch<ICustomerAction>;
     selectedCustomers: ICustomerAdvancedSearchRes[];
}

const ResultItem: FC<IResultItem> = ({ data: customer, dispatch, selectedCustomers }) => {
     const [checked, setChecked] = useState(selectedCustomers.some(item => item.customerISIN === customer?.customerISIN));

     useEffect(() => {
          setChecked(selectedCustomers.some(item => item.customerISIN === customer?.customerISIN));
     }, [selectedCustomers]);

     const onSelectionChanged = useMemo(
          () => (isChecked: boolean, customer: ICustomerAdvancedSearchRes) => {
               try {
                    isChecked
                         ? dispatch({ type: 'ADD_PART_SELECTED_CUSTOMER', payload: customer })
                         : dispatch({ type: 'REMOVE_SELECTED_CUSTOMER', payload: customer.customerISIN });
               } catch {
                    //
               }
          },
          [checked]
     );

     return (
          <div className="flex text-content-paragraph">
               <div className="flex w-full select-text items-center justify-start gap-4 truncate border-l border-back-surface py-3 pr-3">
                    <CheckboxButton
                         checked={checked}
                         label=""
                         onChange={() => {
                              onSelectionChanged(!checked, customer);
                              setChecked(!checked);
                         }}
                    />
                    {customer?.title}
               </div>
               <div className="flex w-4/6 select-text items-center justify-center border-l border-back-surface py-3">
                    {customer?.bourseCode}
               </div>
               <div className="flex w-4/6 select-text items-center justify-center border-l border-back-surface py-3">
                    {customer?.nationalCode}
               </div>
               <div className="ltr flex w-4/6 items-center justify-center border-l border-back-surface py-3">
                    {sepNumbers(customer?.customerRemainAndOptionRemainDto?.purchasePower || 0)}
               </div>
               <div className="ltr flex w-4/6 items-center justify-center py-3">
                    {sepNumbers(customer?.customerRemainAndOptionRemainDto?.stockDailyCredit || 0)}
               </div>
          </div>
     );
};

export default ResultItem;
