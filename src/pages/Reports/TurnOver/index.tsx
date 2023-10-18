import Tippy from '@tippyjs/react';
import { Excel2Icon, Refresh2Icon } from 'src/common/icons';

import { useCallback, useEffect, useState } from 'react';
import dayjs, { ManipulateType } from 'dayjs';
import TurnOverFilter from './components/TurnOverFilter';
import TurnOverTable from './components/TurnOverTable';
import { useTranslation } from 'react-i18next';
import { turnOverState } from './constant';
import { useGetCustomerTurnOver } from 'src/app/queries/customer';
import useIsFirstRender from 'src/common/hooks/useIsFirstRender';
import { cleanObjectOfFalsyValues } from 'src/utils/helpers';

const TurnOver = () => {
    //
    const { t } = useTranslation();
    const [params, setParams] = useState<ITurnOverStateType>(turnOverState);
    const { Time, PageNumber, PageSize } = params;
    const isFirstRender = useIsFirstRender();

    const {
        data: turnOverData,
        refetch: getTurnOver,
        isFetching,
    } = useGetCustomerTurnOver({
        ...(cleanObjectOfFalsyValues(params) as IGetCustomerTurnOverRequestType),
        SymbolISIN: params.SymbolISIN.map(({ symbolISIN }) => symbolISIN)[0],
        CustomerISIN: params.CustomerISIN.map(({ customerISIN }) => customerISIN)[0],
    });

    useEffect(() => {
        !isFirstRender && getTurnOver();
    }, [PageNumber, PageSize]);

    const onTimeChangeHandler = (time: string | undefined) => {
        if (!time || time === 'custom') return;

        const DateTo = dayjs().format('YYYY-MM-DDT23:59:59');
        const DateFrom = dayjs()
            .subtract(1, time as ManipulateType)
            .format('YYYY-MM-DDT00:00:00');

        setParams((pre) => ({
            ...pre,
            DateFrom,
            DateTo,
        }));
    };

    useEffect(() => {
        onTimeChangeHandler(Time);
    }, [Time]);

    const PaginatorHandler = useCallback((action: 'PageNumber' | 'PageSize', value: number) => {
        setParams((pre) => ({ ...pre, [action]: value }));
    }, []);

    const onClearFilters = () => {
        setParams(turnOverState);
    };

    return (
        <div className="bg-L-basic dark:bg-D-basic p-6 grid grid-rows-min-one gap-5">
            <div className="flex items-center justify-between">
                <h1 className="dark:text-D-gray-700 font-medium text-2xl">{t('titlePage.Reports/turnover')}</h1>
                <div className="flex gap-2 px-2 py-1 rounded-md text-L-gray-600 dark:text-D-gray-600 bg-L-gray-300 dark:bg-D-gray-300">
                    <Tippy content={t('Action_Button.Update')} className="text-xs">
                        <Refresh2Icon className="cursor-pointer outline-none" />
                    </Tippy>
                    <Tippy content={t('Action_Button.ExportExcel')} className="text-xs">
                        <Excel2Icon className="cursor-pointer outline-none" />
                    </Tippy>
                </div>
            </div>
            <div className="grid gap-4 grid-rows-min-one">
                <TurnOverFilter params={params} setParams={setParams} onSubmit={getTurnOver} onClear={onClearFilters} />
                <div className="grid grid-rows-one-min">
                    <TurnOverTable
                        data={turnOverData}
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

export default TurnOver;
