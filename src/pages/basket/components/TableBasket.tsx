import clsx from 'clsx';
import { FC, useMemo } from 'react';
import { useDeleteDetailsBasket } from 'src/app/queries/basket';
import AGTable, { ColDefType } from 'src/common/components/AGTable';
import { valueFormatterCustomerTitle, valueFormatterIndex, valueFormatterSide } from 'src/utils/helpers';
import ActionCell, { TypeActionEnum } from 'src/widgets/Reports/components/actionCell';
import { filterStateType } from './FilterBasket';

type ITableType = {
    activeBasket: number | undefined;
    listAfterFilter: IListDetailsBasket[] | undefined;
    dataFilter: filterStateType;
    isShowFilter: boolean;
};

export const TableBasket: FC<ITableType> = ({ activeBasket, listAfterFilter, dataFilter, isShowFilter }) => {
    const { mutate: mutateDelete } = useDeleteDetailsBasket(activeBasket);
    const { customerTitles, symbolTitle, side } = dataFilter;

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
            { headerName: 'درصد', field: 'percent' },
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
        <div
            className={clsx('w-full  max-h-full overflow-y-auto', {
                'h-[445px]': isShowFilter,
                'h-[545px]': !isShowFilter,
            })}
        >
            <AGTable
                rowData={listAfterFilter?.filter((item) => {
                    if (!customerTitles && !symbolTitle && side === 'All') return true;
                    else if (symbolTitle && item?.symbolTitle.includes(symbolTitle)) return true;
                    else if (side && item?.side.includes(side)) return true;
                    else if (customerTitles) {
                        const customerTitlesString = String(item.customers?.map((i) => i?.customerTitle));
                        if (customerTitlesString.includes(customerTitles)) {
                            return true;
                        }
                    }
                    return false;
                })}
                columnDefs={columns}
                // rowSelection="multiple"
                // enableBrowserTooltips={false}
                // suppressRowClickSelection={true}
                // onRowSelected={onRowSelected}
            />
        </div>
    );
};
