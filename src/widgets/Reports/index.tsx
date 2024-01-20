import Tippy from '@tippyjs/react';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TabsList from 'src/common/components/TabsList';
import { Check, ExcelIcon, HistoryIcon } from 'src/common/icons';
import DoneOrders from './tabs/DoneOrders';
import Drafts from './tabs/Drafts';
import FailedOrders from './tabs/FailedOrders';
// import GroupOrders   './tabs/GroupOrders';
import OpenOrders from './tabs/OpenOrders';
import Requests from './tabs/Requests';
import { OpenPosition } from './tabs/OpenPosition';
import clsx from 'clsx';

const Reports = () => {
    //
    const [activeTab, setActiveTab] = useState('OpenOrders');
    const [aggregateType, setAggregateType] = useState<IAggregate>("")

    const isCustomerFilter = aggregateType === "Customer" || aggregateType === "Both"
    const isSymbolFilter = aggregateType === "Symbol" || aggregateType === "Both"

    const navigate = useNavigate();

    const changeAggregateFilter = (aggregate: IAggregate) => {
        let type: IAggregate = "";

        if (aggregateType === "") {
            type = aggregate;
        } else if (aggregate === aggregateType) {
            type = "";
        } else if ((aggregate === "Customer" && aggregateType === "Symbol") || (aggregate === "Symbol" && aggregateType === "Customer")) {
            type = "Both";
        } else {
            type = (aggregateType === "Both") ? (aggregate === "Customer" ? "Symbol" : "Customer") : "";
        }

        setAggregateType(type);
    }


    const items = useMemo(
        () => [
            {
                key: 'Requests',
                title: 'درخواست‌ها',
                content: <Requests />,
            },
            {
                key: 'OpenOrders',
                title: 'سفارشات باز',
                content: <OpenOrders />,
            },
            {
                key: 'DoneOrders',
                title: 'سفارشات انجام شده',
                content: <DoneOrders aggregateType={aggregateType} />,
            },
            {
                key: 'FailedOrders',
                title: 'سفارشات خطا دار',
                content: <FailedOrders />,
            },
            {
                key: 'Drafts',
                title: 'پیش نویس ها',
                content: <Drafts />,
            },
            {
                key: 'OpenPosition',
                title: 'موقعیت های باز',
                content: <OpenPosition />,
            },
            // {
            //     key: 'GroupOrders',
            //     title: 'سفارشات گروهی',
            //     content: <GroupOrders />,
            // },
        ],
        [aggregateType],
    );

    const leftNode = (
        <div className='flex gap-x-4 w-full justify-end'>

            {
                activeTab === "DoneOrders" && (
                    <div className='flex gap-x-2 items-center'>
                        <span className='text-L-gray-600 dark:text-D-gray-600'>تجمیع بر اساس:</span>

                        <button role="button" type='button'
                            onClick={() => changeAggregateFilter("Customer")}
                            data-actived={isCustomerFilter}
                            className={clsx('px-2 py-1.5 rounded-lg border flex justify-center items-center border-L-primary-50 dark:border-D-primary-50 text-L-text-50 dark:text-D-text-50 actived:bg-L-primary-100 actived:dark:bg-D-primary-100 ', {
                            })}
                        >
                            <span>مشتری</span>
                            <span
                                data-actived={isCustomerFilter}
                                className={clsx("w-4 h-4 rounded-full mr-3 flex items-center justify-center bg-L-primary-100 dark:bg-D-primary-100 actived:bg-L-primary-50 actived:dark:bg-D-primary-50")}>
                                {isCustomerFilter && <Check className="text-white" width={9} height={9} />}
                            </span>
                        </button>

                        <button role="button" type='button'
                            onClick={() => changeAggregateFilter("Symbol")}
                            data-actived={isSymbolFilter}
                            className={clsx('px-2 py-1.5 rounded-lg border flex justify-center items-center border-L-primary-50 dark:border-D-primary-50 text-L-text-50 dark:text-D-text-50 actived:bg-L-primary-100 actived:dark:bg-D-primary-100 ', {
                            })}
                        >
                            <span>نماد</span>
                            <span
                                data-actived={isSymbolFilter}
                                className={clsx("w-4 h-4 rounded-full mr-3 flex items-center justify-center bg-L-primary-100 dark:bg-D-primary-100 actived:bg-L-primary-50 actived:dark:bg-D-primary-50")}>
                                {isSymbolFilter && <Check className="text-white" width={9} height={9} />}
                            </span>
                        </button>

                    </div>
                )
            }


            <div className='flex'>
                <Tippy content="خروجی اکسل" className="text-xs">
                    <button
                        // onClick={() => setisOpen(true)}
                        className="ml-2 flex items-center p-1 justify-center bg-L-gray-300 dark:bg-D-gray-300 rounded text-L-primary-50 dark:text-D-primary-50 border-L-primary-50 dark:border-D-primary-50 border"
                    >
                        <ExcelIcon width={12} height={14} />
                    </button>
                </Tippy>
                {/* <Tooltip title='' position='top'> 
                <button
                    onClick={() => handleChangeLeftNode('isFilter')}
                    className="ml-2 flex items-center p-1 justify-center bg-L-gray-300 dark:bg-D-gray-300 rounded text-L-primary-50 dark:text-D-primary-50 border-L-primary-50 dark:border-D-primary-50 border"
                >
                    <FilterListIcon width={12} height={14} />
                </button>
            </Tooltip> */}
                <Tippy content="گزارشات" className="text-xs">
                    <button
                        onClick={() => navigate('/Reports/orders')}
                        className="ml-4 flex items-center p-1 justify-center bg-L-gray-300 dark:bg-D-gray-300 rounded text-L-primary-50 dark:text-D-primary-50 border-L-primary-50 dark:border-D-primary-50 border"
                    >
                        <HistoryIcon width={12} height={14} />
                    </button>
                </Tippy>
            </div>
        </div>
    );

    return (
        <TabsList
            onChange={(idx) => setActiveTab(idx)}
            selectedIndex={activeTab}
            items={items}
            leftNode={leftNode}
            buttonClass="px-4 dark:text-D-gray-500 text-L-gray-500 bg-L-gray-200 dark:bg-D-gray-200"
            selectedButtonClass="px-4 after:dark:bg-D-basic after:bg-L-basic text-L-primary-50 border-t-2 border-L-primary-50 dark:border-D-primary-50 dark:text-D-primary-50 bg-L-basic dark:bg-D-basic font-semibold "
        />
    );
};

export default Reports;
