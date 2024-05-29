import { ICellRendererParams } from 'ag-grid-community';
import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetOrders, useSingleDeleteOrders } from 'src/app/queries/order';
import AGTable, { ColDefType } from 'src/common/components/AGTable';
import WidgetLoading from 'src/common/components/WidgetLoading';
import { ComeFromKeepDataEnum } from 'src/constant/enums';
import { useAppDispatch } from 'src/redux/hooks';
import { setPartDataBuySellAction } from 'src/redux/slices/keepDataBuySell';
import { dateTimeFormatter, valueFormatterSide } from 'src/utils/helpers';
import ipcMain from 'src/common/classes/IpcMain';
import { useQueryClient } from '@tanstack/react-query';
import { setSelectedSymbol } from 'src/redux/slices/option';
import AGActionCell from 'src/common/components/AGActionCell';
import DetailModal from './modals/DetailModal';
import AGHeaderSearchInput from 'src/common/components/AGTable/HeaderSearchInput';

type IOpenOrders = {
};

let timeOut: NodeJS.Timeout | undefined = undefined;

const OpenOrders: FC<IOpenOrders> = () => {
    const appDispatch = useAppDispatch();

    const { t } = useTranslation();

    const queryClient = useQueryClient();

    const onOMSMessageHandlerRef = useRef<(message: Record<number, string>) => void>(() => { });

    const [detailModalState, setDetailModalState] = useState<{ isOpen: boolean; data?: IOrderGetType }>({ isOpen: false, data: undefined });

    const { data: orders, isFetching: loadingOrders, refetch: refetchOpenOrders } = useGetOrders({ GtOrderStateRequestType: 'OnBoard' });

    const { mutate: deleteOrder } = useSingleDeleteOrders();

    const handleDelete = (data: IOrderGetType | undefined) => {
        data && deleteOrder(data?.orderId);
    };

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

    const handleInfoClick = (data: IOrderGetType | undefined) => setDetailModalState({ isOpen: true, data: data });

    const handleInfoClose = () => setDetailModalState({ isOpen: false, data: undefined });

    // const refetchOnboard = () => {
    //     timeOut = setTimeout(() => {
    //         refetchOpenOrders();
    //         ipcMain.send('update_customer');
    //         clearTimeout(timeOut);
    //     }, 1000);
    // };

    onOMSMessageHandlerRef.current = useMemo(
        () => (message: Record<number, string>) => {
            const omsClientKey = message[12];
            const omsOrderStatus = message[22] as OrderStatusType;

            queryClient.setQueryData(['orderList', 'OnBoard'], (oldData: IOrderGetType[] | undefined) => {
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

            // if (['DeleteByEngine', 'OnBoard', 'Canceled', 'OnBoardModify', 'PartOfTheOrderDone', 'OrderDone', 'Expired', 'Error'].includes(omsOrderStatus)) {
            //     clearTimeout(timeOut);
            //     refetchOnboard();
            // }
            //  else if (omsOrderStatus === 'Error') {
            //     clearTimeout(timeOut);
            //     refetchOnboard();
            //     queryClient.invalidateQueries(['orderList', 'Error']);
            // }
        },
        [],
    );


    useEffect(() => {
        ipcMain.handle('onOMSMessageReceived', onOMSMessageHandlerRef.current);
    }, []);

    const columns = useMemo(
        (): ColDefType<IOrderGetType>[] => [
            {
                headerName: 'مشتری',
                field: 'customerTitle',
                valueFormatter: (data) => data?.data?.customerTitle + " - " + data?.data?.bourseCode,
                headerComponent: AGHeaderSearchInput,
                minWidth: 200,
            },
            {
                headerName: 'نام نماد',
                field: 'symbolTitle',
                headerComponent: AGHeaderSearchInput,
            },
            {
                headerName: 'تاریخ',
                field: 'requestDate',
                valueFormatter: ({ value }) => dateTimeFormatter(value),
                minWidth: 120,
                cellClass: 'ltr',
            },
            {
                headerName: 'جایگاه (حجمی)',
                field: 'hostOrderNumber',
                type: 'sepratedNumber',
                minWidth: 140,
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
                type: 'abbreviatedNumber',
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
                sortable: false,
                cellRenderer: (row: ICellRendererParams<IOrderGetType>) => (
                    <AGActionCell
                        data={row.data}
                        requiredButtons={['Edit', 'Delete', 'Info']}
                        onInfoClick={handleInfoClick}
                        onEditClick={handleEdit}
                        onDeleteClick={handleDelete}
                    />
                ),
            },
        ],
        [],
    );


    return (
        <div className={'h-full p-3'}>
            <WidgetLoading spining={loadingOrders}>
                <AGTable
                    rowData={orders || []}
                    columnDefs={columns}
                    enableBrowserTooltips={true}
                    animateRows={true}
                    suppressRowVirtualisation={true}
                />
            </WidgetLoading>
            {detailModalState?.isOpen && (
                <DetailModal isOpen={detailModalState.isOpen} onClose={handleInfoClose} modalData={detailModalState?.data} />
            )}
        </div>
    );
};

export default OpenOrders;
