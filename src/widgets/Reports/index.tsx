import Tippy from '@tippyjs/react';
import { useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TabsList from 'src/common/components/TabsList';
import { Check, ExcelIcon, HistoryIcon, Refresh2Icon } from 'src/common/icons';
import DoneOrders from './tabs/DoneOrders';
import Drafts from './tabs/Drafts';
import OpenOrders from './tabs/OpenOrders';
import Requests from './tabs/Requests';
import { OpenPosition } from './tabs/OpenPosition';
import clsx from 'clsx';
import { t } from 'i18next';
import AllOrders from './tabs/AllOrders';
import { useAppDispatch } from 'src/redux/hooks';
import { setIsOpenBuySellGroup } from 'src/redux/slices/BuySellGroupSlice';


const Reports = () => {
    //
    const [activeTab, setActiveTab] = useState('Drafts');
    const [aggregateType, setAggregateType] = useState<IAggregate>('');

    const [requestsTabData, setRequestsTabData] = useState({ allCount: 0, selectedCount: 0 });

    const requestsRef = useRef({ sendRequests: () => { }, sendAllRequests: () => { }, getOfflineRequestsExcel: () => { }, refetchOffline: () => { } });
    const AllOrderRef = useRef({ removeGroupRequest: () => { } })

    const appDispatch = useAppDispatch();

    const isBothFilter = aggregateType === 'Both';
    const isSymbolFilter = aggregateType === 'Symbol';

    const navigate = useNavigate();

    const changeAggregateFilter = (aggregate: IAggregate) => {
        let type: IAggregate = '';

        if (aggregateType === '') {
            type = aggregate;
        } else if (aggregate === aggregateType) {
            type = '';
        }
        else {
            type = aggregate
        }
        //  else if ((aggregate === 'Customer' && aggregateType === 'Symbol') || (aggregate === 'Symbol' && aggregateType === 'Customer')) {
        //     type = 'Both';
        // } else {
        //     type = aggregateType === 'Both' ? (aggregate === 'Customer' ? 'Symbol' : 'Customer') : '';
        // }

        setAggregateType(type);
    };

    const items = useMemo(
        () => [
            {
                key: 'Requests',
                title: 'درخواست‌ها',
                content: <Requests
                    ref={requestsRef}
                    setRequestsTabData={setRequestsTabData}
                />,
            },
            {
                key: 'AllOrders',
                title: 'سفارشات',
                content: <AllOrders
                    ref={AllOrderRef}
                />,
            },
            {
                key: 'OpenOrders',
                title: 'سفارشات باز',
                content: <OpenOrders />,
            },
            {
                key: 'DoneOrders',
                title: 'معاملات',
                content: <DoneOrders aggregateType={aggregateType} />,
            },
            // {
            //     key: 'FailedOrders',
            //     title: 'سفارشات خطا دار',
            //     content: <FailedOrders />,
            // },
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

    const handleSendRequestsButtonTitle = () => {
        const { allCount, selectedCount } = requestsTabData;

        if (allCount) {
            return allCount === selectedCount ? '(همه)' : `(${selectedCount + '/' + allCount})`;
        } else {
            return '';
        }
    };

    const handleExcelBtn = () => {
        switch (activeTab) {
            case 'Requests':
                requestsRef.current.getOfflineRequestsExcel()
                break;
            default:
                break;
        }
    };

    const handleReportsBtn = () => {
        switch (activeTab) {
            case 'Requests':
                navigate('/Requests/Offline');
                break;

            default:
                navigate('/Reports/orders');
                break;
        }
    };

    const leftNode = (
        <div className="flex gap-x-4 w-full h-full justify-end items-center">
            {activeTab === 'DoneOrders' ? (
                <div className="flex gap-x-2 items-center my-2">
                    <span className="text-L-gray-600 dark:text-D-gray-600 text-sm">تجمیع بر اساس:</span>

                    {
                        aggregateType !== 'Symbol' && (
                            <button
                                onClick={() => changeAggregateFilter('Both')}
                                data-actived={isBothFilter}
                                className={clsx(
                                    'px-2 py-1.5 rounded-lg border flex justify-center items-center border-L-primary-50 dark:border-D-primary-50 text-L-primary-50 dark:text-D-primary-50 actived:bg-L-primary-100 actived:dark:bg-D-primary-100 ',
                                )}
                            >
                                <span>مشتری/نماد</span>
                                <span
                                    data-actived={isBothFilter}
                                    className={clsx(
                                        'w-4 h-4 rounded-full mr-3 flex items-center justify-center bg-L-primary-100 dark:bg-D-primary-100 actived:bg-L-primary-50 actived:dark:bg-D-primary-50',
                                    )}
                                >
                                    {isBothFilter && <Check className="text-white" width={9} height={9} />}
                                </span>
                            </button>
                        )
                    }



                    {
                        aggregateType !== 'Both' && (
                            <button
                                onClick={() => changeAggregateFilter('Symbol')}
                                data-actived={isSymbolFilter}
                                className={clsx(
                                    'px-2 py-1.5 rounded-lg border flex justify-center items-center border-L-primary-50 dark:border-D-primary-50 text-L-primary-50 dark:text-D-primary-50 actived:bg-L-primary-100 actived:dark:bg-D-primary-100 ',
                                )}
                            >
                                <span>نماد</span>
                                <span
                                    data-actived={isSymbolFilter}
                                    className={clsx(
                                        'w-4 h-4 rounded-full mr-3 flex items-center justify-center bg-L-primary-100 dark:bg-D-primary-100 actived:bg-L-primary-50 actived:dark:bg-D-primary-50',
                                    )}
                                >
                                    {isSymbolFilter && <Check className="text-white" width={9} height={9} />}
                                </span>
                            </button>
                        )
                    }


                </div>
            ) : activeTab === 'Requests' ? (
                <div className="flex gap-x-2 items-center">
                    <button
                        className="rounded h-8 px-2 flex justify-center items-center text-L-basic dark:text-D-basic bg-L-success-200 hover:bg-L-success-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-L-success-200"
                        onClick={() => requestsRef.current.sendRequests()}
                        disabled={!!!requestsTabData.selectedCount}
                    >
                        {`ارسال درخواست ${handleSendRequestsButtonTitle()}`}
                    </button>
                    <button
                        onClick={() => requestsRef.current.sendAllRequests()}
                        className="px-2 h-8 bg-L-primary-50 dark:bg-D-primary-50 py-1 border border-L-primary-50 dark:border-D-primary-50 text-L-basic dark:text-D-basic rounded"
                    >
                        {'ارسال همه درخواست ها'}
                    </button>
                    <Tippy content={t('Action_Button.Update')} >
                        <button
                            onClick={() => requestsRef.current.refetchOffline()}
                            className="flex items-center p-1.5 justify-center bg-L-basic dark:bg-D-basic rounded text-L-gray-600 dark:text-D-gray-600"
                        >
                            <Refresh2Icon
                                width={19}
                                height={19}
                            />
                        </button>
                    </Tippy>
                </div>
            ) : (activeTab === 'AllOrders' || activeTab === 'OpenOrders') ? (
                <div>
                    <button
                        className="rounded h-8 px-2 flex justify-center items-center text-L-info-100 dark:text-D-info-100 bg-L-basic dark:bg-D-basic disabled:opacity-50 disabled:cursor-not-allowed border border-L-info-100  dark:border-D-info-100"
                        onClick={() => appDispatch(setIsOpenBuySellGroup(true))}
                    // disabled={!!!requestsTabData.selectedCount}
                    >
                        ویرایش و حذف گروهی درخواست
                    </button>
                </div>
            ) : null}

            <div className="flex my-2">
                <Tippy content="خروجی اکسل">
                    <button
                        // onClick={() => setisOpen(true)}
                        onClick={handleExcelBtn}
                        className="ml-2 flex items-center p-1.5 justify-center bg-L-basic dark:bg-D-basic rounded text-L-gray-600 dark:text-D-gray-600"
                    >
                        <ExcelIcon width={19} height={19} />
                    </button>
                </Tippy>
                {/* <Tooltip title='' position='top'> 
                <button
                    onClick={() => handleChangeLeftNode('isFilter')}
                    className="ml-2 flex items-center p-1 justify-center bg-L-gray-300 dark:bg-D-gray-300 rounded"
                >
                    <FilterListIcon width={13} height={13} />
                </button>
            </Tooltip> */}
                <Tippy content="گزارشات">
                    <button
                        onClick={handleReportsBtn}
                        className="ml-4 flex items-center p-1.5 justify-center bg-L-basic dark:bg-D-basic rounded text-L-gray-600 dark:text-D-gray-600"
                    >
                        <HistoryIcon width={19} height={19} />
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
            className='w-full h-full flex flex-col relative text-1.2'
        />
    );
};

export default Reports;
