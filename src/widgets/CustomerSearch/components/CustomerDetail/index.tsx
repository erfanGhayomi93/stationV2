import { FC, useMemo, useState } from 'react';
import { useCustomerInformation } from 'src/app/queries/customer';
import { useCustomerSearchState } from '../../context/CustomerSearchContext';
import TabsList from 'src/common/components/TabsList';
import IdentityTab from './IdentityTab';
import FinancialTab from './FinancialTab';
import WidgetLoading from 'src/common/components/WidgetLoading';

type ICustomerDetailType = {};

const CustomerDetail = ({}: ICustomerDetailType) => {
    //
    const [activeTab, setActiveTab] = useState('identity');

    const items = useMemo<any[]>(
        () => [
            {
                key: 'identity',
                title: 'اطلاعات هویتی',
                content: <IdentityTab/>,
                tabClass: 'text-L-gray-500 dark:text-D-gray-700 outline-none font-medium',
                selectedButtonClass: 'border-b-2 border-L-primary-50 dark:border-D-primary-50 text-L-primary-50 dark:text-D-primary-50',
            },
            {
                key: 'financial',
                title: 'وضعیت مالی',
                content: <FinancialTab/>,
                tabClass: 'text-D-basic dark:text-D-gray-700 outline-none',
                selectedButtonClass: 'border-b-2 border-L-primary-50 dark:border-D-primary-50 text-L-primary-50 dark:text-D-primary-50',
            },
        ],
        [],
    );

    return (
            <div className="py-5 bg-L-basic dark:bg-D-basic">
                <TabsList
                    onChange={(idx) => setActiveTab(idx)}
                    selectedIndex={activeTab}
                    items={items}
                    buttonClass=" text-L-gray-700 dark:text-D-gray-700 "
                    className="w-full grid rounded-md relative text-1.2 grid-rows-min-one  overflow-y-auto h-full   bg-L-basic dark:bg-D-basic"
                    pannelClassName="overflow-y-auto h-full  bg-L-basic dark:bg-D-basic"
                    tabListClassName="bg-L-basic dark:bg-D-basic  relative z-[0] text-1.2"
                />
            </div>
    );
};

export default CustomerDetail;
