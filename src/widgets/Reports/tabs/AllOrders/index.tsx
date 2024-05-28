import { ICellRendererParams } from 'ag-grid-community';
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next';
import { useGetOrders, useSingleDeleteOrders } from 'src/app/queries/order';
import AGActionCell from 'src/common/components/AGActionCell';
import AGTable, { ColDefType } from 'src/common/components/AGTable';
import AGHeaderSearchInput from 'src/common/components/AGTable/HeaderSearchInput';
import WidgetLoading from 'src/common/components/WidgetLoading';
import { ComeFromKeepDataEnum } from 'src/constant/enums';
import { useAppDispatch } from 'src/redux/hooks';
import { setPartDataBuySellAction } from 'src/redux/slices/keepDataBuySell';
import { setSelectedSymbol } from 'src/redux/slices/option';
import { dateTimeFormatter, valueFormatterSide, valueFormatterValidity } from 'src/utils/helpers';

export const AllOrders = () => {

    const { t } = useTranslation()

    const { data: orders, isFetching: loadingOrders, refetch: refetchOpenOrders } = useGetOrders({ GtOrderStateRequestType: 'All' });

    const { mutate: deleteOrder } = useSingleDeleteOrders();

    const appDispatch = useAppDispatch();

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
                field: 'valuePosition',
                type: 'sepratedNumber',
                minWidth: 140,
            },
            {
                headerName: 'نوع',
                field: 'orderSide',
                valueFormatter: (data) => valueFormatterSide(data) + ' - ' + t('BSModal.validity_' + data?.data?.validity),
                cellClassRules: {
                    'bg-L-success-101 dark:bg-D-success-101': ({ value }) => value === 'Buy',
                    'bg-L-error-101 dark:bg-D-error-101': ({ value }) => value === 'Sell',
                }
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
                maxWidth: 80
            },
            {
                headerName: 'حجم باقی مانده',
                field: 'RemainingQuantity',
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
                    />
                ),
            },
            // { headerName: 'تعداد انجام شده', field: 'sumExecuted', type: 'sepratedNumber' },
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
        </div>
    )
}
