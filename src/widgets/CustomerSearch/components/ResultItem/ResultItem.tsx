import { FC, memo, useMemo } from 'react';
import { useAppDispatch, useAppSelector, useAppValues } from 'src/redux/hooks';
import { getSelectedCustomers, removeSelectedCustomers, setSelectedCustomers } from 'src/redux/slices/option';
import { seprateNumber } from 'src/utils/helpers';
import ActionCellRenderer from '../ActionCell/ActionCell';
// import { useCustomerSearchState } from '../../context/CustomerSearchContext';

interface IResultItem {
    data: IGoMultiCustomerType,
    onSelectionChanged?: (isChecked: boolean, customer: IGoMultiCustomerType) => void,
    refetchToggleFavorite : (customerIsin : string) => void
}

const ResultItem: FC<IResultItem> = ({ data: customer , refetchToggleFavorite }) => {
    // const {
    //     option: { selectedCustomers },
    // } = useAppValues();
    const selectedCustomers = useAppSelector(getSelectedCustomers);

    const appDispatch = useAppDispatch()



    const onSelectionChanged = useMemo(() => (isChecked: boolean, customer: IGoMultiCustomerType) => {
        try {
            isChecked
                ? appDispatch(setSelectedCustomers(customer))
                // : appDispatch(setSelectedCustomers(selectedCustomers.filter((item) => item.customerISIN !== customer?.customerISIN)));
                : appDispatch(removeSelectedCustomers(customer.customerISIN))
        } catch { }
    }, [])



    return (
        <div className="flex py-1.5 text-L-gray-600 dark:text-D-gray-600 h-[35px]">
            <div className="w-full flex items-center gap-4 justify-start pr-3 truncate">
                <input
                    type="checkbox"
                    className="cursor-pointer"
                    checked={selectedCustomers.some((item) => item.customerISIN === customer?.customerISIN)}
                    onChange={(event) => onSelectionChanged(event.target.checked, customer)}
                />
                {customer?.title}
            </div>
            <div className="w-4/6  flex items-center justify-center text-L-gray-500 dark:text-D-gray-500">{customer?.bourseCode}</div>
            <div className="w-4/6  flex items-center justify-center">{seprateNumber(customer?.purchasePower)}</div>
            <div className="w-4/6  flex items-center justify-center">{customer?.nationalCode}</div>
            <div className="w-4/6  flex items-center justify-center">-</div>
            <div className="w-4/6  flex items-center justify-center">
                <ActionCellRenderer {...{customer , refetchToggleFavorite}} />
            </div>
        </div>
    );
};

export default memo(ResultItem);