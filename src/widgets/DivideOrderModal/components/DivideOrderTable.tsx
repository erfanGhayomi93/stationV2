import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import AGTable, { ColDefType } from 'src/common/components/AGTable';
import ActionCell, { TypeActionEnum } from 'src/widgets/Reports/components/actionCell';
import { ICellRendererParams } from 'ag-grid-community';
import { useBuySellState } from 'src/widgets/BuySell/context/BuySellContext';
import { handleValidity } from 'src/utils/helpers';
import { onErrorNotif } from 'src/handlers/notification';

interface ITableProps {
    rowData: DividedOrderRowType[];
    updateData: React.Dispatch<React.SetStateAction<DividedOrderRowType[]>>;
    setQuantityInput: React.Dispatch<React.SetStateAction<number>>;
    sendOneOrder: (ind: number, data: IOrderRequestType[]) => void;
}

const DivideOrderTable = ({ rowData, updateData, setQuantityInput, sendOneOrder }: ITableProps) => {
    //
    const { t } = useTranslation();
    const { symbolISIN, side, validity, percent, validityDate, strategy } = useBuySellState();

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
        const order: IOrderRequestType = {
            id: data.id as string,
            customerISIN: [data.customerISIN],
            CustomerTagId: [],
            GTTraderGroupId: [],
            orderSide: side,
            orderDraftId: undefined,
            orderStrategy: strategy,
            orderType: 'LimitOrder',
            percent: percent || 0,
            price: data.price,
            quantity: data.quantity,
            symbolISIN: symbolISIN,
            validity: handleValidity(validity),
            validityDate: validityDate,
            status: data?.status,
        };

        sendOneOrder(0, [order]);
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
            },
            {
                headerName: t('ag_columns_headerName.status'),
                field: 'status',
                colId: 'status',
                cellClass: 'font-bold',
                cellClassRules: {
                    'text-L-warning': ({value}) => value === 'PENDING',
                    'text-L-success-200': ({value}) => value === 'SUCCEEDED',
                    'text-L-error-200': ({value}) => value === 'Error',
                },
                valueFormatter: ({ value }) =>
                    value === 'PENDING' ? 'درحال پردازش' : value === 'SUCCEEDED' ? 'انجام شد' : value === 'Error' ? 'خطا' : '-',
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
            <AGTable rowData={rowData || []} columnDefs={Columns} stopEditingWhenCellsLoseFocus />
        </div>
    );
};

export default DivideOrderTable;
