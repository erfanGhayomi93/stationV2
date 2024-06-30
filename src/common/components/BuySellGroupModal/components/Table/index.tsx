import { AgGridReact } from 'ag-grid-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import AGTable, { ColDefType } from 'src/common/components/AGTable';
import HeaderEditors from './components/HeaderEditors';
import { seprateNumber, valueFormatterValidity } from 'src/utils/helpers';
import ActionCol from './components/ActionCol';
import AgNumberInput from 'src/common/components/AGEditors/AgNumberInput';
import './style.scss';
import { IData } from '../..';
import EditableColumn from './components/EditableColumn';
import { NewValueParams } from 'ag-grid-community';
import { useGroupDeleteOrders, useGroupModifyOrders, useSingleModifyOrders } from 'src/app/queries/order';
import { onInfoNotif } from 'src/handlers/notification';

interface IProps {
    data: IData[];
    orders?: IData[];
    onChangeCustomerData: (newValue: number, orderId: number | null, field: keyof IData, typeChange: 'All' | 'ONE') => void;
    refetchOrders: () => void
}

const Table = (
    { data, orders, onChangeCustomerData, refetchOrders }: IProps
) => {
    //
    const gridRef = useRef<AgGridReact<IData>>(null);

    // const height = data.length > 2 ? (data.length - 2) * 37 + 148 : 148;

    const { mutate: mutateGroupUpdateOrder } = useGroupModifyOrders({
        onSuccess() {
            refetchOrders()
        },
    });

    const { mutate: mutateGroupDeleteOrders } = useGroupDeleteOrders({
        onSuccess() {
            refetchOrders()
        }
    })

    const [selectedRow, setSelectedRows] = useState<IData[]>([]);

    const onPriceOrCountChange = ({ data, newValue }: NewValueParams<any>, field: keyof IData) => {
        onChangeCustomerData(newValue, data.orderId, field, "ONE")
    }

//     const handleEdit = (data: IData) => {
//         const payload = [{
//             id: data.orderId,
//             price: data.price,
//             quantity: data.quantity,
//             validity: data.validity,
//             validityDate: data.validityDate ?? null,
//         }]
// 
//         mutateGroupUpdateOrder(payload);
//     }

    // 
//     const handleDelete = (data: IData) => {
//         const payload = [data.orderId]
// 
//         mutateGroupDeleteOrders(payload)
//     }

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

        mutateGroupUpdateOrder(payload);
    }


    const handleDeleteSelected = () => {

        if (!selectedRow || selectedRow?.length === 0) {
            onInfoNotif({ title: "سفارش موردنظر را انتخاب کنید" })
            return
        }

        const payload = selectedRow?.map(item => {
            return item.orderId
        })

        mutateGroupDeleteOrders(payload);
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
                // valueGetter: ({ node }) => Number(node?.rowIndex) + 1,
                // pinned: 'right',
                // sortable: false,
            },
            {
                type: 'agTableIndex',
                minWidth: 50,
                maxWidth: 50,
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
                headerComponent: HeaderEditors,
                cellRenderer: EditableColumn,
                onCellValueChanged: (e) => onPriceOrCountChange(e, 'quantity'),
                cellEditor: AgNumberInput,
                cellEditorParams: { onChangeCustomerData: (newValue: number, orderId: number) => onChangeCustomerData(newValue, orderId, "quantity", 'ONE') },
                cellStyle: { overflow: 'visible', padding: 0 },
                cellClass: ({ value, rowIndex }) => ((!!orders?.length && orders[rowIndex]['quantity']) !== value ? "bg-L-success-100" : ""),
                headerComponentParams: { tooltipContent: 'تعداد', onChangeCustomerData: (newValue: number) => onChangeCustomerData(newValue, null, "quantity", 'All') },
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
                cellEditorParams: { onChangeCustomerData: (newValue: number, orderId: number) => onChangeCustomerData(newValue, orderId, "price", 'ONE') },
                cellRenderer: EditableColumn,
                onCellValueChanged: (e) => onPriceOrCountChange(e, 'price'),
                cellStyle: { overflow: 'visible', padding: 0 },
                cellClass: ({ value, rowIndex }) => ((!!orders?.length && orders[rowIndex]['price']) !== value ? "bg-L-success-100" : ""),
                headerComponentParams: { tooltipContent: 'قیمت', onChangeCustomerData: (newValue: number) => onChangeCustomerData(newValue, null, "price", 'All') },
                headerClass: 'p-[1px]',
                valueFormatter: ({ value }) => (value ? seprateNumber(+value) : 0),
                cellRendererParams: { tooltipContent: 'قیمت' },
                editable: true,
            },
            {
                headerName: 'ارزش معامله',
                field: 'value',
                minWidth: 111,
                maxWidth: 111,
                cellClass: ({ value, rowIndex }) => ((!!orders?.length && orders[rowIndex]['value']) !== value ? "bg-L-success-100" : ""),
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

            <AGTable
                ref={gridRef}
                rowData={data}
                columnDefs={columns}
                // navigateToNextHeader={() => null}
                // onCellValueChanged={(e) => {
                //     dataSetter((prev: IData[]) =>
                //         prev.map((x) => (x.orderId === e.data.orderId ? { ...e.data, ...e.data.customer, customer: undefined } : x)),
                //     );
                // }}
                suppressScrollOnNewData={true}
                suppressRowVirtualisation={true}
                rowSelection='multiple'
            />


            <div className='flex items-center justify-end gap-x-2 w-full pl-4 my-2'>
                <button
                    className="bg-L-primary-50 dark:bg-D-primary-50 text-L-basic dark:text-D-basic disabled:opacity-50 disabled:cursor-not-allowed py-2 px-3 rounded-md"
                    // disabled={selectedRow?.length === 0}
                    onClick={handleEditSelected}
                >
                    ویرایش گروهی
                </button>

                <button
                    className="bg-L-basic dark:bg-D-basic border border-L-error-200 dark:border-D-error-200 text-L-error-200 dark:text-D-error-200 disabled:opacity-50 disabled:cursor-not-allowed py-2 px-3 rounded-md"
                    // disabled={selectedRow?.length === 0}
                    onClick={handleDeleteSelected}
                >
                    حذف گروهی
                </button>
            </div>
        </div>
    );
};

export default Table;
