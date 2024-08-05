import { Dispatch, SetStateAction, forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetOfflineRequests, useGetOfflineRequestsExcel, useSendRequest } from 'src/app/queries/order';
import AGTable, { ColDefType } from 'src/common/components/AGTable';
import { seprateNumber, valueFormatterSide } from 'src/utils/helpers';
import { BodyScrollEvent, ICellRendererParams, RowDataUpdatedEvent, RowSelectedEvent } from 'ag-grid-community';
import WidgetLoading from 'src/common/components/WidgetLoading';
import AGActionCell from 'src/common/components/AGActionCell';
import { AgGridReact } from 'ag-grid-react';
import HeaderSelect from '../components/HeaderSelect';
import { useQueryClient } from '@tanstack/react-query';
import HeaderSearch from '../components/HeaderSearch';
import InfoModal from '../components/RequestsModals/InfoModal';
import { useAppDispatch } from 'src/redux/hooks';
import { setSelectedSymbol } from 'src/redux/slices/option';

type TProps = {
    setRequestsTabData: Dispatch<
        SetStateAction<{
            allCount: number;
            selectedCount: number;
        }>
    >;
};

const Requests = forwardRef(({ setRequestsTabData }: TProps, parentRef) => {
    //
    const { t } = useTranslation();

    const gridRef = useRef<AgGridReact>(null);

    const selectedRowsRef = useRef<number[]>([]);

    const appDispatch = useAppDispatch();

    const [params, setParams] = useState<IGetOfflineRequestsParams>({
        CustomerSearchTerm: '',
        SymbolSearchTerm: '',
        InputState: 'All',
        PageNumber: 1,
    });

    const [infoModalParams, setInfoModalParams] = useState<{ data?: Record<string, any>; isOpen: boolean }>({ isOpen: false });

    const payloadApiFactory = (data: IGTOfflineTradesResult[], sendAllRequests: boolean): buySellRequestParams => {

        let ids: number[] = []
        data.forEach(item => {
            ids.push(item.id)
        })

        return {
            ids: ids,
            CustomerSearchTerm: params.CustomerSearchTerm,
            SymbolSearchTerm: params.SymbolSearchTerm,
            InputState: "Registration",
            sendAllRequests: sendAllRequests,
        }
    }

    
    const { mutate: mutateSendRequest } = useSendRequest({
        onSuccess: () => {
            refetch()
        },
    })

    const queryClient = useQueryClient();

    const { refetch: fetchExcel } = useGetOfflineRequestsExcel(params);

    useImperativeHandle(parentRef, () => ({
        sendRequests: () => sendGroupRequest(),
        getOfflineRequestsExcel: () => fetchExcel(),
        sendAllRequests: sendAllRequests,
        refetchOffline: refetch
    }));

    const { data, refetch, fetchNextPage, isFetching } = useGetOfflineRequests(params, { enabled: false });

    const sendSingleRequest = (data: IGTOfflineTradesResult) => {

        const payload = payloadApiFactory([data], false)

        mutateSendRequest(payload)
    };

    const sendGroupRequest = () => {
        const selectedNodes = gridRef.current?.api.getSelectedNodes();

        if (selectedNodes && selectedNodes.length > 0) {
            let selectedItem: IGTOfflineTradesResult[] = []
            selectedNodes.forEach(item => {
                selectedItem.push(item.data)
            })

            const payload = payloadApiFactory(selectedItem, false)

            mutateSendRequest(payload)

        }

    };

    const sendAllRequests = () => {
        const dataALL: IGTOfflineTradesResult[] | undefined = data?.pages.map((i) => i.result).flat()

        if (dataALL) {
            const payload = payloadApiFactory(dataALL, true)
            mutateSendRequest(payload)
        }
    }

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
            {
                headerName: t('ag_columns_headerName.count'),
                field: 'quantity',
                type: 'sepratedNumber',
                valueFormatter: ({ data, value }) => (data?.quantityType === 'None' ? seprateNumber(value) : t('QuantityType.' + value)),
            },
            {
                headerName: t('ag_columns_headerName.price'),
                field: 'price',
                type: 'sepratedNumber',
                valueFormatter: ({ data, value }) => (data?.priceType === 'None' ? seprateNumber(value) : t('PriceType.' + value)),
            },
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
                field: 'id',
                minWidth: 90,
                maxWidth: 90,
                cellRenderer: (row: ICellRendererParams<IGTOfflineTradesResult>) => (
                    <AGActionCell
                        requiredButtons={['Send', 'Info']}
                        data={row.data}
                        onSendClick={(data) => (data ? sendSingleRequest(data) : null)}
                        onInfoClick={() => setInfoModalParams({ data: row?.data, isOpen: true })}
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
                    onRowClicked={({ data }) => data?.symbolISIN && appDispatch(setSelectedSymbol(data?.symbolISIN))}
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
    );
});

Requests.displayName = 'Requests';

export default Requests;
