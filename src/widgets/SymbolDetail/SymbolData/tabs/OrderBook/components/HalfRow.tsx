import { Menu, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { useCallback } from 'react';
import { MoreDotsIcon } from 'src/common/icons';
import { seprateNumber } from 'src/utils/helpers';

interface Props {
    mode: 'Buy' | 'Sell';
    price: number;
    volume: number;
    count: number;
    isOdd: boolean;
    isInRange: boolean;
    percent: number;
    clickByeOrder?: (mode: 'Buy' | 'Sell') => void,
    clickCollectOrder?: (mode: 'Buy' | 'Sell') => void,
    clickSellOrder?: (mode: 'Buy' | 'Sell') => void,
    clickPrice?: (price: number) => void;
}

const HalfRow = ({ mode, price, count, volume, isOdd, isInRange, percent, clickByeOrder, clickCollectOrder, clickSellOrder, clickPrice }: Props) => {

    const optionsOrder = [
        { label: "خرید", onclick: clickByeOrder },
        { label: "فروش", onclick: clickSellOrder },
        { label: "جمع کردن صف", onclick: clickCollectOrder }
    ]

    const actionOrder = useCallback(
        (mode: 'Buy' | 'Sell') => {
            return (
                <Menu>
                    {({ open }) => (
                        <div className={clsx("z-50 relative", {
                            "translate-x-1": mode === 'Buy',
                            "-translate-x-1": mode === 'Sell',
                        })}>
                            <Menu.Button>
                                <span
                                    data-actived={isInRange}
                                    className={clsx("opacity-0 actived:group-hover:opacity-100 transition-opacity", {

                                    })}>
                                    <MoreDotsIcon className='rotate-90' />
                                </span>
                            </Menu.Button>

                            <Transition
                                show={open}
                                enter="transition duration-100 ease-out"
                                enterFrom="transform scale-95 opacity-0"
                                enterTo="transform scale-100 opacity-100"
                                leave="transition duration-75 ease-out"
                                leaveFrom="transform scale-100 opacity-100"
                                leaveTo="transform scale-95 opacity-0"
                                className={clsx("z-[10000] w-full h-full", {
                                    // "left-7": mode === 'Sell',
                                    // "right-3": mode === 'Buy',
                                })}
                            >
                                <div className='relative'>
                                    <Menu.Items
                                        className={clsx("absolute -top-7 rounded bg-L-gray-700 dark:bg-D-gray-700 text-L-gray-200 dark:text-D-gray-200 w-28 z-50 after:content-[''] after:w-4 after:h-4 after:absolute after:bg-L-gray-700 after:dark:bg-D-gray-700 after:rotate-45 after:-z-10 after:top-3", {
                                            "left-6 after:-left-2": mode === 'Sell',
                                            "right-6 after:-right-2": mode === 'Buy',
                                        })}
                                    >
                                        <ul>
                                            {
                                                optionsOrder.map((item, ind) => (
                                                    <li
                                                        className='m-2 cursor-pointer'
                                                        key={ind}
                                                        onClick={() => item.onclick ? item.onclick(mode) : null}
                                                    >
                                                        {item.label}
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </Menu.Items>
                                </div>
                            </Transition>
                        </div>
                    )}
                </Menu>

            )
        },
        [],
    )



    if (mode === 'Buy') {
        return isInRange ? (
            <div
                className={clsx(
                    'text-xs text-L-gray-700 font-medium dark:text-D-gray-700 rounded m-1',
                    isOdd ? 'bg-L-gray-100 dark:bg-D-gray-100' : '',
                    isInRange ? '' : 'bg-transparent dark:bg-transparent opacity-60',
                )}
            >
                <div className="h-full w-full relative">
                    <div
                        className={clsx(
                            'absolute bg-L-success-100 dark:bg-D-success-100 rounded h-full left-0 duration-200',
                            isInRange ? '' : 'bg-transparent dark:bg-transparent',
                        )}
                        style={{ width: `${percent * 100}%` }}
                    ></div>
                    <div className={clsx('relative flex px-2 py-1 h-full items-center group')}>
                        {!!clickByeOrder && actionOrder(mode)}

                        <span className="text-right" style={{ width: '20%' }}>
                            {seprateNumber(count || 0)}
                        </span>
                        <span className="cursor-pointer">{seprateNumber(volume || 0)}</span>
                        <span
                            className="mr-auto cursor-pointer"
                            onClick={() => !!clickPrice ? clickPrice(price) : null}
                        >
                            {seprateNumber(price || 0)}
                        </span>
                    </div>
                </div>
            </div>
        ) : <></>;
    }

    if (mode === 'Sell') {
        return isInRange ? (
            <div
                className={clsx(
                    'text-xs text-L-gray-700 font-medium dark:text-D-gray-700 rounded m-1',
                    isOdd ? 'bg-L-gray-100 dark:bg-D-gray-100' : '',
                    isInRange ? '' : 'bg-transparent dark:bg-transparent opacity-60',
                )}
            >
                <div className="h-full w-full relative">
                    <div
                        className={clsx(
                            'absolute bg-L-error-100 dark:bg-D-error-100 rounded h-full right-0 duration-200',
                            isInRange ? '' : 'bg-transparent dark:bg-transparent',
                        )}
                        style={{ width: `${percent * 100}%` }}
                    ></div>
                    <div className={clsx('relative flex px-2 py-1 h-full items-center group')}>
                        <span
                            className="ml-auto cursor-pointer"
                            onClick={() => !!clickPrice ? clickPrice(price) : null}
                        >
                            {seprateNumber(price || 0)}
                        </span>
                        <span className="cursor-pointer ">{seprateNumber(volume || 0)}</span>
                        <span className="text-left" style={{ width: '20%' }}>
                            {count || 0}
                        </span>

                        {!!clickByeOrder && actionOrder(mode)}

                    </div>
                </div>
            </div>
        ) : <></>;
    }

    return <div></div>;
};

export default HalfRow;
