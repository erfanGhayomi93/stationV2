import { useMemo, useState } from 'react';
import TabsList from 'src/common/components/TabsList';
import Drafts from './tabs/Drafts';
import FailedOrders from './tabs/FailedOrders';
import GroupOrders from './tabs/GroupOrders';
import OpenOrders from './tabs/OpenOrders';
import Requests from './tabs/Requests';
import DoneOrders from './tabs/DoneOrders';
import { ExcelIcon, FilterListIcon, HistoryIcon } from 'src/common/icons';
import { useNavigate } from 'react-router-dom';

const Reports = () => {
    //
    const [activeTab, setActiveTab] = useState('Requests');
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
                content: <DoneOrders  {...{ ClickLeftNode }}/>,
            },
            {
                key: 'FailedOrders',
                title: 'سفارشات خطا دار',
                content: <FailedOrders {...{ ClickLeftNode }}/>,
            },
            {
                key: 'Drafts',
                title: 'پیش نویس ها',
                content: <Drafts  {...{ ClickLeftNode }}/>,
            },
            {
                key: 'GroupOrders',
                title: 'سفارشات گروهی',
                content: <GroupOrders />,
            },
        ],
        [ClickLeftNode],
    );

    const leftNode = (
        <>
            <button
                // onClick={() => setisOpen(true)}
                className="ml-2 flex items-center p-1 justify-center bg-L-gray-150 dark:bg-D-gray-150 rounded text-L-primary-50 dark:text-D-primary-50 border-L-primary-50 dark:border-D-primary-50 border"
            >
                <ExcelIcon width={12} height={14} />
            </button>
            <button
                // onClick={() => setisOpen(true)}
                className="ml-2 flex items-center p-1 justify-center bg-L-gray-150 dark:bg-D-gray-150 rounded text-L-primary-50 dark:text-D-primary-50 border-L-primary-50 dark:border-D-primary-50 border"
            >
                <FilterListIcon width={12} height={14} onClick={() => handleChangeLeftNode('isFilter')} />
            </button>
            <button
                // onClick={() => setisOpen(true)}
                className="ml-4 flex items-center p-1 justify-center bg-L-gray-150 dark:bg-D-gray-150 rounded text-L-primary-50 dark:text-D-primary-50 border-L-primary-50 dark:border-D-primary-50 border"
            >
                <HistoryIcon width={12} height={14} onClick={() => navigate("/Reports")}/>
            </button>
        </>
    );

    return <TabsList onChange={(idx) => setActiveTab(idx)} selectedIndex={activeTab} items={items} leftNode={leftNode} />;
};

export default Reports;
