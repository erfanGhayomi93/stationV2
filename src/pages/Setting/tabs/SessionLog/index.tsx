import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import AGTable, { ColDefType } from 'src/common/components/AGTable';
import { Paginator } from 'src/common/components/Paginator/Paginator';
import WidgetLoading from 'src/common/components/WidgetLoading';
import ActionCell from './ActionCell';
import { useGetSessionLog } from 'src/app/queries/settings/sessionLog';

const SessionLog = () => {
    //
    const { t } = useTranslation();
    const [pagination, setPagination] = useState<GetSessionLogRequestParam>({
        pageNumber: 1,
        pageSize: 25,
    });

    const { data, isFetching, refetch: refetchLogins } = useGetSessionLog(pagination);

    useEffect(() => {
        refetchLogins();
    }, [pagination]);

    const { pageNumber, pageSize } = pagination;

    const Columns = useMemo(
        (): ColDefType<SessionLogResultType>[] => [
            {
                headerName: t('ag_columns_headerName.row'),
                sortable: false,
                minWidth: 60,
                maxWidth: 80,
                valueFormatter: ({ node }) => String((pageNumber - 1) * pageSize + node?.rowIndex! + 1),
            },
            { headerName: t('ag_columns_headerName.deviceAddress'), field: 'ip' },
            { headerName: t('ag_columns_headerName.userName'), field: 'userName' },
            { headerName: t('ag_columns_headerName.deviceType'), field: 'deviceType' },
            {
                headerName: t('ag_columns_headerName.status'),
                field: 'status',
                cellClassRules: {
                    'text-L-success-200': ({ value }) => value === 'Active',
                    'text-L-error-200': ({ value }) => value === 'Inactive',
                },
                valueFormatter: ({ value }) => (value === 'Active' ? 'فعال' : 'غیر فعال'),
            },
            { headerName: t('ag_columns_headerName.enterTime'), field: 'loginDate', type: 'date' },
            { headerName: t('ag_columns_headerName.exitTime'), field: 'logoutDate', type: 'date' },
            { headerName: t('ag_columns_headerName.actions'), cellRenderer: ActionCell, cellRendererParams: { refetchLogins } },
        ],
        [pageNumber, pageSize],
    );
    const paginatorHandler = useCallback((action: 'PageSize' | 'PageNumber', value: number) => {
        const act = action === 'PageNumber' ? 'pageNumber' : 'pageSize';
        setPagination((pre) => ({ ...pre, [act]: value }));
    }, []);

    return (
        <WidgetLoading spining={isFetching}>
            <div className="h-full flex flex-col">
                <div className="grow">
                    <AGTable
                        columnDefs={Columns}
                        rowData={data?.result || []}
                        suppressScrollOnNewData={true}
                        suppressRowVirtualisation={true}
                        suppressColumnVirtualisation={true}
                    />
                </div>
                <div className="pt-4 border-t border-L-gray-300 dark:border-D-gray-300">
                    <Paginator
                        loading={isFetching}
                        pageNumber={pageNumber}
                        pageSize={pageSize}
                        totalPages={data?.totalCount}
                        hasNextPage={data?.hasNextPage}
                        hasPreviousPage={data?.hasPreviousPage}
                        PaginatorHandler={paginatorHandler}
                    />
                </div>
            </div>
        </WidgetLoading>
    );
};

export default SessionLog;
