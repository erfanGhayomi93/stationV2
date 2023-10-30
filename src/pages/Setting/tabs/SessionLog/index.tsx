import React, { useMemo, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import AGTable, { ColDefType } from 'src/common/components/AGTable';
import { Paginator } from 'src/common/components/Paginator/Paginator';
import WidgetLoading from 'src/common/components/WidgetLoading';
import ActionCell from './ActionCell';
import dayjs from 'dayjs';

const SessionLog = () => {
    //
    const { t } = useTranslation();
    const [pagination, setPagination] = useState({
        PageNumber: 1,
        PageSize: 25,
    });

    const { PageNumber, PageSize } = pagination;

    const Columns = useMemo(
        (): ColDefType<any>[] => [
            {
                headerName: t('ag_columns_headerName.row'),
                sortable: false,
                minWidth: 60,
                maxWidth: 80,
                valueFormatter: ({ node }) => String((PageNumber - 1) * PageSize + node?.rowIndex! + 1),
            },
            { headerName: t('ag_columns_headerName.deviceAddress'), field: 'deviceAddress' },
            { headerName: t('ag_columns_headerName.userName'), field: 'userName' },
            { headerName: t('ag_columns_headerName.deviceType'), field: 'deviceType' },
            { headerName: t('ag_columns_headerName.status'), field: 'status', cellClass: 'text-L-success-200' },
            { headerName: t('ag_columns_headerName.enterTime'), field: 'enterTime', type: 'date' },
            { headerName: t('ag_columns_headerName.exitTime'), field: 'exitTime', type: 'date' },
            { headerName: t('ag_columns_headerName.actions'), cellRenderer: ActionCell },
        ],
        [PageNumber, PageSize],
    );
    const paginatorHandler = useCallback((action: 'PageSize' | 'PageNumber', value: number) => {
        setPagination((pre) => ({ ...pre, [action]: value }));
    }, []);

    const rowData = [
        {
            deviceAddress: '93.118.109.23',
            userName: 'soheilkh59',
            deviceType: 'دسکتاپ',
            status: 'آنلاین',
            enterTime: dayjs(),
            exitTime: dayjs(),
        },
    ];

    return (
        <WidgetLoading spining={false}>
            <div className="h-full flex flex-col">
                <div className="grow">
                    <AGTable columnDefs={Columns} rowData={rowData} />
                </div>
                <div className="pt-4 border-t border-L-gray-300 dark:border-D-gray-300">
                    <Paginator
                        loading={false}
                        pageNumber={PageNumber}
                        pageSize={PageSize}
                        totalPages={20}
                        hasNextPage={true}
                        hasPreviousPage={true}
                        PaginatorHandler={paginatorHandler}
                    />
                </div>
            </div>
        </WidgetLoading>
    );
};

export default SessionLog;
