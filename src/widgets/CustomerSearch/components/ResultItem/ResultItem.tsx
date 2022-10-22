import { FC, memo } from 'react';
import { useAppDispatch, useAppValues } from 'src/redux/hooks';
import { setSelectedCustomers } from 'src/redux/slices/option';
import { seprateNumber } from 'src/utils/helpers';
import ActionCellRenderer from '../ActionCell/ActionCell';

const ResultItem: FC<IGoCustomerSearchResult> = (customer) => {
    const appDispatch = useAppDispatch();
    const {
        option: { selectedCustomers },
    } = useAppValues();

    const onSelectionChanged = (isChecked: boolean, customer: IGoCustomerSearchResult) => {
        isChecked
            ? appDispatch(setSelectedCustomers([...selectedCustomers, customer]))
            : appDispatch(setSelectedCustomers(selectedCustomers.filter((item: any) => item.customerISIN !== customer?.customerISIN)));
    };

    return (
        <div className="flex py-1.5 text-L-gray-450 dark:text-D-gray-450 h-[35px]">
            <div className="w-full flex items-center gap-4 justify-start pr-3">
                <input
                    type="checkbox"
                    className=" cursor-pointer"
                    checked={selectedCustomers.some((item: any) => item.customerISIN === customer?.customerISIN)}
                    onChange={(event) => onSelectionChanged(event.target.checked, customer)}
                />
                {customer?.customerTitle || customer.groupName}
            </div>
            <div className="w-4/6  flex items-center justify-center text-L-gray-400 dark:text-D-gray-400">
                {customer?.bourseCode || customer?.groupId}
            </div>
            <div className="w-4/6  flex items-center justify-center">{customer?.nationalCode}</div>
            <div className="w-4/6  flex items-center justify-center">{seprateNumber(customer?.balance)}</div>
            <div className="w-4/6  flex items-center justify-center">-</div>
            <div className="w-4/6  flex items-center justify-center">
                <ActionCellRenderer {...customer} />
            </div>
        </div>
    );
};

export default memo(ResultItem);
