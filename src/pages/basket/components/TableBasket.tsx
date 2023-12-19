import clsx from 'clsx';
import { FC, useMemo } from 'react';
import { useDeleteDetailsBasket } from 'src/app/queries/basket';
import AGTable, { ColDefType } from 'src/common/components/AGTable';
import { ComeFromKeepDataEnum } from 'src/constant/enums';
import { useAppDispatch } from 'src/redux/hooks';
import { setPartDataBuySellAction } from 'src/redux/slices/keepDataBuySell';
import { valueFormatterCustomerTitle, valueFormatterIndex, valueFormatterSide } from 'src/utils/helpers';
import ActionCell, { TypeActionEnum } from 'src/widgets/Reports/components/actionCell';
import { useBasketDispatch } from '../context/BasketContext';
import { filterStateType } from './FilterBasket';
import { setSelectedSymbol } from 'src/redux/slices/option';
import { Paginator } from 'src/common/components/Paginator/Paginator';

type ITableType = {
    activeBasket: number;
    listAfterFilter: IListDetailsBasket | undefined;
    dataFilter: filterStateType;
    isShowFilter: boolean;
    setGridApi: any;
    dataListLoading: boolean;
    handlePageInfoChange: (action: 'PageNumber' | 'PageSize', value: number) => void;
};

type TRowData = IListDetailsBasket['result'][number];

export const TableBasket = ({
    activeBasket,
    listAfterFilter,
    dataFilter,
    isShowFilter,
    setGridApi,
    dataListLoading,
    handlePageInfoChange,
}: ITableType) => {
    const { mutate: mutateDelete } = useDeleteDetailsBasket(activeBasket);
    const { customerTitles, symbolTitle, side } = dataFilter;
    const appDispatch = useAppDispatch();
    const dispatch = useBasketDispatch();

    const handleDelete = (data?: TRowData) => {
        !!data && mutateDelete(data.id);
    };
    const handleEdit = (data?: TRowData) => {
        if (!data) return;

        dispatch({ type: 'SET_BUY_SELL_MODALL', value: true });
        dispatch({ type: 'SET_ORDER_ID', value: data.id });

        appDispatch(setSelectedSymbol(data.symbolISIN));
        appDispatch(
            setPartDataBuySellAction({
                data: {
                    price: data.price,
                    quantity: data.quantity,
                    side: data.side,
                    symbolISIN: data.symbolISIN,
                    validity: data.validity,
                    validityDate: data.validityDate || null,
                    id: data.id,
                },
                comeFrom: ComeFromKeepDataEnum.Basket,
                customerIsin: data.customers.map((item) => item.customerISIN),
            }),
        );
    };

    const columns = useMemo(
        (): ColDefType<TRowData>[] => [
            {
                headerName: 'ردیف',
                field: 'customerTitles',
                valueFormatter: valueFormatterIndex,
                lockVisible: true,
                pinned: 'right',
                sortable: false,
                maxWidth: 90,
            },
            { headerName: 'مشتری', field: 'customers', valueFormatter: valueFormatterCustomerTitle },
            { headerName: 'نماد', field: 'symbolTitle' },
            { headerName: 'سمت', field: 'side', valueFormatter: valueFormatterSide },
            { headerName: 'قیمت', field: 'price', type: 'sepratedNumber' },
            { headerName: 'درصد', field: 'percent' },
            { headerName: 'تعداد', field: 'quantity', type: 'sepratedNumber' },
            {
                headerName: 'عملیات',
                field: 'customTitle',
                sortable: false,
                lockVisible: true,
                pinned: 'left',
                cellRenderer: (row: any) => (
                    <ActionCell
                        data={row.data}
                        type={[TypeActionEnum.DELETE, TypeActionEnum.EDIT]}
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                    />
                ),
            },
        ],
        [],
    );

    return (
        <>
            <div
                className={clsx('flex-1 mt-4 overflow-y-auto', {
                    // 'h-[445px]': isShowFilter,
                    // 'h-[545px]': !isShowFilter,
                })}
            >
                <AGTable
                    rowData={
                        listAfterFilter?.result.filter((item) => {
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
                        })
                    }
                    columnDefs={columns}
                    onGridReady={(p) => setGridApi(p)}
                    // rowSelection="multiple"
                    // enableBrowserTooltips={false}
                    // suppressRowClickSelection={true}
                    // onRowSelected={onRowSelected}
                />
            </div>
            <div className="border-t my-3"></div>
            <Paginator
                loading={dataListLoading}
                pageNumber={listAfterFilter?.pageNumber || 0}
                pageSize={listAfterFilter?.pageSize || 0}
                totalPages={listAfterFilter?.totalPages}
                hasNextPage={listAfterFilter?.hasNextPage}
                hasPreviousPage={listAfterFilter?.hasPreviousPage}
                PaginatorHandler={handlePageInfoChange}
            />
        </>
    );
};
