import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import AGTable, { ColDefType } from 'src/common/components/AGTable';
import ActionCell, { TypeActionEnum } from 'src/widgets/Reports/components/actionCell';
import { ICellRendererParams } from 'ag-grid-community';

interface ITableProps {
    rowData: DividedOrderRowType[];
    updateData: React.Dispatch<React.SetStateAction<DividedOrderRowType[]>>;
    setQuantityInput: React.Dispatch<React.SetStateAction<number>>;
}

let onEditingCellStarted: any;

const DivideOrderTable = ({ rowData, updateData, setQuantityInput }: ITableProps) => {
    //
    const { t } = useTranslation();

    const onRowValueChange = (value: number, name: 'quantity' | 'price', rowId: string | number) => {
        let totalQuantity = 0;

        updateData((pre) =>
            pre.map((item) => {
                if (item.id === rowId) item[name] = Number(value);

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
        console.log(data);
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
                valueFormatter: ({ value }) => (value ? value : '-'),
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
