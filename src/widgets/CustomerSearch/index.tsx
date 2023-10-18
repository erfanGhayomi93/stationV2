import { useMemo } from 'react';
import TabsList from 'src/common/components/TabsList';
import CustomerSearch from './tabs/customerSerarch';
import GroupSearch from './tabs/groupSearch';
import { useCustomerSearchState } from './context/CustomerSearchContext';
import FavoriteList from './tabs/favoriteList';
import SelectedListTab from './tabs/selectedList';
import { SelectedList as SelectedListIcon } from 'src/common/icons';
import clsx from 'clsx';
import CustomerPortfolioModal from './modal/CustomerPortfolioModal';
import CustomerDetailModal from './modal/CustomerDetailModal';

const CustomerWidget = () => {
    const { state: { activeTab, isPortfolioModalOpen, isDetailModalOpen }, setState } = useCustomerSearchState()

    const setActiveTab = (tab: string) => {
        setState((prev) => ({ ...prev, activeTab: tab }))
    }

    const items = useMemo(
        () => [
            {
                key: 'Customers',
                title: <>مشتریان</>,
                content: <CustomerSearch />,
            },
            {
                key: 'GroupCustomer',
                title: <>گروه مشتری</>,
                content: <GroupSearch />,
            },
            {
                key: 'FavoriteList',
                title: <>لیست دلخواه</>,
                content: <FavoriteList />,
            },
            {
                key: 'SelectedList',
                title: <div className='flex gap-1 items-center'>
                    <SelectedListIcon className={clsx({
                        "text-L-gray-500 dark:text-D-gray-500": activeTab !== "SelectedList",
                        "text-L-primary-50 dark:text-D-primary-50": activeTab === "SelectedList",
                    })} />
                    <span>لیست انتخاب شده ها</span>
                </div>,
                content: <SelectedListTab />,
            },
        ],
        [activeTab],
    );

    return (
        <>
            <div className="grid h-full gap-2">
                <TabsList
                    onChange={(idx) => setActiveTab(idx)}
                    selectedIndex={activeTab}
                    items={items}
                    buttonClass="last:absolute last:left-0 dark:text-D-gray-500 text-L-gray-500 bg-L-gray-200 dark:bg-D-gray-200"
                    selectedButtonClass="last:absolute last:left-0 after:dark:bg-D-basic after:bg-L-basic text-L-primary-50 border-t-2 border-L-primary-50 dark:border-D-primary-50 dark:text-D-primary-50 bg-L-basic dark:bg-D-basic font-semibold [&:svg]:text-L-primary-50"
                />
            </div>

            {!!isDetailModalOpen && <CustomerDetailModal />}

            {!!isPortfolioModalOpen && <CustomerPortfolioModal />}

        </>
    );
};

export default CustomerWidget