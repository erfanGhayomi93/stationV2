import Tippy from '@tippyjs/react';
import { Excel2Icon, Refresh2Icon } from 'src/common/icons';

import { useState } from 'react';
import { DateType } from 'src/common/components/AdvancedDatePicker';
import dayjs from 'dayjs';
import TurnOverFilter from './components/TurnOverFilter';
import TurnOverTable from './components/TurnOverTable';

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
                <h1 className="dark:text-D-gray-700 font-medium text-2xl">گردش حساب</h1>
                <div className="flex gap-2 px-2 py-1 rounded-md bg-L-gray-300">
                    <Tippy content="بروزرسانی" className="text-xs">
                        <Refresh2Icon className="cursor-pointer outline-none" />
                    </Tippy>
                    <Tippy content="خروجی اکسل" className="text-xs">
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
