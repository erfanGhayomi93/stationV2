import { FC, useMemo } from 'react';
import { useDeleteDetailsBasket, useGetDetailsBasket } from 'src/app/queries/basket';
import AGTable, { ColDefType } from 'src/common/components/AGTable';
import { valueFormatterCustomerTitle, valueFormatterDate, valueFormatterIndex, valueFormatterSide } from 'src/utils/helpers';
import ActionCell, { TypeActionEnum } from 'src/widgets/Reports/components/actionCell';

type ITableType = {
    activeBasket: number | undefined;
    listAfterFilter: IListDetailsBasket[] | undefined;
};

export const TableBasket: FC<ITableType> = ({ activeBasket, listAfterFilter }) => {
    const { mutate: mutateDelete } = useDeleteDetailsBasket(activeBasket);

    const handleDelete = (data: any): void => {
        mutateDelete(data.id);
    };

    const columns = useMemo(
        (): ColDefType<any>[] => [
            { headerName: 'ردیف', field: 'customerTitles', valueFormatter: valueFormatterIndex },
            { headerName: 'مشتری', field: 'customers', valueFormatter: valueFormatterCustomerTitle },
            { headerName: 'نماد', field: 'symbolTitle' },
            { headerName: 'سمت', field: 'side', valueFormatter: valueFormatterSide },
            { headerName: 'قیمت', field: 'price', type: 'sepratedNumber' },
            { headerName: 'تاریخ', field: 'date', valueFormatter: valueFormatterDate },
            { headerName: 'تعداد', field: 'quantity', type: 'sepratedNumber' },
            {
                headerName: 'عملیات',
                field: 'customTitle',
                cellRenderer: (row: any) => <ActionCell data={row.data} type={[TypeActionEnum.DELETE]} handleDelete={handleDelete} />,
            },
        ],
        [],
    );

    return (
        <div className="w-full h-[445px] max-h-full overflow-y-auto">
            <AGTable
                rowData={listAfterFilter}
                columnDefs={columns}
                // rowSelection="multiple"
                // enableBrowserTooltips={false}
                // suppressRowClickSelection={true}
                // onRowSelected={onRowSelected}
            />
        </div>
    );
};
