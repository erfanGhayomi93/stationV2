// import { ChevronIcon } from 'src/common/icons';
import { Disclosure, DisclosureButton, DisclosurePanel, Transition } from '@headlessui/react'
import clsx from 'clsx';
import { Dispatch, useEffect, useMemo, useState } from 'react';
// import ResultItem from './ResultItem';
import { ChevronUpIcon } from '@assets/icons';
import ResultItem from './resultItem';
import CheckboxButton from '@uiKit/CheckboxButton';

interface IResultItem<T> {
    customer: T,
    ind: number,
    getLabel: (v: T) => string,
    getId: (v: T) => number,
    getChildren: (v: T) => ICustomerAdvancedSearchRes[] | undefined,
    isGroupChecked: (id: number) => boolean,
    onGroupSelectionChanged: (checked: boolean, id: number) => void,
    dispatch: Dispatch<ICustomerAction>,
    selectedCustomers: ICustomerAdvancedSearchRes[];
}

const GroupItem = <T,>({
    customer,
    ind,
    getLabel,
    getChildren,
    getId,
    isGroupChecked,
    onGroupSelectionChanged,
    dispatch,
    selectedCustomers
}: IResultItem<T>) => {
    return (
        <div className="flex w-full">
            <Item<T>
                customer={customer}
                key={getLabel(customer)} // Ensure customer label is unique and defined
                ind={ind}
                getLabel={getLabel}
                getChildren={getChildren}
                getId={getId}
                isGroupChecked={isGroupChecked}
                onGroupSelectionChanged={onGroupSelectionChanged}
                dispatch={dispatch}
                selectedCustomers={selectedCustomers}
            />
        </div>
    );
};

export default GroupItem;

const Item = <T,>({
    customer,
    getLabel,
    getChildren,
    getId,
    isGroupChecked,
    onGroupSelectionChanged,
    dispatch,
    selectedCustomers
}: IResultItem<T>) => {

    const customerId = useMemo(() => getId(customer), [getId, customer]);
    const label = useMemo(() => getLabel(customer), [getLabel, customer]);
    const children = useMemo(() => getChildren(customer), [getChildren, customer]);
    const isChecked = useMemo(() => isGroupChecked(customerId), [isGroupChecked, customerId]);

    const [checked, setChecked] = useState(isChecked)

    useEffect(() => {
        setChecked(isChecked)
    }, [isChecked])



    return (
        <div className='w-full'>
            <Disclosure>
                {({ open }) => (
                    <div className={clsx('rounded text-content-paragraph text-sm', { "": open })}>
                        <div className={clsx('flex items-center justify-between gap-3 p-2 w-full', {
                        })}>
                            <DisclosureButton className={clsx("")}>
                                <ChevronUpIcon
                                    width={16}
                                    height={16}
                                    className={clsx('duration-200 text-icon-default', open ? '' : 'rotate-180')}
                                />
                            </DisclosureButton>

                            <CheckboxButton
                                checked={checked}
                                label=""
                                onChange={() => {
                                    onGroupSelectionChanged(!checked, customerId)
                                    setChecked(!checked)
                                }}
                            />

                            {/* <input
                                type="checkbox"
                                className="cursor-pointer w-4 h-4"
                                onChange={(event) => onGroupSelectionChanged(event.target.checked, customerId)}
                                checked={isChecked}
                            /> */}

                            <h1 className={clsx('w-full truncate text-right select-text')}>
                                {label}
                            </h1>

                        </div>
                        <Transition
                            show={open}
                            enter="transition duration-100 ease-in"
                            enterFrom="transform opacity-0"
                            enterTo="transform opacity-100"
                            leave="transition duration-75 ease-out"
                            leaveFrom="transform opacity-100"
                            leaveTo="transform opacity-0"
                        >
                            <DisclosurePanel className="font-normal text-right">
                                {children?.map((child, ind) => (
                                    <ResultItem
                                        key={ind}
                                        data={child}
                                        dispatch={dispatch}
                                        selectedCustomers={selectedCustomers}
                                    />
                                ))}

                                {children?.length === 0 && (
                                    <div className="flex py-1.5">
                                        <div className="w-full flex items-center gap-4 justify-start pr-3 truncate select-text">
                                            مشتری وجود ندارد
                                        </div>
                                    </div>
                                )}
                            </DisclosurePanel>
                        </Transition>
                    </div>
                )}
            </Disclosure>
        </div>
    )
}