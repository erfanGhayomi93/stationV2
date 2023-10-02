import { GridReadyEvent } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import React, { forwardRef, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import AGTable, { ColDefType } from 'src/common/components/AGTable';
import { Paginator } from 'src/common/components/Paginator/Paginator';
import WidgetLoading from 'src/common/components/WidgetLoading';

interface IProps {
    setGridApi: (x: GridReadyEvent) => void;
    data: any;
    pageNumber: number;
    pagesize: number;
    loading: boolean;
    PaginatorHandler: (action: 'PageNumber' | 'PageSize', value: number) => void;
}

const RequestTable = ({ setGridApi }: IProps) => {
    //
    const { t } = useTranslation();

    const Columns = useMemo(
        (): ColDefType<any>[] => [
            {
                headerName: t('ag_columns_headerName.row'),
                field: 'agTableIndex',
                sortable: false,
                checkboxSelection: true,
                minWidth: 60,
                maxWidth: 80,
                lockVisible: true,
                pinned: 'right',
            },
            { headerName: t('ag_columns_headerName.requestNumber'), field: 'requestNumber' },
            { headerName: t('ag_columns_headerName.customer'), field: 'customerTitle', type: 'sepratedNumber' },
            { headerName: t('ag_columns_headerName.bourseCode'), field: 'bourseCode' },
            {
                headerName: t('ag_columns_headerName.side'),
                field: 'orderSide',
                type: 'sepratedNumber',
                cellClassRules: {
                    'text-L-success-200': ({ value }) => value === 'Buy',
                    'text-L-error-200': ({ value }) => value === 'Sell',
                },
            },
            { headerName: t('ag_columns_headerName.station'), field: 'station', type: 'sepratedNumber' },
            { headerName: t('ag_columns_headerName.symbol'), field: 'symbolTitle' },
            {
                headerName: t('ag_columns_headerName.price'),
                field: 'price',
                type: 'sepratedNumber',
            },
            { headerName: t('ag_columns_headerName.volume'), field: 'volume' },
            { headerName: t('ag_columns_headerName.fund'), field: 'fund' },
            { headerName: t('ag_columns_headerName.requestValidity'), field: 'requestValidity' },
            { headerName: t('ag_columns_headerName.status'), field: 'status' },
            { headerName: t('ag_columns_headerName.actions'), field: 'agTableAction', lockVisible: true, pinned: 'left' },
        ],
        [],
    );

    return (
        <>
            <WidgetLoading spining={false}>
                <AGTable rowSelection="multiple" rowData={[]} columnDefs={Columns} onGridReady={(grid) => setGridApi(grid)} />
            </WidgetLoading>
            <div className="border-t flex justify-end items-center  pt-4 ">
                <Paginator
                    loading={false}
                    pageNumber={1}
                    pageSize={25}
                    totalPages={0}
                    hasNextPage={true}
                    hasPreviousPage={true}
                    PaginatorHandler={() => {}}
                />
            </div>
        </>
    );
};

export default RequestTable;
