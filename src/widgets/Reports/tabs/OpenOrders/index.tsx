import { ICellRendererParams } from 'ag-grid-community';
import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetOrders, useSingleDeleteOrders } from 'src/app/queries/order';
import AGTable, { ColDefType } from 'src/common/components/AGTable';
import WidgetLoading from 'src/common/components/WidgetLoading';
import { ComeFromKeepDataEnum } from 'src/constant/enums';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { setPartDataBuySellAction } from 'src/redux/slices/keepDataBuySell';
import { removeDuplicatesInArray, valueFormatterSide, valueFormatterValidity } from 'src/utils/helpers';
import ipcMain from 'src/common/classes/IpcMain';
import useRamandOMSGateway from 'src/ls/useRamandOMSGateway';
import { getUserData } from 'src/redux/slices/global';
import { useQueryClient } from '@tanstack/react-query';
import { setSelectedSymbol } from 'src/redux/slices/option';
import AGActionCell from 'src/common/components/AGActionCell';
import DetailModal from './modals/DetailModal';

type IOpenOrders = {
};

let timeOut: NodeJS.Timeout | undefined = undefined;

const OpenOrders: FC<IOpenOrders> = () => {
    const appDispatch = useAppDispatch();
    const onOMSMessageHandlerRef = useRef<(message: Record<number, string>) => void>(() => {});
    const { brokerCode } = useAppSelector(getUserData);
    const queryClient = useQueryClient();
    const [detailModalState, setDetailModalState] = useState<{ isOpen: boolean; data?: IOrderGetType }>({ isOpen: false, data: undefined });

    const { data: orders, isFetching: loadingOrders, refetch: refetchOpenOrders } = useGetOrders({ GtOrderStateRequestType: 'OnBoard' });
    const { isSubscribed, subscribeCustomers, unSubscribeCustomers, currentSubscribed } = useRamandOMSGateway();

    useEffect(() => {
        if (orders?.length && !isSubscribed() && brokerCode) {
            const customerISINS = orders.map(({ customerISIN }) => customerISIN);
            subscribeCustomers(removeDuplicatesInArray(customerISINS), brokerCode);
        } else if (!orders?.length && isSubscribed()) {
            unSubscribeCustomers();
        }
    }, [orders]);

    const { mutate: deleteOrder } = useSingleDeleteOrders();

    const refetchOnboard = () => {
        timeOut = setTimeout(() => {
            refetchOpenOrders();
            ipcMain.send('update_customer');
            clearTimeout(timeOut);
        }, 2000);
    };

    onOMSMessageHandlerRef.current = useMemo(
        () => (message: Record<number, string>) => {
            const omsClientKey = message[12];
            const omsOrderStatus = message[22] as OrderStatusType;

            // console.log('omsClientKey', omsClientKey, 'omsOrderStatus', omsOrderStatus);

            queryClient.setQueryData(['orderList', 'OnBoard'], (oldData: IOrderGetType[] | undefined) => {
                if (!!oldData) {
                    const orders = JSON.parse(JSON.stringify(oldData)) as IOrderGetType[];
                    const updatedOrder = orders.find(({ clientKey }) => clientKey === omsClientKey);
                    const index = orders.findIndex(({ clientKey }) => clientKey === omsClientKey);
                    if (index >= 0) {
                        orders[index] = { ...updatedOrder, orderState: omsOrderStatus } as IOrderGetType;
                    }

                    return [...orders];
                }
            });

            if (['DeleteByEngine', 'OnBoard', 'Canceled', 'OnBoardModify', 'PartOfTheOrderDone', 'OrderDone', 'Expired'].includes(omsOrderStatus)) {
                clearTimeout(timeOut);
                refetchOnboard();
            } else if (omsOrderStatus === 'Error') {
                clearTimeout(timeOut);
                refetchOnboard();
                queryClient.invalidateQueries(['orderList', 'Error']);
            }
        },
        [],
    );

    useEffect(() => {
        ipcMain.handle('onOMSMessageReceived', onOMSMessageHandlerRef.current);
    }, []);

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

        // appDispatch(setDataBuySellAction({ data, comeFrom: ComeFromKeepDataEnum.OpenOrder }));
    };

    const handleInfoClick = (data: IOrderGetType | undefined) => setDetailModalState({ isOpen: true, data: data });

    const handleInfoClose = () => setDetailModalState({ isOpen: false, data: undefined });

    const columns = useMemo(
        (): ColDefType<IOrderGetType>[] => [
            {
                headerName: 'مشتری',
                field: 'customerTitle',
                pinned: 'right',
            },
            {
                headerName: 'نام نماد',
                field: 'symbolTitle',
            },
            {
                headerName: 'سمت',
                field: 'orderSide',
                valueFormatter: valueFormatterSide,
            },
            { headerName: 'تعداد', field: 'quantity', type: 'sepratedNumber' },
            { headerName: 'قیمت', field: 'price', type: 'sepratedNumber' },
            { headerName: 'ارزش معامله', field: 'value', type: 'abbreviatedNumber' },
            { headerName: 'تعداد انجام شده', field: 'sumExecuted', type: 'sepratedNumber' },
            { headerName: 'تعداد صف پیش رو', field: 'position', type: 'sepratedNumber' },
            { headerName: 'حجم پیش رو در صف', field: 'valuePosition', type: 'sepratedNumber' },
            { headerName: 'اعتبار درخواست', field: 'validity', valueFormatter: valueFormatterValidity },
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
                pinned: 'left',
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

    const { t } = useTranslation();

    return (
        <div className={'h-full p-3'}>
            <WidgetLoading spining={loadingOrders}>
                <AGTable
                    rowData={orders || []}
                    columnDefs={columns}
                    enableBrowserTooltips={false}
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
