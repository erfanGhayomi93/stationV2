import { useEffect, useMemo, useState } from 'react';
import TabsList from 'src/common/components/TabsList';
import CustomerSearch from './tabs/customerSerarch';
import GroupSearch from './tabs/groupSearch';
import { useCustomerSearchState } from './context/CustomerSearchContext';

const CustomerWidget = () => {
    const [activeTab, setActiveTab] = useState('CustomerSearch');
    const { state: { params }, setState } = useCustomerSearchState()

    useEffect(() => {
        console.log("paramsEffect", params)
    }, [params])

    // useEffect(() => {
    //     return () => {
    //         setState((prev) => ({ ...prev, params: { ...prev.params, term: "" } }))
    //     }
    // }, [activeTab])




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
                key: 'MyGroup',
                title: <>گروه من</>,
                content: <CustomerSearch />,
            },
            {
                key: 'FavoriteList',
                title: <>لیست دلخواه</>,
                content: <CustomerSearch />,
            }
        ],
        [],
    );

    return (
        <div className="grid h-full gap-2">
            <TabsList onChange={(idx) => setActiveTab(idx)} selectedIndex={activeTab} items={items} />
        </div>
    );
};

export default CustomerWidget