import Tippy from '@tippyjs/react';
import { IHeaderParams } from 'ag-grid-community';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import AGTable, { ColDefType } from 'src/common/components/AGTable';
import { Paginator } from 'src/common/components/Paginator/Paginator';
import WidgetLoading from 'src/common/components/WidgetLoading';
import { InfoIcon } from 'src/common/icons';
import { valueFormatterSide } from 'src/utils/helpers';

interface ITradesTableType {
    data: IGTTradesResponseType | undefined;
    pageNumber: number;
    pagesize: number;
    loading: boolean;
    PaginatorHandler: (action: 'PageNumber' | 'PageSize', value: number) => void;
}

const TradesTable = ({ data, loading, pageNumber, pagesize, PaginatorHandler }: ITradesTableType) => {
    //
    const { t } = useTranslation();
    const { result: rowData } = data || {};
    const Columns = useMemo(
        (): ColDefType<IGTTradesListResultType>[] => [
            {
                headerName: t('ag_columns_headerName.row'),
                sortable: false,
                minWidth: 60,
                maxWidth: 80,
                valueFormatter: ({ node }) => String((pageNumber - 1) * pagesize + node?.rowIndex! + 1),
            },
            { headerName: t('ag_columns_headerName.customer'), field: 'customerTitle' },
            { headerName: t('ag_columns_headerName.bourseCode'), field: 'bourseCode' },
            { headerName: t('ag_columns_headerName.symbol'), field: 'symbolTitle' },
            { headerName: t('ag_columns_headerName.side'), field: 'orderSide', valueFormatter: valueFormatterSide },
            { headerName: t('ag_columns_headerName.date'), field: 'tradeDate', type: 'date' },
            { headerName: t('ag_columns_headerName.count'), field: 'tradeQuantity', type: 'abbreviatedNumber' },
            { headerName: t('ag_columns_headerName.price'), field: 'tradePrice', type: 'sepratedNumber' },
            {
                headerName: t('ag_columns_headerName.finalCost'),
                field: 'totalPrice',
                type: 'sepratedNumber',
                headerComponent: ({ displayName }: IHeaderParams) => (
                    <Tippy content={t('Tooltip.finalCostWithCommission')} className="text-xs">
                        <div className="w-full flex justify-center gap-1">
                            <span>{displayName}</span>
                            <InfoIcon width="16" height="16" />
                        </div>
                    </Tippy>
                ),
            },
        ],
        [],
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

export default TradesTable;
