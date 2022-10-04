import React, { FC, memo } from 'react';
import { useAppDispatch, useAppValues } from 'src/redux/hooks';
import { setSelectedCustomers } from 'src/redux/slices/option';
import { seprateNumber } from 'src/utils/helpers';
import ActionCellRenderer from '../ActionCell/ActionCell';
import NameCellRenderer from '../NameCell/NameCell';

const ResultItem: FC<IGoCustomerSearchResult> = (customer) => {
    const appDispatch = useAppDispatch();
    const {
        option: { selectedCustomers },
    } = useAppValues();

    const onSelectionChanged = (isChecked: boolean, customer: IGoCustomerSearchResult) => {
        isChecked
            ? appDispatch(setSelectedCustomers([...selectedCustomers, customer]))
            : appDispatch(setSelectedCustomers(selectedCustomers.filter((item) => item.customerISIN !== customer?.customerISIN)));
    };

    return (
        <div className="flex py-1.5 text-L-gray-450 dark:text-D-gray-450">
            <span className="flex items-center justify-center px-3">
                <input
                    type="checkbox"
                    checked={selectedCustomers.some((item) => item.customerISIN === customer?.customerISIN)}
                    onChange={(event) => onSelectionChanged(event.target.checked, customer)}
                />
            </span>
            <div className="w-full flex items-center justify-center">
                <NameCellRenderer {...customer} />
            </div>
            <div className="w-3/6  flex items-center justify-center">{seprateNumber(customer?.balance)}</div>
            <div className="w-3/6  flex items-center justify-center">
                <ActionCellRenderer {...customer} />
            </div>
        </div>
    );
};

export default memo(ResultItem);
