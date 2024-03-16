import { Dispatch, SetStateAction, forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetOfflineRequests, useGetOfflineRequestsExcel } from 'src/app/queries/order';
import AGTable, { ColDefType } from 'src/common/components/AGTable';
import { datePeriodValidator, valueFormatterSide } from 'src/utils/helpers';
import { BodyScrollEvent, ICellRendererParams, RowDataUpdatedEvent, RowSelectedEvent } from 'ag-grid-community';
import WidgetLoading from 'src/common/components/WidgetLoading';
import useSendOrders from 'src/widgets/DivideOrderModal/useSendOrders';
import AGActionCell from 'src/common/components/AGActionCell';
import dayjs from 'dayjs';
import { AgGridReact } from 'ag-grid-react';
import HeaderSelect from '../components/HeaderSelect';
import { useQueryClient } from '@tanstack/react-query';
import HeaderSearch from '../components/HeaderSearch';
import InfoModal from '../components/RequestsModals/InfoModal';

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
    const selectedRowsRef = useRef<number[]>([]);
    const [params, setParams] = useState<IGetOfflineRequestsParams>({
        CustomerSearchTerm: '',
        SymbolSearchTerm: '',
        InputState: 'Registration',
        PageNumber: 1,
    });
    const [infoModalParams, setInfoModalParams] = useState<{ data?: Record<string, any>; isOpen: boolean }>({ isOpen: false });

    const { t } = useTranslation();
    const { sendOrders } = useSendOrders();

    const queryClient = useQueryClient();

    const { data: getExcel, refetch: fetchExcel } = useGetOfflineRequestsExcel(params);

    useImperativeHandle(parentRef, () => ({
        sendRequests: () => sendRequest(),
        getOfflineRequestsExcel: () => fetchExcel(),
        sendAllRequests: () => {
            console.log('send all request');
        },
    }));

    const { data, refetch, fetchNextPage, isFetching } = useGetOfflineRequests(params, { enabled: false });

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

    const sendRequest = () => {
        console.log(gridRef.current?.api.getSelectedNodes());
    };

    useEffect(() => {
        data && setRequestsTabData((prev) => ({ ...prev, allCount: data.pages[0].totalCount }));
    }, [data]);

    useEffect(() => {
        refetch();
        return () => {
            queryClient.removeQueries({ queryKey: ['GetOpenRequests'] });
        };
    }, [params]);

    const columns = useMemo(
        (): ColDefType<IGTOfflineTradesResult>[] => [
            { type: 'rowSelect' },
            {
                headerName: t('ag_columns_headerName.customer'),
                field: 'customerTitle',
                headerComponent: HeaderSearch,
                headerComponentParams: {
                    onChange: (value: string) => setParams((prev) => ({ ...prev, CustomerSearchTerm: value.length > 1 ? value : '' })),
                    value: params.CustomerSearchTerm,
                },
            },
            {
                headerName: t('ag_columns_headerName.symbol'),
                field: 'symbolTitle',
                headerComponent: HeaderSearch,
                headerComponentParams: {
                    onChange: (value: string) => setParams((prev) => ({ ...prev, SymbolSearchTerm: value.length > 1 ? value : '' })),
                    value: params.SymbolSearchTerm,
                },
            },
            {
                headerName: t('ag_columns_headerName.side'),
                field: 'side',
                valueFormatter: valueFormatterSide,
                cellClass: ({ value }) => (value === 'Buy' ? 'text-L-success-200' : value === 'Sell' ? 'text-L-error-200' : ''),
            },
            { headerName: t('ag_columns_headerName.count'), field: 'quantity', type: 'sepratedNumber' },
            { headerName: t('ag_columns_headerName.price'), field: 'price', type: 'sepratedNumber' },
            { headerName: t('ag_columns_headerName.orderValue'), field: 'orderValue', type: 'sepratedNumber' },
            { headerName: t('ag_columns_headerName.validity'), field: 'requestExpiration', type: 'dateWithoutTime', minWidth: 150 },
            {
                headerName: t('ag_columns_headerName.status'),
                headerComponent: HeaderSelect,
                field: 'state',
                valueFormatter: ({ value }) => (value ? t('BuySellRequestState.' + value) : '-'),
                headerComponentParams: {
                    onChange: (value: string) => {
                        setParams((prev) => ({ ...prev, InputState: value as IGetOfflineRequestsParams['InputState'] }));
                    },
                    value: params.InputState,
                },
            },
            {
                headerName: t('ag_columns_headerName.actions'),
                field: 'customTitle',
                minWidth: 90,
                maxWidth: 90,
                cellRenderer: (row: ICellRendererParams<IGTOfflineTradesResult>) => (
                    <AGActionCell
                        requiredButtons={['Send', 'Info']}
                        data={row.data}
                        onSendClick={(data) => (data ? handleSend(data) : null)}
                        onInfoClick={() => setInfoModalParams({ data: row?.data, isOpen: true })}
                        hideSend={!datePeriodValidator(dayjs().format('YYYY-MM-DDThh:mm:ss'), (row?.data as Record<string, any>)?.requestExpiration)}
                    />
                ),
            },
        ],
        [params],
    );

    //Grid Functions:

    const onRowDataUpdated = (e: RowDataUpdatedEvent<IGTOfflineTradesResult>) => {
        e.api?.forEachNode((node) => node?.data && node?.setSelected(selectedRowsRef.current.includes(node?.data.id)));
    };

    const handleRowSelect = ({ api }: RowSelectedEvent<IGTOfflineTradesResult>) => {
        const selectedGridRows = api.getSelectedRows();
        selectedRowsRef.current = selectedGridRows.map((i) => i.id);
        setRequestsTabData((prev) => ({ ...prev, selectedCount: selectedGridRows.length }));
    };

    const handleBodyScroll = (e: BodyScrollEvent) => {
        const currentScrollBottom = e.api.getVerticalPixelRange().bottom;

        //allRows:(numberOfPages * rowCount) * rowHeight
        const limitScroll = (data?.pages.length || 1) * 20 * 36;

        if (currentScrollBottom === limitScroll) {
            fetchNextPage();
        }
    };

    return (
        <>
            <WidgetLoading spining={isFetching}>
                <div className={'grid h-full'}>
                    <AGTable
                        ref={gridRef}
                        rowData={data?.pages.map((i) => i.result).flat()}
                        agGridTheme="alpine"
                        columnDefs={columns}
                        onBodyScrollEnd={handleBodyScroll}
                        rowSelection="multiple"
                        onSelectionChanged={handleRowSelect}
                        onRowDataUpdated={onRowDataUpdated}
                        suppressRowVirtualisation
                    />
                </div>
                {infoModalParams.isOpen ? (
                    <InfoModal
                        data={infoModalParams.data}
                        isOpen={infoModalParams.isOpen}
                        onClose={() => setInfoModalParams({ isOpen: false, data: undefined })}
                    />
                ) : (
                    <></>
                )}
            </WidgetLoading>
        </>
    );
});

Requests.displayName = 'Requests';

export default Requests;
