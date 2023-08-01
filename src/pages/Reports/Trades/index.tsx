import Tippy from '@tippyjs/react';
import { Excel2Icon, Refresh2Icon } from 'src/common/icons';
import TradesFilter from './components/TradesFilter';
import TradesTable from './components/TradesTable';
import { useState } from 'react';
import { DateType } from 'src/common/components/AdvancedDatePicker';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

export interface TradesFilterTypes {
    customers: IGoCustomerSearchResult[];
    symbols: SymbolSearchResult[];
    time: string;
    fromDate: DateType;
    toDate: DateType;
    side: string[];
    customerType: string[];
    stations: string;
}

const Trades = () => {
    //
    const { t } = useTranslation()

    const [params, setParams] = useState<TradesFilterTypes>({
        customers: [],
        symbols: [],
        time: '',
        fromDate: dayjs().subtract(1, "day").format(),
        toDate: '',
        side: [],
        customerType: [],
        stations: '',
    })

    return (
        <div className="bg-L-basic dark:bg-D-basic p-6 grid grid-rows-min-one gap-5">
            <div className="flex items-center justify-between">
                <h1 className="dark:text-D-gray-700 font-medium text-2xl">{t("page_title.trades")}</h1>
                <div className="flex gap-2 px-2 py-1 rounded-md bg-L-gray-300 dark:bg-D-gray-300 text-L-gray-600 dark:text-D-gray-600">
                    <Tippy content={t("Action_Button.Update")} className="text-xs">
                        <Refresh2Icon className="cursor-pointer outline-none" />
                    </Tippy>
                    <Tippy content={t("Action_Button.ExportExcel")} className="text-xs">
                        <Excel2Icon className="cursor-pointer outline-none" />
                    </Tippy>
                </div>
            </div>
            <div className="grid gap-4 grid-rows-min-one">
                <TradesFilter params={params} setParams={setParams}/>
                <div className="grid grid-rows-one-min">
                    <TradesTable />
                </div>
            </div>
        </div>
    );
};

export default Trades;
