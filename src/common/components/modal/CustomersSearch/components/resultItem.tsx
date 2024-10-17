import { FC, memo, useMemo } from 'react';
// import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
// import { getSelectedCustomers, removeSelectedCustomers, setPartSelectedCustomers } from 'src/redux/slices/option';
import { sepNumbers } from '@methods/helper';

interface IResultItem {
    data: ICustomerAdvancedSearchRes,
}

const ResultItem: FC<IResultItem> = ({ data: customer }) => {
    // const {
    //     option: { selectedCustomers },
    // } = useAppValues();
    // const selectedCustomers = useAppSelector(getSelectedCustomers);

    // const appDispatch = useAppDispatch()



    // const onSelectionChanged = useMemo(() => (isChecked: boolean, customer: IGoMultiCustomerType) => {
    //     try {
    //         isChecked
    //             ? appDispatch(setPartSelectedCustomers(customer))
    //             // : appDispatch(setPartSelectedCustomers(selectedCustomers.filter((item) => item.customerISIN !== customer?.customerISIN)));
    //             : appDispatch(removeSelectedCustomers(customer.customerISIN))
    //     } catch { }  
    // }, [])



    return (
        <div className="flex text-content-paragraph">
            <div className="w-full flex border-l border-back-surface py-3 items-center gap-4 justify-start pr-3 truncate select-text">
                <input
                    type="checkbox"
                    className="cursor-pointer"
                // checked={selectedCustomers.some((item) => item.customerISIN === customer?.customerISIN)}
                // onChange={(event) => onSelectionChanged(event.target.checked, customer)}
                />
                {customer?.title}
            </div>
            <div className="w-4/6 flex border-l border-back-surface py-3 items-center justify-center select-text">{customer?.bourseCode}</div>
            <div className="w-4/6 flex border-l border-back-surface py-3 items-center justify-center select-text">{customer?.nationalCode}</div>
            <div className="w-4/6 flex border-l border-back-surface py-3 items-center justify-center">{sepNumbers(customer?.purchasePower || 0)}</div>
            <div className="w-4/6 flex items-center justify-center py-3">{sepNumbers(customer?.creditValue || 0)}</div>
        </div>
    );
};

export default ResultItem;