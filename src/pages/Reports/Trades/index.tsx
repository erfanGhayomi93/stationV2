import Tippy from '@tippyjs/react';
import { Excel2Icon, Refresh2Icon } from 'src/common/icons';
import TradesFilter from './components/TradesFilter';
import TradesTable from './components/TradesTable';

const Trades = () => {
    //

    return (
        <div className="bg-L-basic dark:bg-D-basic p-6 grid grid-rows-min-one gap-5">
            <div className="flex items-center justify-between">
                <h1 className="text-L-gray-500 dark:text-D-gray-700 font-medium text-2xl">معاملات</h1>
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
                <TradesFilter />
                <div className="grid grid-rows-one-min">
                    <TradesTable />
                </div>
            </div>
        </div>
    );
};

export default Trades;
