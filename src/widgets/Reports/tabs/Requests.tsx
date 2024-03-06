import { Dispatch, SetStateAction, forwardRef, useEffect, useImperativeHandle, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useDeleteRequest, useGetOfflineRequests } from 'src/app/queries/order';
import AGTable, { ColDefType } from 'src/common/components/AGTable';
import AGHeaderSearchInput from 'src/common/components/AGTable/HeaderSearchInput';
import { datePeriodValidator, valueFormatterSide } from 'src/utils/helpers';
import { ICellRendererParams, RowSelectedEvent } from 'ag-grid-community';
import WidgetLoading from 'src/common/components/WidgetLoading';
import { onErrorNotif, onSuccessNotif } from 'src/handlers/notification';
import useSendOrders from 'src/widgets/DivideOrderModal/useSendOrders';
import AGActionCell from 'src/common/components/AGActionCell';
import dayjs from 'dayjs';
import { AgGridReact } from 'ag-grid-react';

type TProps = {
    setRequestsTabData: Dispatch<
        SetStateAction<{
            allCount: number;
            selectedCount: number;
        }>
    >;
};

const Requests = forwardRef(({ setRequestsTabData }: TProps, parentRef) => {
    const gridRef = useRef<AgGridReact>(null);

    const { t } = useTranslation();
    const { sendOrders } = useSendOrders();

    useImperativeHandle(parentRef, () => ({ sendRequests: () => sendAll() }));

    const { data, isLoading, refetch } = useGetOfflineRequests(
        { PageNumber: 1, PageSize: 100 },
        {
            select: (data) => {
                const filteredData = data?.result.filter(({ state }) => ['Registration', 'Accepted', 'Execution'].includes(state));
                return { ...data, result: filteredData };
            },
        },
    );

    useEffect(() => {
        data && setRequestsTabData((prev) => ({ ...prev, allCount: data.result.length }));
    }, [data]);

    const { mutate: deleteRequest, isLoading: deleteLoading } = useDeleteRequest({
        onSuccess: (result) => {
            if (result) {
                onSuccessNotif({ title: 'درخواست با موفقیت حذف گردید.' });
                refetch();
            }
        },
    });

    const handleDelete = (id?: number) => (id ? deleteRequest(id) : onErrorNotif());

    const handleSend = (data: Record<string, any>) => {
        const order: IOrderRequestType = {
            CustomerTagId: [],
            GTTraderGroupId: [],
            orderSide: data?.side,
            orderDraftId: undefined,
            orderStrategy: 'Normal',
            orderType: 'LimitOrder',
            percent: 0,
            symbolISIN: data?.symbolISIN,
            validity: 'GoodTillDate',
            validityDate: data?.requestExpiration,
            price: data?.price,
            quantity: data?.volume,
            customerISIN: [data?.customerISIN],
            customerTitle: [data?.customerTitle],
            id: data?.id,
        };

        sendOrders([order]);
    };

    const sendAll = () => {
        console.log(gridRef.current?.api.getSelectedNodes());
    };

    const columns = useMemo(
        (): ColDefType<IGTOfflineTradesResult>[] => [
            { type: 'rowSelect' },
            { headerName: t('ag_columns_headerName.customer'), field: 'customerTitle', headerComponent: AGHeaderSearchInput },
            { headerName: t('ag_columns_headerName.symbol'), field: 'symbolTitle', headerComponent: AGHeaderSearchInput },
            { headerName: t('ag_columns_headerName.side'), field: 'side', valueFormatter: valueFormatterSide },
            { headerName: t('ag_columns_headerName.count'), field: 'volume', type: 'sepratedNumber' },
            {
                headerName: t('ag_columns_headerName.requestType'),
                field: 'requestType',
                valueFormatter: ({ value }) => (value ? t('BuySellRequestType.' + value) : '-'),
            },
            { headerName: t('ag_columns_headerName.fund'), field: 'fund', type: 'sepratedNumber' },
            { headerName: t('ag_columns_headerName.price'), field: 'price' },
            { headerName: t('ag_columns_headerName.validity'), field: 'requestExpiration', type: 'date' },
            {
                headerName: t('ag_columns_headerName.actions'),
                field: 'customTitle',
                cellRenderer: (row: ICellRendererParams<IGTOfflineTradesResult>) => (
                    <AGActionCell
                        requiredButtons={['Send', 'Delete']}
                        data={row.data}
                        onSendClick={(data) => (data ? handleSend(data) : null)}
                        onDeleteClick={() => handleDelete(row.data?.id)}
                        hideSend={!datePeriodValidator(dayjs().format('YYYY-MM-DDThh:mm:ss'), (row?.data as Record<string, any>)?.requestExpiration)}
                    />
                ),
            },
        ],
        [],
    );

    const handleRowSelect = ({ api }: RowSelectedEvent<IGTOfflineTradesResult>) => {
        setRequestsTabData((prev) => ({ ...prev, selectedCount: api.getSelectedRows().length }));
    };

    return (
        <>
            <WidgetLoading spining={isLoading || deleteLoading}>
                <div className={'grid h-full p-3'}>
                    <AGTable
                        ref={gridRef}
                        agGridTheme="alpine"
                        rowData={data?.result || []}
                        columnDefs={columns}
                        rowSelection="multiple"
                        onRowSelected={handleRowSelect}
                    />
                </div>
            </WidgetLoading>
        </>
    );
});

Requests.displayName = 'Requests';

export default Requests;
