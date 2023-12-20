import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import AGTable, { ColDefType } from 'src/common/components/AGTable';
import ActionCell, { TypeActionEnum } from 'src/widgets/Reports/components/actionCell';
import { ICellRendererParams } from 'ag-grid-community';
import { onErrorNotif } from 'src/handlers/notification';

interface ITableProps {
    rowData: DividedOrderRowType[];
    updateData: React.Dispatch<React.SetStateAction<DividedOrderRowType[]>>;
    setQuantityInput: React.Dispatch<React.SetStateAction<number>>;
    sendOneOrder: (id: string) => void;
    symbolMaxQuantity: number;
}

const DivideOrderTable = ({ rowData, updateData, setQuantityInput, sendOneOrder, symbolMaxQuantity }: ITableProps) => {
    //
    const { t } = useTranslation();

    const onRowValueChange = (value: number, name: 'quantity' | 'price', rowId: string | number) => {
        let totalQuantity = 0;

        updateData((pre) =>
            pre.map((item) => {
                if (item.id === rowId) {
                    totalQuantity += name === 'price' ? Number(item.quantity) : Number(value);
                    return {
                        ...item,
                        [name]: Number(value),
                        clientKey: undefined,
                        status: undefined,
                    };
                }

                totalQuantity += item.quantity;
                return item;
            }),
        );

        setQuantityInput(totalQuantity);
    };

    const onRowDelete = (data: DividedOrderRowType) => {
        updateData((pre) => pre.filter((item) => item.id !== data.id));
        setQuantityInput((pre) => pre - data.quantity);
    };

    const onRowSend = (data: DividedOrderRowType) => {
        if (data.clientKey) {
            onErrorNotif({ title: 'سفارش قبلا ارسال شده است' });
            return;
        }

        sendOneOrder(data.id);
    };

    const Columns = useMemo(
        (): ColDefType<DividedOrderRowType>[] => [
            {
                headerName: t('ag_columns_headerName.customer'),
                field: 'customerTitle',
                colId: 'customerTitle',
            },
            {
                headerName: t('ag_columns_headerName.count'),
                field: 'quantity',
                colId: 'quantity',
                type: 'sepratedNumber',
                editable: true,
                onCellValueChanged: ({ newValue, oldValue, data }) => {
                    if (Number(oldValue) !== Number(newValue)) {
                        onRowValueChange(newValue, 'quantity', data.id);
                    }
                },
                valueParser: ({ oldValue, newValue }) => {
                    if (newValue === oldValue || Number(newValue) <= 0) return oldValue;

                    const newValueAsNumber = Number(newValue);

                    if (newValueAsNumber > symbolMaxQuantity) return oldValue;
                    if (isNaN(newValueAsNumber) || newValueAsNumber === Infinity || newValueAsNumber === 0) return oldValue;

                    return newValue;
                },
            },
            {
                headerName: t('ag_columns_headerName.price'),
                field: 'price',
                colId: 'price',
                editable: true,
                type: 'sepratedNumber',
                onCellValueChanged: ({ newValue, oldValue, data }) => {
                    if (Number(oldValue) !== Number(newValue)) {
                        onRowValueChange(newValue, 'price', data.id);
                    }
                },
                valueParser: ({ oldValue, newValue }) => {
                    if (newValue === oldValue) return oldValue;

                    const newValueAsNumber = Number(newValue);
                    if (isNaN(newValueAsNumber) || newValueAsNumber === Infinity || newValueAsNumber === 0) return oldValue;

                    return newValue;
                },
            },
            {
                headerName: t('ag_columns_headerName.status'),
                field: 'status',
                colId: 'status',
                cellClass: 'font-bold',
                minWidth: 180,
                cellClassRules: {
                    'text-L-warning': ({ value }) => !['OrderDone', 'Canceled', 'DeleteByEngine', 'Error', undefined].includes(value),
                    'text-L-success-200': ({ value }) => value === 'OrderDone',
                    'text-L-error-200': ({ value }) => ['Canceled', 'DeleteByEngine', 'Error'].includes(value),
                },
                valueFormatter: ({ value }) => (value ? t('order_status.' + value) : '-'),
            },
            {
                headerName: t('ag_columns_headerName.actions'),
                field: 'action',
                colId: 'quantity',
                cellRenderer: ({ api, data, rowIndex }: ICellRendererParams) => (
                    <ActionCell
                        data={data}
                        type={[TypeActionEnum.DELETE, TypeActionEnum.EDIT, TypeActionEnum.SEND]}
                        handleEdit={() => {
                            api.startEditingCell({ rowIndex, colKey: 'price' });
                            api.startEditingCell({ rowIndex, colKey: 'quantity' });
                        }}
                        handleDelete={(data) => onRowDelete(data)}
                        handleSend={(data) => onRowSend(data)}
                    />
                ),
            },
        ],
        [],
    );

    return (
        <div className="h-full">
            <AGTable
                rowData={rowData || []}
                columnDefs={Columns}
                stopEditingWhenCellsLoseFocus
                suppressScrollOnNewData={true}
                suppressRowVirtualisation={true}
                suppressColumnVirtualisation={true}
            />
        </div>
    );
};

export default DivideOrderTable;
