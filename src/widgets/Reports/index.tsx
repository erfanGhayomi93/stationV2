import Tippy from '@tippyjs/react';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TabsList from 'src/common/components/TabsList';
import { ExcelIcon, HistoryIcon } from 'src/common/icons';
import DoneOrders from './tabs/DoneOrders';
import Drafts from './tabs/Drafts';
import FailedOrders from './tabs/FailedOrders';
// import GroupOrders from './tabs/GroupOrders';
import OpenOrders from './tabs/OpenOrders';
import Requests from './tabs/Requests';

const Reports = () => {
    //
    const [activeTab, setActiveTab] = useState('OpenOrders');
    const [ClickLeftNode, setClickLeftNode] = useState<any>({
        isFilter: false,
    });
    const navigate = useNavigate();

    const handleChangeLeftNode = (type: string) => {
        setClickLeftNode((prev: any) => ({
            ...prev,
            [type]: !prev[type],
        }));
    };

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
                content: <OpenOrders {...{ ClickLeftNode }} />,
            },
            {
                key: 'DoneOrders',
                title: 'سفارشات انجام شده',
                content: <DoneOrders {...{ ClickLeftNode }} />,
            },
            {
                key: 'FailedOrders',
                title: 'سفارشات خطا دار',
                content: <FailedOrders {...{ ClickLeftNode }} />,
            },
            {
                key: 'Drafts',
                title: 'پیش نویس ها',
                content: <Drafts {...{ ClickLeftNode }} />,
            },
            // {
            //     key: 'GroupOrders',
            //     title: 'سفارشات گروهی',
            //     content: <GroupOrders />,
            // },
        ],
        [ClickLeftNode],
    );

    const leftNode = (
        <>
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
        </>
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
