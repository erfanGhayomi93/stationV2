import { FC, memo, MouseEvent } from 'react';
import { useAppDispatch, useAppValues } from 'src/redux/hooks';
import { setSelectedCustomers } from 'src/redux/slices/option';
import { seprateNumber } from 'src/utils/helpers';
import ActionCellRenderer from '../ActionCell/ActionCell';
import Message from 'src/widgets/SymbolDetail/SymbolData/tabs/Messages/Message';
import { ChevronIcon, FiClock, StarIcon } from 'src/common/icons';
import { Disclosure, Transition } from '@headlessui/react';
import clsx from 'clsx';


interface IResultItem {
    customer: IGoMultiCustomerType,
    ind: number,
    addToFavoriteList: (e: MouseEvent<SVGSVGElement>, id: string) => void
}

const GroupItem: FC<IResultItem> = ({ customer, ind, addToFavoriteList }) => {
    const appDispatch = useAppDispatch();
    const {
        option: { selectedCustomers },
    } = useAppValues();

    const onSelectionChanged = (isChecked: boolean, customer: IGoMultiCustomerType) => {
        isChecked
            ? appDispatch(setSelectedCustomers([...selectedCustomers, customer]))
            : appDispatch(setSelectedCustomers(selectedCustomers.filter((item) => item.customerISIN !== customer?.customerISIN)));
    };


    return (
        <div className="flex text-L-gray-600 dark:text-D-gray-600 w-full">
            <Item
                customer={customer}
                key={customer.customerISIN}
                ind={ind}
                addToFavoriteList={addToFavoriteList}
            />
        </div>
    );
};

export default memo(GroupItem);



const Item: FC<IResultItem> = ({ customer, ind, addToFavoriteList }) => {

    return (
        <div className='w-full'>
            <Disclosure>
                {({ open }) => (
                    <div className={clsx('rounded', { "border-r-2 border-L-info-100 dark:border-D-primary-50": open })}>
                        <Disclosure.Button className={clsx("w-full flex between items-center hover:bg-L-gray-300 dark:hover:bg-D-gray-300", {
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

                                <input
                                    type="checkbox"
                                    className="cursor-pointer w-4 h-4"
                                // checked={selectedCustomers.some((item) => item.customerISIN === customer?.customerISIN)}
                                // onChange={(event) => onSelectionChanged(event.target.checked, customer)}
                                />

                                <h1 className={clsx('w-full truncate text-right text-L-text-700 dark:text-D-gray-700 font-medium')}>
                                    {customer.title}
                                </h1>
                            </div>

                            <div className='flex justify-center w-1/6'>
                                <StarIcon
                                    onClick={(e) => addToFavoriteList(e, customer.customerISIN)}
                                    className={clsx("mr-[10%]", {
                                        "text-L-gray-400 dark:text-D-gray-400 hover:text-L-primary-50 hover:dark:text-D-primary-50": true
                                    })} />
                            </div>
                        </Disclosure.Button>

                        {/* <Transition
                            show={open}
                            enter="transition duration-100 ease-out"
                            enterFrom="transform scale-95 opacity-0"
                            enterTo="transform scale-100 opacity-100"
                            leave="transition duration-75 ease-out"
                            leaveFrom="transform scale-100 opacity-100"
                            leaveTo="transform scale-95 opacity-0"
                        > */}
                        <Disclosure.Panel className="text-xs font-normal text-L-gray-500 dark:text-D-gray-500 text-right">
                            {
                                customer.children.map((item, ind) => (
                                    <div key={ind} className='flex bg-L-gray-100 dark:bg-D-gray-100'>
                                        <div className="w-full flex items-center gap-4 justify-start truncate border-l border-L-basic dark:border-D-basic pr-2">
                                            <input
                                                type="checkbox"
                                                className="cursor-pointer"
                                            // checked={selectedCustomers.some((item) => item.customerISIN === customer?.customerISIN)}
                                            // onChange={(event) => onSelectionChanged(event.target.checked, customer)}
                                            />
                                            {item?.title}
                                        </div>
                                        <div className="w-4/6  flex items-center justify-center text-L-gray-500 dark:text-D-gray-500 border-l border-L-basic dark:border-D-basic">{item?.bourseCode}</div>
                                        <div className="w-4/6  flex items-center justify-center border-l border-L-basic dark:border-D-basic">{item?.nationalCode}</div>
                                        <div className="w-4/6  flex items-center justify-center border-l border-L-basic dark:border-D-basic">{seprateNumber(item?.purchasePower)}</div>
                                        <div className="w-4/6  flex items-center justify-center border-l border-L-basic dark:border-D-basic">-</div>
                                        <div className="w-4/6  flex items-center justify-center border-l">
                                            <ActionCellRenderer {...item} />
                                        </div>
                                    </div>
                                ))
                            }
                        </Disclosure.Panel>
                        {/* </Transition> */}
                    </div>
                )}
            </Disclosure>
        </div>
    )
}