import { FC, memo } from 'react';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { getSelectedCustomers, setSelectedCustomers } from 'src/redux/slices/option';
import { seprateNumber } from 'src/utils/helpers';
import ActionCellRenderer from '../ActionCell/ActionCell';

interface IResultItem {
    data: IGoMultiCustomerType
}

const ResultItem: FC<IResultItem> = ({ data: customer }) => {
    const appDispatch = useAppDispatch();
    const selectedCustomers = useAppSelector(getSelectedCustomers)

    const onSelectionChanged = (isChecked: boolean, customer: IGoMultiCustomerType) => {
        isChecked
            ? appDispatch(setSelectedCustomers([...selectedCustomers, customer]))
            : appDispatch(setSelectedCustomers(selectedCustomers.filter((item) => item.customerISIN !== customer?.customerISIN)));
    };

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
            <div className="w-4/6  flex items-center justify-center">{customer?.nationalCode}</div>
            <div className="w-4/6  flex items-center justify-center">{seprateNumber(customer?.purchasePower)}</div>
            <div className="w-4/6  flex items-center justify-center">-</div>
            <div className="w-4/6  flex items-center justify-center">
                <ActionCellRenderer {...customer} />
            </div>
        </div>
    );
};

export default memo(ResultItem);