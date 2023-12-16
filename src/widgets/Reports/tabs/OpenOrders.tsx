import { ICellRendererParams } from 'ag-grid-community';
import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { setOrder, useGetOrders, useSingleDeleteOrders } from 'src/app/queries/order';
import AGTable, { ColDefType } from 'src/common/components/AGTable';
import WidgetLoading from 'src/common/components/WidgetLoading';
import { ComeFromKeepDataEnum } from 'src/constant/enums';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { setDataBuySellAction, setPartDataBuySellAction } from 'src/redux/slices/keepDataBuySell';
import { removeDuplicatesInArray, valueFormatterSide, valueFormatterValidity } from 'src/utils/helpers';
import ActionCell, { TypeActionEnum } from '../components/actionCell';
import ipcMain from 'src/common/classes/IpcMain';
import useRamandOMSGateway from 'src/ls/useRamandOMSGateway';
import { getUserData } from 'src/redux/slices/global';
import { useQueryClient } from '@tanstack/react-query';
import { pushEngine } from 'src/ls/pushEngine';

type IOpenOrders = {
    ClickLeftNode: any;
};

const OpenOrders: FC<IOpenOrders> = ({ ClickLeftNode }) => {
    const appDispath = useAppDispatch();

    const clearTimeOut = useRef<NodeJS.Timer | null>(null)

    const onOMSMessageHandlerRef = useRef<(message: Record<number, string>) => void>(() => { });

    const { brokerCode } = useAppSelector(getUserData);

    const queryClient = useQueryClient();

    const { data: orders, isFetching: loadingOrders, refetch: refetchOpenOrders } = useGetOrders({ GtOrderStateRequestType: 'OnBoard' });

    const { isSubscribed, subscribeCustomers, unSubscribeCustomers, currentSubscribed } = useRamandOMSGateway();

    useEffect(() => {
        if (orders?.length && !isSubscribed() && brokerCode) {
            const customerISINS = orders.map(({ customerISIN }) => customerISIN);
            subscribeCustomers(removeDuplicatesInArray(customerISINS), brokerCode);
        }
        else if (!orders?.length && isSubscribed()) {
            unSubscribeCustomers()
        }
    }, [orders]);



    const { mutate: deleteOrder } = useSingleDeleteOrders();

    const RefetchAsync = () => {
        // let timer: NodeJS.Timer;


        let timer = setTimeout(() => {
            // console.log("inside clearTimeOut")
            refetchOpenOrders()
            clearTimeout(timer)
        }, 1500);

        clearTimeOut.current = timer;

        // console.log("inside setTime")
        // queryClient.setQueryData(['orderList', 'OnBoard'], (oldData: IOrderGetType[] | undefined) => {
        //     const filteredData = oldData?.filter(({ clientKey }) => clientKey !== omsClientKey) || [];
        //     // if (!filteredData.length) {
        //     //     unSubscribeCustomers();
        //     // }
        //     return filteredData;
        // });
    };



    onOMSMessageHandlerRef.current = useMemo(
        () => (message: Record<number, string>) => {
            const omsClientKey = message[12];
            const omsOrderStatus = message[22] as OrderStatusType;
            let timer = clearTimeOut.current as NodeJS.Timer

            console.log("omsClientKey", omsClientKey, "omsOrderStatus", omsOrderStatus)

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

            if (omsOrderStatus === 'Canceled' || omsOrderStatus === 'OnBoardModify') {
                clearTimeout(timer)
                RefetchAsync();
            }

        },
        [],
    );

    useEffect(() => {
        ipcMain.handle('onOMSMessageReceived', onOMSMessageHandlerRef.current);
    }, []);

    // useEffect(() => {
    //     console.log("orders", orders)
    // }, [orders])



    const handleDelete = (data: IOrderGetType | undefined) => {
        data && deleteOrder(data?.orderId);
    };

    const handleEdit = (data: IOrderGetType | undefined) => {
        if (!data) return

        appDispath(setPartDataBuySellAction(
            {
                data: {
                    price: data.price,
                    quantity: data.quantity,
                    side: data.orderSide,
                    symbolISIN: data.symbolISIN,
                    validity: data.validity,
                    validityDate: data.validityDate,
                    id: data.orderId
                },
                comeFrom: ComeFromKeepDataEnum.OpenOrder,
                customerIsin: [data.customerISIN]
            }));

        // appDispath(setDataBuySellAction({ data, comeFrom: ComeFromKeepDataEnum.OpenOrder }));
    };

    const columns = useMemo(
        (): ColDefType<IOrderGetType>[] => [
            {
                headerName: 'مشتری',
                field: 'customerTitle',
                pinned: 'right'
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
                field: 'OrderStatus',
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
                    <ActionCell
                        data={row.data}
                        type={[TypeActionEnum.DELETE, TypeActionEnum.EDIT]}
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
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
                <AGTable rowData={orders || []} columnDefs={columns} enableBrowserTooltips={false} />
            </WidgetLoading>
        </div>
    );
};

export default OpenOrders;
