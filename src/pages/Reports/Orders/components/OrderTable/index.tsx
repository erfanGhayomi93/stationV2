import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import AGTable, { ColDefType } from 'src/common/components/AGTable';
import { Paginator } from 'src/common/components/Paginator/Paginator';
import WidgetLoading from 'src/common/components/WidgetLoading';
import { valueFormatterSide } from 'src/utils/helpers';

interface IOrdersTableType {
    data: IGTOrderListResponseType | undefined;
    pageNumber: number;
    pagesize: number;
    loading: boolean;
    PaginatorHandler: (action: 'PageNumber' | 'PageSize', value: number) => void;
}
const OrdersTable = ({ data, pageNumber, pagesize, loading, PaginatorHandler }: IOrdersTableType) => {
    //
    const { t } = useTranslation();
    const { result: rowData } = data || {};

    const Columns = useMemo(
        (): ColDefType<IGTOrderListResultType>[] => [
            {
                headerName: t('ag_columns_headerName.row'),
                sortable: false,
                minWidth: 60,
                maxWidth: 80,
                valueFormatter: ({ node }) => String((pageNumber - 1) * pagesize + node?.rowIndex! + 1),
            },
            { headerName: t('ag_columns_headerName.customer'), field: 'customerTitle' },
            { headerName: t('ag_columns_headerName.symbol'), field: 'symbolTitle', type: 'sepratedNumber' },
            {
                headerName: t('ag_columns_headerName.side'),
                field: 'orderSide',
                type: 'sepratedNumber',
                valueFormatter: valueFormatterSide,
                cellClassRules: {
                    'text-L-success-200': ({ value }) => value === 'Buy',
                    'text-L-error-200': ({ value }) => value === 'Sell',
                },
            },
            { headerName: t('ag_columns_headerName.count'), field: 'quantity', type: 'sepratedNumber' },
            { headerName: t('ag_columns_headerName.price'), field: 'price', type: 'sepratedNumber' },
            {
                headerName: t('ag_columns_headerName.tradeValue'),
                field: 'price',
                type: 'sepratedNumber',
                valueGetter: ({ data }) => (data?.price || 0) * (data?.quantity || 0),
            },
            { headerName: t('ag_columns_headerName.status'), field: 'omsOrderState', valueFormatter: ({ value }) => t('order_status.' + value) },
            { headerName: t('ag_columns_headerName.date'), field: 'orderDateTime', type: 'date' },
        ],
        [pageNumber, pagesize],
    );
    return (
        <>
            <WidgetLoading spining={loading}>
                <AGTable rowData={rowData || []} columnDefs={Columns} />
            </WidgetLoading>
            <div className="border-t flex justify-end items-center  pt-4 ">
                <Paginator
                    loading={loading}
                    pageNumber={pageNumber}
                    pageSize={pagesize}
                    totalPages={data?.totalPages}
                    hasNextPage={data?.hasNextPage}
                    hasPreviousPage={data?.hasPreviousPage}
                    PaginatorHandler={PaginatorHandler}
                />
            </div>
        </>
    );
};

export default OrdersTable;
