import Tippy from '@tippyjs/react';
import { ICellRendererParams, IHeaderParams } from 'ag-grid-community';
import { HeaderComp } from 'ag-grid-community/dist/lib/headerRendering/cells/column/headerComp';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import AGTable, { ColDefType } from 'src/common/components/AGTable';
import { Paginator } from 'src/common/components/Paginator/Paginator';
import WidgetLoading from 'src/common/components/WidgetLoading';
import { InfoIcon } from 'src/common/icons';

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

    const Columns = useMemo(
        (): ColDefType<any>[] => [
            { headerName: t('ag_columns_headerName.row'), field: 'index', width: 20 },
            { headerName: t('ag_columns_headerName.customer'), field: 'customerTitle' },
            { headerName: t('ag_columns_headerName.bourseCode'), field: 'bourceCode' },
            { headerName: t('ag_columns_headerName.symbol'), field: 'symboTitle', type: 'sepratedNumber' },
            { headerName: t('ag_columns_headerName.side'), field: 'orderSide', type: 'sepratedNumber' },
            { headerName: t('ag_columns_headerName.date'), field: 'date', type: 'date' },
            { headerName: t('ag_columns_headerName.count'), field: 'count', type: 'abbreviatedNumber' },
            { headerName: t('ag_columns_headerName.price'), field: 'price', type: 'sepratedNumber' },
            {
                headerName: t('ag_columns_headerName.finalCost'),
                field: 'cost',
                type: 'sepratedNumber',
                headerComponent: ({ displayName }: IHeaderParams) => (
                    <Tippy content={t('Tooltip.finalCostWithCommision')} className="text-xs">
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
                <AGTable rowData={[]} columnDefs={Columns} />
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

const Comp = ({ data }: ICellRendererParams) => {
    console.log(data);
    return <div></div>;
};
