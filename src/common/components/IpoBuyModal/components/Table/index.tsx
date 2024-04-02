import { AgGridReact } from 'ag-grid-react';
import { Dispatch, SetStateAction, useMemo, useRef } from 'react';
import AGTable, { ColDefType } from 'src/common/components/AGTable';
import { PlusIcon } from 'src/common/icons';
import HeaderEditors from './components/HeaderEditors';
import { getUniqId, isObjectContainsFalsy, seprateNumber } from 'src/utils/helpers';
import ActionCol from './components/ActionCol';
import AgCustomerSelect from 'src/common/components/AGEditors/AgCustomerSelect';
import AgNumberInput from 'src/common/components/AGEditors/AgNumberInput';
import './style.scss';
import { onErrorNotif } from 'src/handlers/notification';
import { IData, initialState } from '../..';
import EditableColumn from './components/EditableColumn';
import { NewValueParams } from 'ag-grid-community';
import Tippy from '@tippyjs/react';

interface IProps {
    data: IData[];
    dataSetter: Dispatch<SetStateAction<IData[]>>;
    symbolData: TIpoInfo;
    onChangeCustomerData: (newValue: number, uniqId: string | null, field: keyof IData, typeChange: 'All' | 'ONE') => void
}

const Table = ({ data, dataSetter, symbolData, onChangeCustomerData }: IProps) => {
    const gridRef = useRef<AgGridReact<any>>(null);
    const height = data.length > 2 ? (data.length - 2) * 37 + 148 : 148;

    const onPriceOrCountChange = ({ data, node, newValue }: NewValueParams<any>, field: keyof IData) => {
        onChangeCustomerData(newValue, data.uniqId, field, "ONE")
    }

    const columns = useMemo(
        (): ColDefType<any>[] => [
            {
                headerName: 'ردیف',
                field: 'rowNumber',
                valueGetter: ({ node }) => Number(node?.rowIndex) + 1,
                minWidth: 50,
                maxWidth: 50,
                pinned: 'right',
                sortable: false,
            },
            {
                headerName: 'مشتری / کدبورسی',
                field: 'customer',
                cellEditor: AgCustomerSelect,
                cellRenderer: EditableColumn,
                cellRendererParams: { tooltipContent: 'مشتری' },
                cellEditorPopup: true,
                valueFormatter: ({ data }) => (data?.title ? data?.title + ' - ' + data?.bourseCode : '-'),
                cellClass: ({ data }) => (!data?.title ? 'bg-L-error-100 ' : ''),
                cellStyle: { overflow: 'visible' },
                flex: 1,
                editable: true,
            },
            {
                headerName: 'قدرت خرید',
                field: 'purchasePower',
                minWidth: 104,
                maxWidth: 104,
                cellClass: ({ value, data }) =>
                    value == null ? '' : `${+value < +data?.tradeValue ? 'bg-L-error-100 text-L-error-300 font-medium' : ''}`,
                valueFormatter: ({ value }) => (value ? seprateNumber(+value) : value),
            },
            {
                headerName: 'تعداد',
                field: 'count',
                minWidth: 100,
                maxWidth: 100,
                headerComponent: HeaderEditors,
                cellRenderer: EditableColumn,
                // onCellValueChanged: (e) => onPriceOrCountChange(e, 'count'),
                cellEditor: AgNumberInput,
                cellEditorParams: { onChangeCustomerData: (newValue: number, uniqId: string) => onChangeCustomerData(newValue, uniqId, "count", 'ONE') },
                cellStyle: { overflow: 'visible', padding: 0 },
                cellClass: ({ value }) => (!value ? 'bg-L-error-100 ' : ''),
                headerComponentParams: { tooltipContent: 'تعداد', onChangeCustomerData: (newValue: number) => onChangeCustomerData(newValue, null, "count", 'All') },
                headerClass: 'p-[1px]',
                valueFormatter: ({ value }) => (value ? seprateNumber(+value) : 0),
                cellRendererParams: { tooltipContent: 'تعداد' },
                editable: true,
            },
            {
                headerName: 'قیمت',
                field: 'price',
                minWidth: 100,
                maxWidth: 100,
                headerComponent: HeaderEditors,
                cellEditor: AgNumberInput,
                cellEditorParams: { onChangeCustomerData: (newValue: number, uniqId: string) => onChangeCustomerData(newValue, uniqId, "price", 'ONE') },
                cellRenderer: EditableColumn,
                onCellValueChanged: (e) => onPriceOrCountChange(e, 'price'),
                cellStyle: { overflow: 'visible', padding: 0 },
                cellClass: ({ value }) => (!value ? 'bg-L-error-100 ' : ''),
                headerComponentParams: { tooltipContent: 'قیمت', onChangeCustomerData: (newValue: number) => onChangeCustomerData(newValue, null, "price", 'All') },
                headerClass: 'p-[1px]',
                valueFormatter: ({ value }) => (value ? seprateNumber(+value) : 0),
                cellRendererParams: { tooltipContent: 'قیمت' },
                editable: true,
            },
            {
                headerName: 'ارزش معامله',
                field: 'tradeValue',
                minWidth: 111,
                maxWidth: 111,
                // headerComponent: HeaderEditors,
                onCellValueChanged: ({ node, newValue, data }) => {
                    if (+newValue !== +data?.count * +data?.price && data?.count && data?.price) {
                        node?.setDataValue('count', 0);
                        node?.setDataValue('price', 0);
                    }
                },
                cellEditor: AgNumberInput,
                cellClass: ({ value }) => (!value ? 'bg-L-error-100 ' : ''),
                // cellRenderer: EditableColumn,
                cellEditorParams: { onChangeCustomerData: (newValue: number, uniqId: string) => onChangeCustomerData(newValue, uniqId, "tradeValue", 'ONE') },
                cellStyle: { overflow: 'visible', padding: 0 },
                headerComponentParams: { tooltipContent: 'ارزش معامله', onChangeCustomerData: (newValue: number) => onChangeCustomerData(newValue, null, "tradeValue", 'All') },
                headerClass: 'p-[1px]',
                valueFormatter: ({ value }) => (value ? seprateNumber(+value) : 0),
                cellRendererParams: { tooltipContent: 'ارزش معامله' },
                editable: false,
            },
            {
                headerName: 'اعتبار',
                minWidth: 100,
                maxWidth: 100,
                cellClass: ({ }) => 'text-L-gray-500',
                valueFormatter: () => 'روز',
            },
            {
                headerName: 'عملیات',
                cellRenderer: ActionCol,
                // cellEditorParams: { symbolData },
                minWidth: 110,
                maxWidth: 110,
                pinned: 'left',
                sortable: false,
                cellRendererParams: { dataSetter, symbolData },
            },
        ],
        [data],
    );

    const handleAddButton = () => {
        let isThereFalsyValue = false;

        for (const item of data) {
            if (isObjectContainsFalsy(item, ['title'])) {
                isThereFalsyValue = true;
                break;
            }
        }

        if (!isThereFalsyValue) {
            dataSetter((prev) => [...prev, { ...initialState, uniqId: getUniqId() }]);
            setTimeout(() => {
                const rowIndex = data?.length;
                gridRef.current?.api?.startEditingCell({
                    colKey: 'customer',
                    rowIndex,
                });
            }, 50);
        } else {
            onErrorNotif({ title: 'لطفا مشتری را انتخاب کنید' });
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
                    onCellValueChanged={(e) => {
                        dataSetter((prev: IData[]) =>
                            prev.map((x) => (x.uniqId === e.data.uniqId ? { ...e.data, ...e.data.customer, customer: undefined } : x)),
                        );
                    }}
                    suppressScrollOnNewData={true}
                    suppressRowTransform
                />
            </div>
            <div className="flex">
                <Tippy content={'افزودن مشتری جدید'}>
                    <button className="bg-L-primary-100 p-2 rounded-lg mr-2" onClick={handleAddButton}>
                        <PlusIcon className="text-L-primary-50" />
                    </button>
                </Tippy>
            </div>
        </div>
    );
};

export default Table;
