import { t } from 'i18next';
import { useMemo, useState } from 'react';
import TabsList, { ITabItemType } from 'src/common/components/TabsList';
import Cash from './tabs/cash';
import Physical from './tabs/physical';
import { CashIcon, PhysicalSettlementIcon } from 'src/common/icons';

type TActiveTab = 'Cash' | 'Physical';

const OptionSettlement = () => {
    //
    const [activeTab, setActiveTab] = useState<TActiveTab>('Cash');

    const items = useMemo<ITabItemType[]>(
        () => [
            {
                key: 'Cash',
                title: (
                    <div className="flex px-2 gap-2 items-center">
                        <CashIcon className="w-5 h-5" />
                        <span>{t('OptionSettlement.CashTabTitle')}</span>
                    </div>
                ),
                content: <Cash />,
                tabClass: 'pt-4 outline-none',
                selectedButtonClass: 'border-b-2 font-semibold border-L-primary-50 dark:border-D-primary-50 text-L-primary-50 dark:text-D-primary-50',
            },
            {
                key: 'system',
                title: (
                    <div className="flex px-2 gap-2 items-center">
                        <PhysicalSettlementIcon className="w-5 h-5" />
                        <span>{t('OptionSettlement.PhysicalTabTitle')}</span>
                    </div>
                ),
                content: <Physical />,
                tabClass: 'pt-4 outline-none',
                selectedButtonClass: 'border-b-2 font-semibold border-L-primary-50 dark:border-D-primary-50 text-L-primary-50 dark:text-D-primary-50',
            },
        ],
        [],
    );

    return (
        <div className="bg-L-basic dark:bg-D-basic rounded-md p-6 flex flex-col gap-4">
            <h1 className="dark:text-D-gray-700 font-medium text-base">{t('titlePage.optionSettlement')}</h1>
            <TabsList
                fill={false}
                onChange={(idx) => setActiveTab(idx as TActiveTab)}
                selectedIndex={activeTab}
                items={items}
                buttonClass=" text-L-gray-500 dark:text-D-gray-500"
                className="w-full grid rounded-md relative text-1.2 grid-rows-min-one overflow-y-auto h-full"
                pannelClassName="overflow-y-auto h-full bg-L-basic dark:bg-D-basic"
                tabListClassName="border-b border-L-gray-400 dark:border-D-gray-400 text-sm"
            />
        </div>
    );
};

export default OptionSettlement;
