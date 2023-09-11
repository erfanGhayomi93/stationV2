import React, { useEffect, useMemo, useState } from 'react';
import TabsList from 'src/common/components/TabsList';
import SearchInput from '../CustomerSearch/components/SearchInput';
import CustomerSearchWidget, { CustomerSearchProvider, useCustomerSearchState } from '../CustomerSearch/context/CustomerSearchContext';
import Portfolio from './tabs/Portfolio';
import DivideOrderModal from '../DivideOrderModal';
import CustomerSearch from '../CustomerSearch';
import CustomerDetailModal from '../CustomerSearch/modal/CustomerDetailModal';
import CustomerPortfolioModal from '../CustomerSearch/modal/CustomerPortfolioModal';

const CustomerSection = () => {
    //
    const [activeTab, setActiveTab] = useState('CustomerSearch');
    // const {
    //     state: {
    //         params: { term },
    //     },
    // } = useCustomerSearchState();

    // useEffect(() => {
    //     setActiveTab('CustomerSearch');
    // }, [term]);

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
                content: <Portfolio />,
            },
            {
                key: 'MyGroup',
                title: <>گروه من</>,
                content: <Portfolio />,
            },
            {
                key: 'FavoriteList',
                title: <>لیست دلخواه</>,
                content: <Portfolio />,
            }
        ],
        [],
    );

    return (
        <div className="grid h-full gap-2">
            {/* <SearchInput /> */}
            <TabsList onChange={(idx) => setActiveTab(idx)} selectedIndex={activeTab} items={items} />
        </div>
    );
};

export default CustomerSection

{/* <CustomerSearchWidget /> */ }
