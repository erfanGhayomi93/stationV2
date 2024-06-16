import { ChevronIcon } from 'src/common/icons';
import { Disclosure, Transition } from '@headlessui/react';
import clsx from 'clsx';
import ResultItem from './ResultItem';


interface IResultItem<T> {
    customer: T,
    ind: number,
    refetchToggleFavorite: () => void,
    getLable: (v: T) => string
    getChildren: (v: T) => IGoMultiCustomerType[] | undefined
}

// The GroupItem component
const GroupItem = <T,>({
    customer,
    ind,
    refetchToggleFavorite,
    getLable,
    getChildren
}: IResultItem<T>) => {
    return (
        <div className="flex text-L-gray-600 dark:text-D-gray-600 w-full">
            <Item<T>
                customer={customer}
                key={getLable(customer)} // Ensure customerISIN is unique and defined
                ind={ind}
                refetchToggleFavorite={refetchToggleFavorite}
                getLable={(customer) => getLable(customer)}
                getChildren={(customer) => getChildren(customer)}
            />
        </div>
    );
};

// Use memo to optimize rendering
export default GroupItem;


const Item = <T,>({ customer, ind, refetchToggleFavorite, getLable, getChildren }: IResultItem<T>) => {

    return (
        <div className='w-full'>
            <Disclosure>
                {({ open }) => (
                    <div className={clsx('rounded', { "border-r-2 border-L-info-100 dark:border-D-primary-50": open })}>
                        <Disclosure.Button className={clsx("w-full flex between items-center hover:bg-L-primary-100 dark:hover:bg-D-prbg-L-primary-100", {
                            "bg-L-gray-100 dark:bg-D-gray-100": ind % 2 !== 0,
                            "bg-L-gray-300 dark:bg-D-gray-300": open,
                        })}>

                            <div className={clsx('flex items-center justify-between gap-3 p-2 w-5/6', {

                            })}>

                                <ChevronIcon
                                    width={16}
                                    height={16}
                                    className={clsx('duration-200 text-L-gray-600 dark:text-D-gray-600', open ? '' : 'rotate-180')}
                                />

                                {/* <input
                                    type="checkbox"
                                    className="cursor-pointer w-4 h-4"
                                // checked={selectedCustomers.some((item) => item.customerISIN === customer?.customerISIN)}
                                // onChange={(event) => onSelectionChanged(event.target.checked, customer)}
                                /> */}

                                <h1 className={clsx('w-full truncate text-right text-L-text-700 dark:text-D-gray-700 font-medium select-text')}>
                                    {getLable(customer)}
                                </h1>
                            </div>

                            {/* <div className='flex justify-center w-1/6'>
                                <StarIcon
                                    onClick={(e) => addToFavoriteList(e, customer.customerISIN)}
                                    className={clsx("mr-[10%]", {
                                        "text-L-gray-400 dark:text-D-gray-400 hover:text-L-primary-50 hover:dark:text-D-primary-50": true
                                    })} />
                            </div> */}
                        </Disclosure.Button>

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
                                {
                                    getChildren(customer) && getChildren(customer)?.map((item, ind) => (
                                        <ResultItem
                                            key={ind}
                                            data={item}
                                            refetchToggleFavorite={refetchToggleFavorite}
                                        />
                                    ))
                                }

                                {getChildren(customer)?.length === 0 && (
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