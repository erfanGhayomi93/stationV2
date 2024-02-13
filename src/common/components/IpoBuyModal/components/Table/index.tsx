import { AgGridReact } from 'ag-grid-react';
import { useMemo, useRef, useState } from 'react';
import AGTable, { ColDefType } from 'src/common/components/AGTable';
import { PlusIcon } from 'src/common/icons';
import HeaderEditors from './components/HeaderEditors';
import { isObjectContainsFalsy, seprateNumber } from 'src/utils/helpers';
import ActionCol from './components/ActionCol';
import AgCustomerSelect from 'src/common/components/AGEditors/AgCustomerSelect';
import AgNumberInput from 'src/common/components/AGEditors/AgNumberInput';
import './style.scss';
import { onErrorNotif } from 'src/handlers/notification';

const Table = () => {
    const [data, setData] = useState<any[]>([]);
    const gridRef = useRef<AgGridReact<any>>(null);
    const height = data.length > 2 ? (data.length - 2) * 37 + 148 : 148;

    const columns = useMemo(
        (): ColDefType<any>[] => [
            {
                headerName: 'ردیف',
                field: 'row',
                minWidth: 50,
                maxWidth: 50,
                pinned: 'right',
                sortable: false,
            },
            {
                headerName: 'مشتری / کدبورسی',
                field: 'customer',
                cellEditor: AgCustomerSelect,
                cellEditorPopup: true,
                valueFormatter: ({ value }) => (value ? value.title + ' - ' + value.bourseCode : ''),
                cellStyle: { overflow: 'visible' },
                flex: 1,
                editable: true,
            },
            {
                headerName: 'قدرت خرید',
                minWidth: 104,
                maxWidth: 104,
                valueFormatter: ({ value }) => (value ? seprateNumber(+value) : value),
            },
            {
                headerName: 'تعداد',
                field: 'quantity',
                minWidth: 78,
                maxWidth: 78,
                headerComponent: HeaderEditors,
                cellEditor: AgNumberInput,
                cellStyle: { overflow: 'visible' },
                headerComponentParams: { setData },
                headerClass: 'p-[1px]',
                valueFormatter: ({ value }) => (value ? seprateNumber(+value) : value),
                editable: true,
            },
            {
                headerName: 'قیمت',
                field: 'price',
                minWidth: 78,
                maxWidth: 78,
                headerComponent: HeaderEditors,
                cellEditor: AgNumberInput,
                cellStyle: { overflow: 'visible' },
                headerComponentParams: { setData },
                headerClass: 'p-[1px]',
                valueFormatter: ({ value }) => (value ? seprateNumber(+value) : value),
                editable: true,
            },
            {
                headerName: 'ارزش معامله',
                field: 'tradeValue',
                minWidth: 111,
                maxWidth: 111,
                headerComponent: HeaderEditors,
                cellEditor: AgNumberInput,
                cellStyle: { overflow: 'visible' },
                headerComponentParams: { setData },
                headerClass: 'p-[1px]',
                valueFormatter: ({ value }) => (value ? seprateNumber(+value) : value),
                editable: true,
            },
            {
                headerName: 'اعتبار',
                minWidth: 75,
                maxWidth: 75,
                valueFormatter: ({ value }) => (value ? seprateNumber(+value) : value),
            },
            {
                headerName: 'عملیات',
                cellRenderer: ActionCol,
                minWidth: 136,
                maxWidth: 136,
                pinned: 'left',
                sortable: false,
            },
        ],
        [],
    );

    const handleAddButton = () => {
        let isThereFalsyValue = false;
        for (let i = 0; i < data.length; i++) {
            if (isObjectContainsFalsy(data[i], ['customerISIN', 'quantity', 'price', 'tradeValue'])) {
                isThereFalsyValue = true;
                break;
            }
        }

        if (!isThereFalsyValue) {
            setData((prev) => [...prev, { row: prev.length + 1 }]);
        } else {
            onErrorNotif({ title: 'لطفا تمامی فیلد ها را کامل نمایید' });
        }
    };

    return (
        <div className="h-full w-full px-3 flex flex-col gap-1">
            <div style={{ height: `${height}px`, maxHeight: '324px' }} className="w-full h-full overflow-visible">
                <AGTable
                    ref={gridRef}
                    rowData={data}
                    columnDefs={columns}
                    navigateToNextHeader={() => null}
                    editType="fullRow"
                    onCellValueChanged={(e) =>
                        setData((prev) => prev.map((x) => (x.row === e.data.row ? { ...e.data, customerISIN: e.data.customer?.customerISIN } : x)))
                    }
                    suppressScrollOnNewData={false}
                    suppressRowTransform
                />
            </div>
            <div className="flex">
                <button className="bg-L-primary-100 p-2 rounded-lg mr-2" onClick={handleAddButton}>
                    <PlusIcon className="text-L-primary-50" />
                </button>
            </div>
        </div>
    );
};

export default Table;
