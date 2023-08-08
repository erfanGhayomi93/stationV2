import Tippy from '@tippyjs/react';
import { Excel2Icon, Refresh2Icon } from 'src/common/icons';
import TradesFilter from './components/TradesFilter';
import TradesTable from './components/TradesTable';
import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useTradesLists } from 'src/app/queries/order';
import dayjs from 'dayjs';

interface ITradesPageType {}

const Trades = ({}: ITradesPageType) => {
    //
    const { t } = useTranslation();

    const today = dayjs().format();
    const oneDayAgo = dayjs().subtract(1, 'day').format();
    const oneWeekAgo = dayjs().subtract(1, 'week').format();
    const oneMonthAgo = dayjs().subtract(1, 'month').format();
    const oneYearAgo = dayjs().subtract(1, 'year').format();

    const [params, setParams] = useState<IGTTradesListRequest>({
        FromDate: oneDayAgo,
        ToDate: today,
        Side: undefined,
        SymbolISIN: [],
        CustomerISIN: [],
        OrderStatus: undefined,
        PageNumber: 1,
        PageSize: 25,
        Time: 'day',
        CustomerType: undefined,
    });

    const { data: tradesData, refetch: getTradesData, isFetching } = useTradesLists(params);

    useEffect(() => {
        getTradesData();
    }, [params.PageNumber, params.PageSize]);

    useEffect(() => {
        if (params.Time === 'day') {
            setParams((pre) => ({ ...pre, FromDate: oneDayAgo, ToDate: today }));
        }
        if (params.Time === 'week') {
            setParams((pre) => ({ ...pre, FromDate: oneWeekAgo, ToDate: today }));
        }
        if (params.Time === 'month') {
            setParams((pre) => ({ ...pre, FromDate: oneMonthAgo, ToDate: today }));
        }
        if (params.Time === 'year') {
            setParams((pre) => ({ ...pre, FromDate: oneYearAgo, ToDate: today }));
        }
    }, [params.Time]);

    const PaginatorHandler = useCallback((action: 'PageNumber' | 'PageSize', value: number) => {
        setParams((pre) => ({ ...pre, [action]: value }));
    }, []);

    const onClearFilters = () => {
        setParams({
            FromDate: oneDayAgo,
            ToDate: today,
            Side: undefined,
            SymbolISIN: [],
            CustomerISIN: [],
            OrderStatus: undefined,
            PageNumber: 1,
            PageSize: 25,
            Time: 'day',
            CustomerType: undefined,
        });
    };

    return (
        <div className="bg-L-basic dark:bg-D-basic p-6 grid grid-rows-min-one gap-5">
            <div className="flex items-center justify-between">
                <h1 className="dark:text-D-gray-700 font-medium text-2xl">{t('page_title.trades')}</h1>
                <div className="flex gap-2 px-2 py-1 rounded-md bg-L-gray-300 dark:bg-D-gray-300 text-L-gray-600 dark:text-D-gray-600">
                    <Tippy content={t('Action_Button.Update')} className="text-xs">
                        <span onClick={() => getTradesData()}>
                            <Refresh2Icon className="cursor-pointer outline-none" />
                        </span>
                    </Tippy>
                    <Tippy content={t('Action_Button.ExportExcel')} className="text-xs">
                        <span onClick={onClearFilters}>
                            <Excel2Icon className="cursor-pointer outline-none" />
                        </span>
                    </Tippy>
                </div>
            </div>
            <div className="grid gap-4 grid-rows-min-one">
                <TradesFilter params={params} setParams={setParams} onSubmit={getTradesData} onClear={onClearFilters} />
                <div className="grid grid-rows-one-min">
                    <TradesTable
                        data={tradesData}
                        loading={isFetching}
                        pageNumber={params.PageNumber}
                        pagesize={params.PageSize}
                        PaginatorHandler={PaginatorHandler}
                    />
                </div>
            </div>
        </div>
    );
};

export default Trades;
