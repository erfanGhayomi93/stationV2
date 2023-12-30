import { useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { setOrder, useDeleteRequest, useGetOfflineRequests } from 'src/app/queries/order';
// import { useGetOrders } from 'src/app/queries/order';
import AGTable, { ColDefType } from 'src/common/components/AGTable';
import AGHeaderSearchInput from 'src/common/components/AGTable/HeaderSearchInput';
import { datePeriodValidator, valueFormatterSide } from 'src/utils/helpers';
import ActionCell, { TypeActionEnum } from '../components/actionCell';
import { ICellRendererParams } from 'ag-grid-community';
import WidgetLoading from 'src/common/components/WidgetLoading';
import { onSuccessNotif } from 'src/handlers/notification';
// import { useMutation } from '@tanstack/react-query';
import ConfirmModal from 'src/common/components/ConfirmModal/ConfirmModal';
import useSendOrders from 'src/widgets/DivideOrderModal/useSendOrders';
import AGActionCell from 'src/common/components/AGActionCell';
import dayjs from 'dayjs';

type RequestData = {
    customerTitle: string;
    symbolISIN: string;
    orderSide: string;
    quantity: number;
    sumExecuted: number;
    price: number;
    valuePosition: number;
    // creditRequest: Boolean;
};

const Requests = () => {
    //
    const { t } = useTranslation();
    const { data, isLoading, refetch } = useGetOfflineRequests(
        { PageNumber: 1, PageSize: 100 },
        {
            select: (data) => {
                const { result, ...rest } = data;
                const filteredData = result.filter(({ state }) => ['Registration', 'Accepted', 'Execution'].includes(state));

                return { ...rest, result: filteredData };
            },
        },
    );

    const [isOpen, setIsOpen] = useState(false);
    const selectedDataForDelete = useRef<Record<string, any> | undefined>();

    const { sendOrders } = useSendOrders();


    const { mutate: deleteRequest, isLoading: deleteLoading } = useDeleteRequest({
        onSuccess: (result) => {
            if (result) {
                onSuccessNotif({ title: 'درخواست با موفقیت حذف گردید.' });
                refetch();
            }
        },
    });

    // const { mutate: mutateSend } = useMutation(setOrder, {
    //     onSuccess: () => {
    //         onSuccessNotif();
    //     },
    //     onError: () => {
    //         onErrorNotif();
    //     },
    // });

    const handleSend = (data: Record<string, any>) => {
        console.log(data);
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

    const handleDelete = (data: IGTOfflineTradesResult | undefined) => {
        selectedDataForDelete.current = data;
        setIsOpen(true);
    };

    const columns = useMemo(
        (): ColDefType<IGTOfflineTradesResult>[] => [
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
                        onSendClick={(data) => data && handleSend(data)}
                        onDeleteClick={handleDelete}
                        hideSend={!datePeriodValidator(dayjs().format('YYYY-MM-DDThh:mm:ss'), (row?.data as Record<string, any>)?.requestExpiration)}
                    />
                ),
            },
        ],
        [],
    );

    return (
        <>
            <WidgetLoading spining={isLoading || deleteLoading}>
                <div className={'grid h-full p-3'}>
                    <AGTable agGridTheme="alpine" rowData={data?.result || []} columnDefs={columns} />
                </div>
            </WidgetLoading>

            {isOpen && (
                <ConfirmModal
                    title={'حذف درخواست'}
                    description={'آیا از حذف درخواست اطمینان دارید؟'}
                    onConfirm={() => {
                        selectedDataForDelete.current?.id && deleteRequest(selectedDataForDelete.current?.id);
                        setIsOpen(false);
                    }}
                    onCancel={() => setIsOpen(false)}
                    confirmBtnLabel="تایید"
                />
            )}
        </>
    );
};

export default Requests;
