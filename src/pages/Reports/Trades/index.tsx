import Tippy from '@tippyjs/react';
import { Excel2Icon, Refresh2Icon } from 'src/common/icons';
import TradesFilter from './components/TradesFilter';
import TradesTable from './components/TradesTable';
import { useState } from 'react';
import { DateType } from 'src/common/components/AdvancedDatePicker';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { useTradesLists } from 'src/app/queries/order';

export interface ITradesPageType {}

const Trades = ({}: ITradesPageType) => {
    //
    const { t } = useTranslation();

    const [params, setParams] = useState<IGTTradesListRequest>({
        FromDate: undefined,
        ToDate: undefined,
        Side: 'Buy',
        SymbolISIN: [],
        CustomerISIN: [],
        OrderStatus: undefined,
        PageNumber: 1,
        PageSize: 10,
    });

    const { data, refetch: getTradesData } = useTradesLists(params)

    return (
        <div className="bg-L-basic dark:bg-D-basic p-6 grid grid-rows-min-one gap-5">
            <div className="flex items-center justify-between">
                <h1 className="dark:text-D-gray-700 font-medium text-2xl">{t('page_title.trades')}</h1>
                <div className="flex gap-2 px-2 py-1 rounded-md bg-L-gray-300 dark:bg-D-gray-300 text-L-gray-600 dark:text-D-gray-600">
                    <Tippy content={t('Action_Button.Update')} className="text-xs">
                        <Refresh2Icon className="cursor-pointer outline-none" />
                    </Tippy>
                    <Tippy content={t('Action_Button.ExportExcel')} className="text-xs">
                        <Excel2Icon className="cursor-pointer outline-none" />
                    </Tippy>
                </div>
            </div>
            <div className="grid gap-4 grid-rows-min-one">
                <TradesFilter params={params} setParams={setParams} onSubmit={getTradesData}/>
                <div className="grid grid-rows-one-min">
                    <TradesTable />
                </div>
            </div>
        </div>
    );
};

export default Trades;
