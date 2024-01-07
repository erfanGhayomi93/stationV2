import { t } from 'i18next';
import { useMemo, useState } from 'react';
import TabsList, { ITabItemType } from 'src/common/components/TabsList';
import Cash from './tabs/cash';
import Physical from './tabs/physical';
import { CashIcon, Excel2Icon, PhysicalSettlementIcon, Refresh2Icon } from 'src/common/icons';
import AGColumnEditor from 'src/common/components/AGTable/AGColumnEditor';
import Tippy from '@tippyjs/react';
import { GridReadyEvent } from 'ag-grid-community';

type TActiveTab = 'Cash' | 'Physical';

const OptionSettlement = () => {
    //
    const [activeTab, setActiveTab] = useState<TActiveTab>('Cash');
    const [gridApi, setGridApi] = useState<GridReadyEvent>();

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
                content: <Cash setGridApi={setGridApi}/>,
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
                content: <Physical setGridApi={setGridApi}/>,
                tabClass: 'pt-4 outline-none',
                selectedButtonClass: 'border-b-2 font-semibold border-L-primary-50 dark:border-D-primary-50 text-L-primary-50 dark:text-D-primary-50',
            },
        ],
        [],
    );

    return (
        <div className="bg-L-basic dark:bg-D-basic rounded-md p-6 flex flex-col">
            <div className="flex justify-between">
                <h1 className="dark:text-D-gray-700 font-medium text-base">{t('titlePage.optionSettlement')}</h1>
                <div className="flex items-center gap-3 p-1 rounded-md bg-L-gray-300 dark:bg-D-gray-300 text-L-gray-600 dark:text-D-gray-600">
                    <AGColumnEditor
                        gridApi={gridApi}
                        lsKey={activeTab === 'Cash' ? 'CashSettlementRequestsColumnsState' : 'PhysicalSettlementRequestsColumnsState'}
                    />
                    <Tippy content={t('Action_Button.Update')} className="text-xs">
                        <Refresh2Icon className="cursor-pointer outline-none" onClick={() => {}} />
                    </Tippy>
                    <Tippy content={t('Action_Button.ExportExcel')} className="text-xs">
                        <Excel2Icon className="cursor-pointer outline-none" />
                    </Tippy>
                </div>
            </div>
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
