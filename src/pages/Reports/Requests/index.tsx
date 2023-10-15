import Tippy from '@tippyjs/react';
import { useEffect, useState, useCallback } from 'react';
import { Excel2Icon, Refresh2Icon } from 'src/common/icons';
import { useTranslation } from 'react-i18next';
import RequestTable from './components/RequestTable';
import RequestFilter from './components/RequestFilter';
import AGColumnEditor from 'src/common/components/AGTable/AGColumnEditor';
import { GridReadyEvent } from 'ag-grid-community';
import { useGetOfflineRequests } from 'src/app/queries/order';
import { initialState } from './constant';
import useIsFirstRender from 'src/common/hooks/useIsFirstRender';
import { cleanObjectOfFalsyValues } from 'src/utils/helpers';

const Requests = () => {
    //
    const { t } = useTranslation();
    const [gridApi, setGridApi] = useState<GridReadyEvent>();
    const [params, setParams] = useState<IOfflineRequestStateType>(initialState);
    const { PageNumber, PageSize } = params;
    const isFirstRender = useIsFirstRender();

    const {
        data: offlineRequest,
        refetch: getOfflineRequest,
        isFetching,
    } = useGetOfflineRequests({
        ...cleanObjectOfFalsyValues(params) as IOfflineRequestStateType,
        SymbolISIN: params.SymbolISIN.map(({ symbolISIN }) => symbolISIN),
        CustomerISIN: params.CustomerISIN.map(({ customerISIN }) => customerISIN),
        Side: params.Side === 'Cross' ? undefined : params.Side,
    });

    useEffect(() => {
        !isFirstRender && getOfflineRequest();
    }, [PageNumber, PageSize]);

    const onClearFilters = () => {
        setParams(initialState);
    };


    const PaginatorHandler = useCallback((action: 'PageNumber' | 'PageSize', value: number) => {
        setParams((pre) => ({ ...pre, [action]: value }));
    }, []);
    return (
        <div className="bg-L-basic dark:bg-D-basic p-6 grid grid-rows-min-one gap-5">
            <div className="flex items-center justify-between">
                <h1 className="dark:text-D-gray-700 font-medium text-2xl">{t('titlePage.Reports/requests')}</h1>
                <div className="flex items-center gap-4 pl-2 rounded-md bg-L-gray-300 dark:bg-D-gray-300 text-L-gray-600 dark:text-D-gray-600">
                    <AGColumnEditor gridApi={gridApi} lsKey="requests" />
                    <Tippy content={t('Action_Button.Update')} className="text-xs">
                        <Refresh2Icon className="cursor-pointer outline-none" />
                    </Tippy>
                    <Tippy content={t('Action_Button.ExportExcel')} className="text-xs">
                        <Excel2Icon className="cursor-pointer outline-none" />
                    </Tippy>
                </div>
            </div>
            <div className="grid gap-4 grid-rows-min-one">
                <RequestFilter onClear={onClearFilters} onSubmit={getOfflineRequest} params={params} setParams={setParams}/>
                <div className="grid grid-rows-one-min">
                    <RequestTable
                        setGridApi={setGridApi}
                        PaginatorHandler={PaginatorHandler}
                        data={offlineRequest}
                        loading={isFetching}
                        pageNumber={PageNumber}
                        pagesize={PageSize}
                    />
                </div>
            </div>
        </div>
    );
};

export default Requests;
