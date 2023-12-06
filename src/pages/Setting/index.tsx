import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import TabsList, { ITabItemType } from 'src/common/components/TabsList';
import { GearIcon, SessionLogIcon, UserIcon } from 'src/common/icons';
import AccountSetting from './tabs/AccountSetting';
import SystemSetting from './tabs/SystemSetting';
import SessionLog from './tabs/SessionLog';

const Setting = () => {
    //
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState('account');

    const items = useMemo<ITabItemType[]>(
        () => [
            {
                key: 'account',
                title: (
                    <div className="flex px-2 gap-1 items-center">
                        <UserIcon className='w-5 h-5' />
                        <span>{t('setting.userSetting')}</span>
                    </div>
                ),
                content: <AccountSetting />,
                tabClass: 'pt-4 outline-none',
                selectedButtonClass: 'border-b-2 font-semibold border-L-primary-50 dark:border-D-primary-50 text-L-primary-50 dark:text-D-primary-50',
            },
            {
                key: 'system',
                title: (
                    <div className="flex px-2 gap-1 items-center">
                        <GearIcon className='w-5 h-5' />
                        <span>{t('setting.systemSetting')}</span>
                    </div>
                ),
                content: <SystemSetting />,
                tabClass: 'pt-4 outline-none',
                selectedButtonClass: 'border-b-2 font-semibold border-L-primary-50 dark:border-D-primary-50 text-L-primary-50 dark:text-D-primary-50',
            },
            {
                key: 'log',
                title: (
                    <div className="flex px-2 gap-1 items-center">
                        <SessionLogIcon className='w-5 h-5' />
                        <span>{t('setting.sessionLog')}</span>
                    </div>
                ),
                content: <SessionLog />,
                tabClass: 'pt-4 outline-none',
                selectedButtonClass: 'border-b-2 font-semibold border-L-primary-50 dark:border-D-primary-50 text-L-primary-50 dark:text-D-primary-50',
            },
        ],
        [],
    );

    return (
        <div className="bg-L-basic dark:bg-D-basic p-6 flex flex-col gap-3">
            <h1 className="dark:text-D-gray-700 font-medium text-2xl">{t('titlePage.setting')}</h1>
            <TabsList
                fill={false}
                onChange={(idx) => setActiveTab(idx)}
                selectedIndex={activeTab}
                items={items}
                buttonClass=" text-L-gray-500  dark:text-D-gray-500 "
                className="w-full grid rounded-md relative text-1.2 grid-rows-min-one overflow-y-auto h-full bg-L-basic dark:bg-D-basic"
                pannelClassName="overflow-y-auto h-full bg-L-basic dark:bg-D-basic"
                tabListClassName="bg-L-basic dark:bg-D-basic border-b border-L-gray-400 dark:border-D-gray-400 relative z-[0] text-1.2"
            />
        </div>
    );
};

export default Setting;
