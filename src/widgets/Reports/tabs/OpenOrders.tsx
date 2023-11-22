import { ICellRendererParams } from 'ag-grid-community';
import { FC, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
// import { Cell } from 'rsuite-table';
// import 'rsuite-table/dist/css/rsuite-table.css'; // or 'rsuite-table/dist/css/rsuite-table.css'
import { useGetOrders, useSingleDeleteOrders } from 'src/app/queries/order';
import AGTable, { ColDefType } from 'src/common/components/AGTable';
import WidgetLoading from 'src/common/components/WidgetLoading';
import { ComeFromKeepDataEnum } from 'src/constant/enums';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { setDataBuySellAction } from 'src/redux/slices/keepDataBuySell';
import { orderStatusValueFormatter, removeDuplicatesInArray, valueFormatterSide, valueFormatterValidity } from 'src/utils/helpers';
import ActionCell, { TypeActionEnum } from '../components/actionCell';
import ipcMain from 'src/common/classes/IpcMain';
import useRamandOMSGateway from 'src/ls/useRamandOMSGateway';
import { getUserData } from 'src/redux/slices/global';

type IOpenOrders = {
    ClickLeftNode: any;
};

const OpenOrders: FC<IOpenOrders> = ({ ClickLeftNode }) => {
    //
    const { brokerCode } = useAppSelector(getUserData);
    const [ordersList, setOrdersList] = useState<IOrderGetType[]>([]);
    const { isFetching: loadingOrders, refetch: refetchOpenOrders } = useGetOrders(
        { GtOrderStateRequestType: 'OnBoard' },
        {
            onSuccess: (data) => {
                setOrdersList(data.map((order) => ({ ...order, status: 'OnBoard' })));
            },
        },
    );

    const { isSubscribed, subscribeCustomers, unSubscribeCustomers } = useRamandOMSGateway();

    useEffect(() => {

        if (ordersList.length && !isSubscribed() && brokerCode) {
            const customerISINS = ordersList.map(({ customerISIN }) => customerISIN);
            subscribeCustomers(removeDuplicatesInArray(customerISINS), brokerCode);
        }

    }, [ordersList.length]);

    const { mutate: deleteOrder } = useSingleDeleteOrders({
        onSuccess: ({ response }) => {
            if (response === 'Ok') {
                // refetchOpenOrders();
            }
        },
    });

    useEffect(() => {
        ipcMain.handle('onOMSMessageReceived', onOMSMessageHandler);
    });

    const onOMSMessageHandler = (message: Record<number, string>) => {
        //
        console.log('openOrder', message);

        const omsClientKey = message[12];
        const omsOrderStatus = message[22] as OrderStatusType;

        setOrdersList((pre) =>
            pre.map((order) => {
                if (order.clientKey === omsClientKey) {
                    return { ...order, status: omsOrderStatus };
                }

                return order;
            }),
        );

    };

    const appDispath = useAppDispatch();
    const { isFilter } = ClickLeftNode;

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
                    'text-L-warning': ({ value }) => !['OrderDone', 'Canceled', 'DeleteByEngine', 'Error', undefined].includes(value),
                    'text-L-success-200': ({ value }) => value === 'OrderDone',
                    'text-L-error-200': ({ value }) => ['Canceled', 'DeleteByEngine', 'Error'].includes(value),
                },
                valueFormatter: orderStatusValueFormatter,
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
                <AGTable rowData={ordersList} columnDefs={columns} enableBrowserTooltips={false} />
            </WidgetLoading>
        </div>
    );
};

export default OpenOrders;
