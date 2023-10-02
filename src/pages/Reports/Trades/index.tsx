import Tippy from '@tippyjs/react';
import { Excel2Icon, Refresh2Icon } from 'src/common/icons';
import TradesFilter from './components/TradesFilter';
import TradesTable from './components/TradesTable';
import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useTradesLists } from 'src/app/queries/order';
import dayjs, { ManipulateType } from 'dayjs';
import { initialState } from './constant';
import useIsFirstRender from 'src/common/hooks/useIsFirstRender';

interface ITradesPageType {}

const Trades = ({}: ITradesPageType) => {
    //
    const { t } = useTranslation();

    const [params, setParams] = useState<ITradeStateType>(initialState);
    const { PageNumber, PageSize, Time } = params;
    const isFirstRender = useIsFirstRender();

    const {
        data: tradesData,
        refetch: getTradesData,
        isFetching,
    } = useTradesLists({
        ...params,
        SymbolISIN: params.SymbolISIN.map(({ symbolISIN }) => symbolISIN),
        CustomerISIN: params.CustomerISIN.map(({ customerISIN }) => customerISIN),
        Side: params.Side === 'Cross' ? undefined : params.Side,
    });

    useEffect(() => {
        !isFirstRender && getTradesData();
    }, [PageNumber, PageSize]);

    const onTimeChangeHandler = (time: string | undefined) => {
        if (!time || time === 'custom') return;

        const ToDate = dayjs().format();
        const FromDate = dayjs()
            .subtract(1, time as ManipulateType)
            .format();

        setParams((pre) => ({
            ...pre,
            FromDate,
            ToDate,
        }));
    };

    useEffect(() => {
        onTimeChangeHandler(Time);
    }, [Time]);

    const PaginatorHandler = useCallback((action: 'PageNumber' | 'PageSize', value: number) => {
        setParams((pre) => ({ ...pre, [action]: value }));
    }, []);

    const onClearFilters = () => {
        setParams(initialState);
    };

    return (
        <div className="bg-L-basic dark:bg-D-basic p-6 grid grid-rows-min-one gap-5">
            <div className="flex items-center justify-between">
                <h1 className="dark:text-D-gray-700 font-medium text-2xl">{t('titlePage.Reports/trades')}</h1>
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
                        pageNumber={PageNumber}
                        pagesize={PageSize}
                        PaginatorHandler={PaginatorHandler}
                    />
                </div>
            </div>
        </div>
    );
};

export default Trades;
