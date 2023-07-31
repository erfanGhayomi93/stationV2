import Tippy from '@tippyjs/react';
import { Excel2Icon, Refresh2Icon } from 'src/common/icons';

import { useState } from 'react';
import { DateType } from 'src/common/components/AdvancedDatePicker';
import dayjs from 'dayjs';
import TurnOverFilter from './components/TurnOverFilter';
import TurnOverTable from './components/TurnOverTable';
import { useTranslation } from 'react-i18next';

export interface TurnoverFilterTypes {
    customer: IGoMultiCustomerType[];
    symbols: SymbolSearchResult[];
    time: string;
    marketUnit: string; 
    fromDate: DateType;
    toDate: DateType;
    side: string[];
    fromCost: number;
    toCost: number;
    AggregateAble: boolean;
}

const TurnOver = () => {
    //
    const { t } = useTranslation()

    const [params, setParams] = useState<TurnoverFilterTypes>({
        customer: [],
        symbols: [],
        marketUnit: '',
        time: '',
        fromDate: dayjs().subtract(1, "day").format(),
        toDate: '', 
        side: [], 
        fromCost: 0,
        toCost: 0,      
        AggregateAble: false,
    })

    return (
        <div className="bg-L-basic dark:bg-D-basic p-6 grid grid-rows-min-one gap-5">
            <div className="flex items-center justify-between">
                <h1 className="dark:text-D-gray-700 font-medium text-2xl">{t("page_title.turnOver")}</h1>
                <div className="flex gap-2 px-2 py-1 rounded-md text-L-gray-600 dark:text-D-gray-600 bg-L-gray-300 dark:bg-D-gray-300">
                    <Tippy content={t("Action_Button.Update")} className="text-xs">
                        <Refresh2Icon className="cursor-pointer outline-none" />
                    </Tippy>
                    <Tippy content={t("Action_Button.ExportExcel")} className="text-xs">
                        <Excel2Icon className="cursor-pointer outline-none" />
                    </Tippy>
                </div>
            </div>
            <div className="grid gap-4 grid-rows-min-one">
                <TurnOverFilter params={params} setParams={setParams}/>
                <div className="grid grid-rows-one-min">
                    <TurnOverTable />
                </div>
            </div>
        </div>
    );
};

export default TurnOver;
