import { ChevronIcon } from 'src/common/icons';
import { Disclosure, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { useMemo } from 'react';
import ResultItem from './ResultItem';

interface IResultItem<T> {
    customer: T,
    ind: number,
    refetchToggleFavorite: () => void,
    getLabel: (v: T) => string,
    getId: (v: T) => number,
    getChildren: (v: T) => IGoMultiCustomerType[] | undefined,
    isGroupChecked: (id: number) => boolean,
    onGroupSelectionChanged: (checked: boolean, id: number) => void,
}

const GroupItem = <T,>({
    customer,
    ind,
    refetchToggleFavorite,
    getLabel,
    getChildren,
    getId,
    isGroupChecked,
    onGroupSelectionChanged
}: IResultItem<T>) => {
    return (
        <div className="flex text-L-gray-600 dark:text-D-gray-600 w-full">
            <Item<T>
                customer={customer}
                key={getLabel(customer)} // Ensure customer label is unique and defined
                ind={ind}
                refetchToggleFavorite={refetchToggleFavorite}
                getLabel={getLabel}
                getChildren={getChildren}
                getId={getId}
                isGroupChecked={isGroupChecked}
                onGroupSelectionChanged={onGroupSelectionChanged}
            />
        </div>
    );
};

export default GroupItem;

const Item = <T,>({
    customer,
    ind,
    refetchToggleFavorite,
    getLabel,
    getChildren,
    getId,
    isGroupChecked,
    onGroupSelectionChanged
}: IResultItem<T>) => {

    const customerId = useMemo(() => getId(customer), [getId, customer]);
    const label = useMemo(() => getLabel(customer), [getLabel, customer]);
    const children = useMemo(() => getChildren(customer), [getChildren, customer]);
    const isChecked = useMemo(() => isGroupChecked(customerId), [isGroupChecked, customerId]);

    return (
        <div className='w-full'>
            <Disclosure>
                {({ open }) => (
                    <div className={clsx('rounded', { "border-r-2 border-L-info-100 dark:border-D-primary-50": open })}>
                        <div className={clsx('flex items-center justify-between gap-3 p-2 w-full text-L-gray-600 dark:text-D-gray-600', {
                            "bg-L-gray-100 dark:bg-D-gray-100 hover:bg-L-gray-300 dark:hover:bg-D-gray-300": ind % 2 !== 0,
                            "hover:bg-L-gray-300 dark:hover:bg-D-gray-300": ind % 2 === 0,
                            "h-9 hover:bg-L-gray-300 dark:hover:bg-D-gray-300": open,
                        })}>
                            <Disclosure.Button className={clsx("")}>
                                <ChevronIcon
                                    width={16}
                                    height={16}
                                    className={clsx('duration-200 text-L-gray-600 dark:text-D-gray-600', open ? '' : 'rotate-180')}
                                />
                            </Disclosure.Button>

                            <input
                                type="checkbox"
                                className="cursor-pointer w-4 h-4"
                                onChange={(event) => onGroupSelectionChanged(event.target.checked, customerId)}
                                checked={isChecked}
                            />

                            <h1 className={clsx('w-full truncate text-right text-L-text-700 dark:text-D-gray-700 font-medium select-text')}>
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
                            <Disclosure.Panel className="text-xs font-normal text-L-gray-500 dark:text-D-gray-500 text-right">
                                {children?.map((child, ind) => (
                                    <ResultItem
                                        key={ind}
                                        data={child}
                                        refetchToggleFavorite={refetchToggleFavorite}
                                    />
                                ))}

                                {children?.length === 0 && (
                                    <div className="flex py-1.5 text-L-gray-600 dark:text-D-gray-600 h-9">
                                        <div className="w-full flex items-center gap-4 justify-start pr-3 truncate select-text">
                                            مشتری وجود ندارد
                                        </div>
                                    </div>
                                )}
                            </Disclosure.Panel>
                        </Transition>
                    </div>
                )}
            </Disclosure>
        </div>
    )
}