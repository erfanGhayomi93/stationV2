import { Dispatch, FC, useEffect, useMemo, useState } from 'react';
import { sepNumbers } from '@methods/helper';
import CheckboxButton from '@uiKit/CheckboxButton';

interface IResultItem {
    data: ICustomerAdvancedSearchRes,
    dispatch: Dispatch<ICustomerAction>,
    selectedCustomers: ICustomerAdvancedSearchRes[];
}

const ResultItem: FC<IResultItem> = ({ data: customer, dispatch, selectedCustomers }) => {

    const [checked, setChecked] = useState(selectedCustomers.some((item) => item.customerISIN === customer?.customerISIN))

    useEffect(() => {
        setChecked(selectedCustomers.some((item) => item.customerISIN === customer?.customerISIN))
    }, [selectedCustomers])


    const onSelectionChanged = useMemo(() => (isChecked: boolean, customer: ICustomerAdvancedSearchRes) => {
        try {
            isChecked
                ? dispatch({ type: 'ADD_PART_SELECTED_CUSTOMER', payload: customer })
                : dispatch({ type: 'REMOVE_SELECTED_CUSTOMER', payload: customer.customerISIN })
        } catch {
            //
        }
    }, [checked])



    return (
        <div className="flex text-content-paragraph">
            <div className="w-full flex border-l border-back-surface py-3 items-center gap-4 justify-start pr-3 truncate select-text">
                <CheckboxButton
                    checked={checked}
                    label=""
                    onChange={() => {
                        onSelectionChanged(!checked, customer)
                        setChecked(!checked)
                    }}
                />

                {/* <input
                    type="checkbox"
                    className="cursor-pointer"
                    checked={selectedCustomers.some((item) => item.customerISIN === customer?.customerISIN)}
                    onChange={(event) => onSelectionChanged(event.target.checked, customer)}
                /> */}
                {customer?.title}
            </div>
            <div className="w-4/6 flex border-l border-back-surface py-3 items-center justify-center select-text">{customer?.bourseCode}</div>
            <div className="w-4/6 flex border-l border-back-surface py-3 items-center justify-center select-text">{customer?.nationalCode}</div>
            <div className="w-4/6 flex border-l border-back-surface py-3 items-center justify-center ltr">{sepNumbers(customer?.customerRemainAndOptionRemainDto.purchasePower || 0)}</div>
            <div className="w-4/6 flex items-center justify-center py-3 ltr">{sepNumbers(customer?.customerRemainAndOptionRemainDto.remain || 0)}</div>
        </div>
    );
};

export default ResultItem;