import { ICellRendererParams } from 'ag-grid-community';
import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { setOrder, useGetOrders, useSingleDeleteOrders } from 'src/app/queries/order';
import AGTable, { ColDefType } from 'src/common/components/AGTable';
import WidgetLoading from 'src/common/components/WidgetLoading';
import { ComeFromKeepDataEnum } from 'src/constant/enums';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { setDataBuySellAction } from 'src/redux/slices/keepDataBuySell';
import { removeDuplicatesInArray, valueFormatterSide, valueFormatterValidity } from 'src/utils/helpers';
import ActionCell, { TypeActionEnum } from '../components/actionCell';
import ipcMain from 'src/common/classes/IpcMain';
import useRamandOMSGateway from 'src/ls/useRamandOMSGateway';
import { getUserData } from 'src/redux/slices/global';
import { useQueryClient } from '@tanstack/react-query';

type IOpenOrders = {
    ClickLeftNode: any;
};

const OpenOrders: FC<IOpenOrders> = ({ ClickLeftNode }) => {
    //

    const onOMSMessageHandlerRef = useRef<(message: Record<number, string>) => void>(() => {});

    const { brokerCode } = useAppSelector(getUserData);

    const queryClient = useQueryClient();

    const { data: orders, isFetching: loadingOrders, refetch: refetchOpenOrders } = useGetOrders({ GtOrderStateRequestType: 'OnBoard' });

    const { isSubscribed, subscribeCustomers, unSubscribeCustomers, currentSubscribed } = useRamandOMSGateway();

    useEffect(() => {
        if (orders?.length && !isSubscribed() && brokerCode) {
            const customerISINS = orders.map(({ customerISIN }) => customerISIN);
            subscribeCustomers(removeDuplicatesInArray(customerISINS), brokerCode);
        }
    }, [orders]);

    const { mutate: deleteOrder } = useSingleDeleteOrders();

    const filterTable = (omsClientKey: string) => {
        let timer: NodeJS.Timer;

        timer = setTimeout(() => {
            queryClient.setQueryData(['orderList', 'OnBoard'], (oldData: IOrderGetType[] | undefined) => {
                const filteredData = oldData?.filter(({ clientKey }) => clientKey !== omsClientKey) || [];
                if (!filteredData.length) {
                    unSubscribeCustomers();
                }
                return filteredData;
            });
        }, 1500);
    };

    onOMSMessageHandlerRef.current = useMemo(
        () => (message: Record<number, string>) => {
            const omsClientKey = message[12];
            const omsOrderStatus = message[22] as OrderStatusType;

            queryClient.setQueryData(['orderList', 'OnBoard'], (oldData: IOrderGetType[] | undefined) => {
                if (!!oldData) {
                    const orders = JSON.parse(JSON.stringify(oldData)) as IOrderGetType[];
                    const updatedOrder = orders.find(({ clientKey }) => clientKey === omsClientKey);
                    const index = orders.findIndex(({ clientKey }) => clientKey === omsClientKey);

                    orders[index] = { ...updatedOrder, status: omsOrderStatus } as IOrderGetType;

                    return [...orders];
                }
            });

            if (omsOrderStatus === 'Canceled') {
                filterTable(omsClientKey);
            }
        },
        [],
    );

    useEffect(() => {
        ipcMain.handle('onOMSMessageReceived', onOMSMessageHandlerRef.current);
    }, []);

    const appDispath = useAppDispatch();

    const handleDelete = (data: IOrderGetType | undefined) => {
        data && deleteOrder(data?.orderId);
    };

    const handleEdit = (data: IOrderGetType | undefined) => {
        appDispath(setDataBuySellAction({ data, comeFrom: ComeFromKeepDataEnum.OpenOrder }));
    };

    const columns = useMemo(
        (): ColDefType<IOrderGetType>[] => [
            {
                headerName: 'مشتری یا گروه مشتری',
                field: 'customerTitle',
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
                field: 'status',
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
