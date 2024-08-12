import { AgGridReact } from 'ag-grid-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import AGTable, { ColDefType } from 'src/common/components/AGTable';
import HeaderEditors from './components/HeaderEditors';
import { seprateNumber, valueFormatterValidity } from 'src/utils/helpers';
import AgNumberInput from 'src/common/components/AGEditors/AgNumberInput';
import './style.scss';
import { IData } from '../..';
import EditableColumn from './components/EditableColumn';
import { NewValueParams } from 'ag-grid-community';
import { useGroupDeleteOrders, useGroupModifyOrders } from 'src/app/queries/order';
import { onInfoNotif } from 'src/handlers/notification';
import WidgetLoading from 'src/common/components/WidgetLoading';
import { useTranslation } from 'react-i18next';
import { IBuySellGroup } from 'src/redux/slices/BuySellGroupSlice';

interface IProps {
    data: IData[];
    orders?: IData[];
    onChangeCustomerData: (newValue: number, orderId: number | null, field: keyof IData, typeChange: 'All' | 'ONE') => void;
    loadingOrders: boolean,
    handleCloseModal: () => void,
    mode: IBuySellGroup["mode"]
}

const Table = (
    { data, orders, onChangeCustomerData, loadingOrders, handleCloseModal, mode }: IProps
) => {
    //
    const { t } = useTranslation()

    const gridRef = useRef<AgGridReact<IData>>(null);

    const { mutate: mutateGroupUpdateOrder } = useGroupModifyOrders();

    const { mutate: mutateGroupDeleteOrders } = useGroupDeleteOrders();

    const [selectedRow, setSelectedRows] = useState<IData[]>([]);

    const onPriceOrCountChange = ({ data, newValue }: NewValueParams<IData>, field: keyof IData) => {
        onChangeCustomerData(newValue, data.orderId, field, "ONE")
    }

    const handleEditSelected = () => {

        if (!selectedRow || selectedRow?.length === 0) {
            onInfoNotif({ title: "سفارش موردنظر را انتخاب کنید" })
            return
        }

        const payload = selectedRow?.map(item => ({
            id: item.orderId,
            price: item.price,
            quantity: item.quantity,
            validity: item.validity,
            validityDate: item.validityDate ?? null,
        }))

        mode === "EDIT" && mutateGroupUpdateOrder(payload);
    }

    const handleDeleteSelected = () => {

        if (!selectedRow || selectedRow?.length === 0) {
            onInfoNotif({ title: "سفارش موردنظر را انتخاب کنید" })
            return
        }

        const payload = selectedRow?.map(item => {
            return item.orderId
        })

        mode === "DELETE" && mutateGroupDeleteOrders(payload);
    }

    const handleSelectionChange = () => {

        const newSelectedRows = gridRef?.current?.api?.getSelectedRows();

        setSelectedRows((prevSelectedRows) => {
            // Only update state if the selection has changed
            if (JSON.stringify(prevSelectedRows) !== JSON.stringify(newSelectedRows)) {
                return newSelectedRows as IData[];
            }
            return prevSelectedRows;
        });
    };


    useEffect(() => {
        // Add event listener for selection change
        gridRef?.current?.api?.addEventListener('selectionChanged', handleSelectionChange);

        // Cleanup event listener on component unmount
        return () => {
            gridRef?.current?.api?.removeEventListener('selectionChanged', handleSelectionChange);
        };
    }, [gridRef?.current?.api]);



    const columns = useMemo(
        (): ColDefType<IData>[] => [
            {
                type: 'rowSelect',
                enableCellChangeFlash: true,
                // valueGetter: ({ node }) => Number(node?.rowIndex) + 1,
                // pinned: 'right',
                // sortable: false,
            },
            {
                type: 'agTableIndex',
                minWidth: 60,
                maxWidth: 60,
                headerName: 'ردیف'
            },
            {
                headerName: 'مشتری / کدبورسی',
                field: 'customerTitle',
                // cellEditor: AgCustomerSelect,
                // cellRenderer: EditableColumn,
                // cellRendererParams: { tooltipContent: 'مشتری' },
                // cellEditorPopup: true,
                valueFormatter: ({ data }) => (data?.customerTitle ? data?.customerTitle + ' - ' + data?.bourseCode : '-'),
                // cellClass: ({ data }) => (!data?.title ? 'bg-L-error-100 ' : ''),
                cellStyle: { overflow: 'visible' },
                flex: 1,
                // editable: true,
            },
            {
                headerName: 'تعداد',
                field: 'quantity',
                minWidth: 100,
                maxWidth: 100,
                cellRenderer: EditableColumn,
                cellRendererParams: { tooltipContent: 'تعداد' },
                cellEditor: AgNumberInput,
                cellEditorParams: { onChangeCustomerData: (newValue: number, orderId: number) => onChangeCustomerData(newValue, orderId, "quantity", 'ONE') },
                onCellValueChanged: (e) => onPriceOrCountChange(e, 'quantity'),
                cellStyle: { overflow: 'visible', padding: 0 },
                cellClass: ({ value, rowIndex }) => {
                    if (orders && orders.length > rowIndex && orders[rowIndex] && orders[rowIndex]['quantity'] !== undefined) {
                        return orders[rowIndex]['quantity'] !== value ? "bg-L-success-100" : "";
                    }
                    return "";
                },
                headerComponent: HeaderEditors,
                headerComponentParams: { tooltipContent: 'تعداد', onChangeCustomerData: (newValue: number) => onChangeCustomerData(newValue, null, "quantity", 'All') },
                headerClass: 'p-[1px]',
                valueFormatter: ({ value }) => (value ? seprateNumber(+value) : 0),
                editable: true,
            },
            {
                headerName: 'قیمت',
                field: 'price',
                minWidth: 100,
                maxWidth: 100,
                headerComponent: HeaderEditors,
                cellEditor: AgNumberInput,
                cellEditorParams: { onChangeCustomerData: (newValue: number, orderId: number) => onChangeCustomerData(newValue, orderId, "price", 'ONE') },
                cellRenderer: EditableColumn,
                onCellValueChanged: (e) => onPriceOrCountChange(e, 'price'),
                cellStyle: { overflow: 'visible', padding: 0 },
                cellClass: ({ value, rowIndex }) => {
                    if (orders && orders.length > rowIndex && orders[rowIndex] && orders[rowIndex]['price'] !== undefined) {
                        return orders[rowIndex]['price'] !== value ? "bg-L-success-100" : "";
                    }
                    return "";
                },
                headerComponentParams: { tooltipContent: 'قیمت', onChangeCustomerData: (newValue: number) => onChangeCustomerData(newValue, null, "price", 'All') },
                headerClass: 'p-[1px]',
                valueFormatter: ({ value }) => (value ? seprateNumber(+value) : 0),
                cellRendererParams: { tooltipContent: 'قیمت' },
                editable: true
            },
            {
                headerName: 'ارزش معامله',
                field: 'value',
                minWidth: 111,
                maxWidth: 111,
                cellClass: ({ value, rowIndex }) => {
                    if (orders && orders.length > rowIndex && orders[rowIndex] && orders[rowIndex]['value'] !== undefined) {
                        return orders[rowIndex]['value'] !== value ? "bg-L-success-100" : "";
                    }
                    return "";
                },
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
                valueFormatter: valueFormatterValidity,
            },
            {
                headerName: 'وضعیت',
                field: 'orderState',
                minWidth: 160,
                cellClassRules: {
                    'text-L-warning': ({ value }) => !['OrderDone', 'Canceled', 'DeleteByEngine'].includes(value),
                    'text-L-success-200': ({ value }) => value === 'OrderDone',
                    'text-L-error-200': ({ value }) => ['Canceled', 'DeleteByEngine', 'Error'].includes(value),
                },
                valueFormatter: ({ value }) => t('order_status.' + (value ?? 'OnBoard')),
                tooltipValueGetter({ value, data }) {
                    if (value === "Error") return t('order_errors.' + (data?.lastErrorCode ?? 'OnBoard'))
                    return t('order_status.' + (value ?? 'OnBoard'))
                },
            },
            // {
            //     headerName: 'عملیات',
            //     cellRenderer: ActionCol,
            //     // cellEditorParams: { symbolData },
            //     minWidth: 110,
            //     maxWidth: 110,
            //     sortable: false,
            //     cellRendererParams: { handleEdit, handleDelete },
            // },
        ],
        [data, orders],
    );



    return (
        <div className="h-full w-full p-3 pt-0 gap-1 grid grid-rows-one-min ">
            <WidgetLoading spining={loadingOrders}>
                <AGTable
                    ref={gridRef}
                    rowData={data}
                    columnDefs={columns}
                    suppressScrollOnNewData={true}
                    suppressRowVirtualisation={true}
                    rowSelection='multiple'
                />
            </WidgetLoading>

            <div className='flex items-center justify-end gap-x-2 w-full pl-4 my-2'>
                {
                    mode === "EDIT" && (
                        <button
                            className="bg-L-primary-50 dark:bg-D-primary-50 text-L-basic dark:text-D-basic disabled:opacity-50 disabled:cursor-not-allowed py-2 px-3 rounded-md"
                            // disabled={selectedRow?.length === 0}
                            onClick={handleEditSelected}
                            disabled={selectedRow?.length === 0}
                        >
                            ویرایش گروهی
                        </button>
                    )
                }

                {
                    mode === "DELETE" && (
                        <button
                            className="bg-L-basic dark:bg-D-basic border border-L-error-200 dark:border-D-error-200 text-L-error-200 dark:text-D-error-200 disabled:opacity-50 disabled:cursor-not-allowed py-2 px-3 rounded-md"
                            disabled={selectedRow?.length === 0}
                            onClick={handleDeleteSelected}
                        >
                            حذف گروهی
                        </button>
                    )
                }

                <button
                    className='text-L-primary-50 dark:text-D-primary-50 border border-L-primary-50 dark:border-D-primary-50 bg-L-basic dark:bg-D-basic py-2 px-3 rounded-md'
                    onClick={handleCloseModal}
                >
                    انصراف
                </button>
            </div>
        </div>
    );
};

export default Table;