import { ICellRendererParams } from 'ag-grid-community';
import { useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useGetOrders, useSingleDeleteOrders } from 'src/app/queries/order';
import { queryClient } from 'src/app/queryClient';
import ipcMain from 'src/common/classes/IpcMain';
import AGActionCell from 'src/common/components/AGActionCell';
import AGTable, { ColDefType } from 'src/common/components/AGTable';
import AGHeaderSearchInput from 'src/common/components/AGTable/HeaderSearchInput';
import WidgetLoading from 'src/common/components/WidgetLoading';
import { ComeFromKeepDataEnum } from 'src/constant/enums';
import { useAppDispatch } from 'src/redux/hooks';
import { setPartDataBuySellAction } from 'src/redux/slices/keepDataBuySell';
import { setSelectedSymbol } from 'src/redux/slices/option';
import { dateTimeFormatter, valueFormatterSide } from 'src/utils/helpers';
import DetailModal from '../OpenOrders/modals/DetailModal';
import { AgGridReact } from 'ag-grid-react';

export const AllOrders = () => {

    const { t } = useTranslation()

    const { data: orders, isFetching: loadingOrders } = useGetOrders({ GtOrderStateRequestType: 'All' });

    const gridRef = useRef<AgGridReact>(null);

    const [detailModalState, setDetailModalState] = useState<{ isOpen: boolean; data?: IOrderGetType }>({ isOpen: false, data: undefined });

    const onOMSMessageHandlerRef = useRef<(message: Record<number, string>) => void>(() => { });

    const { mutate: deleteOrder } = useSingleDeleteOrders();

    const appDispatch = useAppDispatch();

    const handleInfoClose = () => setDetailModalState({ isOpen: false, data: undefined });

    const handleInfoClick = (data: IOrderGetType | undefined) => setDetailModalState({ isOpen: true, data: data });

    const handleEdit = (data: IOrderGetType | undefined) => {
        if (!data) return;

        appDispatch(setSelectedSymbol(data.symbolISIN));

        appDispatch(
            setPartDataBuySellAction({
                data: {
                    price: data.price,
                    quantity: data.quantity,
                    side: data.orderSide,
                    symbolISIN: data.symbolISIN,
                    validity: data.validity,
                    validityDate: data.validityDate,
                    id: data.orderId,
                },
                comeFrom: ComeFromKeepDataEnum.OpenOrder,
                customerIsin: [data.customerISIN],
            }),
        );
    };

    const handleDelete = (data: IOrderGetType | undefined) => {
        data && deleteOrder(data?.orderId);
    };

    const columns = useMemo(
        (): ColDefType<IOrderGetType>[] => [
            {
                type: 'rowSelect'
            },
            {
                headerName: 'مشتری',
                field: 'customerTitle',
                valueFormatter: (data) => data?.data?.customerTitle + " - " + data?.data?.bourseCode,
                headerComponent: AGHeaderSearchInput,
                minWidth: 200,
            },
            {
                headerName: 'نماد',
                field: 'symbolTitle',
                headerComponent: AGHeaderSearchInput,
            },
            {
                headerName: 'تاریخ',
                field: 'requestDate',
                valueFormatter: ({ value }) => dateTimeFormatter(value),
                minWidth: 140,
                cellClass: 'ltr',
            },
            {
                headerName: 'جایگاه (حجمی)',
                field: 'hostOrderNumber',
                type: 'sepratedNumber',
                minWidth: 80,
                valueFormatter: ({ value }) => value ? value : '-'
            },
            {
                headerName: 'نوع',
                field: 'orderSide',
                valueFormatter: (data) => valueFormatterSide(data) + ' - ' + t('BSModal.validity_' + data?.data?.validity),
                cellClassRules: {
                    'bg-L-success-101 dark:bg-D-success-101': ({ value }) => value === 'Buy',
                    'bg-L-error-101 dark:bg-D-error-101': ({ value }) => value === 'Sell',
                },
                minWidth: 120
            },
            {
                headerName: 'تعداد',
                field: 'quantity',
                type: 'sepratedNumber',
                maxWidth: 80
            },
            {
                headerName: 'قیمت',
                field: 'price',
                type: 'sepratedNumber',
                maxWidth: 80
            },
            {
                headerName: 'ارزش معامله',
                field: 'value',
                type: 'sepratedNumber',
                maxWidth: 100
            },
            {
                headerName: 'حجم باقی مانده',
                field: 'remainingQuantity',
                type: 'sepratedNumber'
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
            },
            {
                headerName: 'عملیات',
                field: 'customTitle',
                maxWidth: 100,
                sortable: false,
                cellRenderer: (row: ICellRendererParams<IOrderGetType>) => (
                    <AGActionCell
                        data={row.data}
                        requiredButtons={['Edit', 'Delete', 'Info']}
                        onEditClick={handleEdit}
                        onDeleteClick={handleDelete}
                        onInfoClick={handleInfoClick}
                        disableEdit={['OrderDone', 'Canceled', 'DeleteByEngine', 'Error', 'Expired', 'InOMSQueue', 'OnSending', 'OnCanceling'].includes(row?.data ? row?.data?.orderState : '')}
                        disableDelete={['OrderDone', 'Canceled', 'DeleteByEngine', 'Error', 'Expired', 'InOMSQueue', 'OnSending', 'OnCanceling'].includes(row?.data ? row?.data?.orderState : '')}
                    />
                ),
            },
            // { headerName: 'تعداد انجام شده', field: 'sumExecuted', type: 'sepratedNumber' },
        ],
        [],
    );

    onOMSMessageHandlerRef.current = useMemo(
        () => (message: Record<number, string>) => {
            const omsClientKey = message[12];
            const omsOrderStatus = message[22] as OrderStatusType;

            queryClient.setQueryData(['orderList', 'All'], (oldData: IOrderGetType[] | undefined) => {
                if (oldData) {
                    const orders = JSON.parse(JSON.stringify(oldData)) as IOrderGetType[];
                    const updatedOrder = orders.find(({ clientKey }) => clientKey === omsClientKey);
                    const index = orders.findIndex(({ clientKey }) => clientKey === omsClientKey);
                    if (index >= 0) {
                        orders[index] = { ...updatedOrder, orderState: omsOrderStatus } as IOrderGetType;
                    }

                    return [...orders];
                }
            });
        },
        [],
    );


    useEffect(() => {
        ipcMain.handle('onOMSMessageReceived', onOMSMessageHandlerRef.current);
    }, []);


    return (
        <div className={'h-full p-3'}>
            <WidgetLoading spining={loadingOrders}>
                <AGTable
                    rowData={orders || []}
                    columnDefs={columns}
                    enableBrowserTooltips={true}
                    animateRows={true}
                    suppressRowVirtualisation={true}
                    rowSelection='multiple'
                    ref={gridRef}
                />
            </WidgetLoading>

            {
                detailModalState?.isOpen && (
                    <DetailModal
                        isOpen={detailModalState.isOpen}
                        onClose={handleInfoClose}
                        modalData={detailModalState?.data}
                    />
                )
            }
        </div>
    )
}
