import { ICellRendererParams } from 'ag-grid-community';
import { FC, useMemo } from 'react';
import { useDeleteDraft, useGetDraft } from 'src/app/queries/draft';
import AGTable, { ColDefType } from 'src/common/components/AGTable';
import WidgetLoading from 'src/common/components/WidgetLoading';
import { ComeFromKeepDataEnum } from 'src/constant/enums';
import { onErrorNotif, onSuccessNotif } from 'src/handlers/notification';
import { useAppDispatch } from 'src/redux/hooks';
import { setPartDataBuySellAction } from 'src/redux/slices/keepDataBuySell';
import { handleValidity, valueFormatterSide, valueFormatterValidity } from 'src/utils/helpers';
import ActionCell, { TypeActionEnum } from '../components/actionCell';
import FilterTable from '../components/FilterTable';
import useHandleFilterDraft from '../components/useHandleFilterDraft';
import { setSelectedSymbol } from 'src/redux/slices/option';
import useSendOrders from 'src/widgets/DivideOrderModal/useSendOrders';
import AGActionCell from 'src/common/components/AGActionCell';

type IDraft = {
    ClickLeftNode: any;
};
const Drafts: FC<IDraft> = ({ ClickLeftNode }) => {
    const { data: dataBeforeFilter, isFetching } = useGetDraft();
    const { FilterData, handleChangeFilterData, dataAfterfilter } = useHandleFilterDraft({ dataBeforeFilter } as any);
    const { sendOrders, ordersLoading } = useSendOrders();

    const { mutate } = useDeleteDraft({
        onSuccess: () => {
            onSuccessNotif({ title: 'پیش نویس حذف گردید' });
        },
        onError: () => {
            onErrorNotif();
        },
    });
    const { isFilter } = ClickLeftNode;

    const handleDelete = (data?: IDraftResponseType) => {
        data?.orderId && mutate(data?.orderId);
    };

    const handleSend = (data?: IDraftResponseType) => {
        const { customers, orderSide, orderId, percent, price, quantity, symbolISIN, validity, validityDate } = data || {};
        if (!customers) {
            return;
        }

        const order: IOrderRequestType[] = customers.map((item) => ({
            customerISIN: [item.customerISIN] as ICustomerIsins,
            CustomerTagId: [],
            GTTraderGroupId: [],
            orderSide: orderSide || 'Buy',
            orderDraftId: orderId,
            orderStrategy: 'normal',
            orderType: 'LimitOrder',
            percent: percent || 0,
            price: price || 0,
            quantity: quantity || 0,
            symbolISIN: symbolISIN || '',
            validity: handleValidity(validity as validity),
            validityDate: validityDate || null,
        }));

        sendOrders(order);
    };

    const appDispatch = useAppDispatch();
    const handleEdit = async (data?: IDraftResponseType) => {
        if (!data) return;
        // First dispatch
        appDispatch(setSelectedSymbol(data.symbolISIN));

        // Second dispatch
        const buySellAction = {
            data: {
                price: data.price,
                quantity: data.quantity,
                side: data.orderSide,
                symbolISIN: data.symbolISIN,
                validity: data.validity,
                validityDate: data.validityDate,
                id: data.orderId,
            },
            comeFrom: ComeFromKeepDataEnum.Draft,
            customerIsin: data.customers.map((item) => item.customerISIN),
        };

        appDispatch(setPartDataBuySellAction(buySellAction));
    };

    const valueFormatterCustomers = (value: ICustomers[]) => {
        return String(value?.map((item) => item.customerTitle));
    };

    const columns = useMemo(
        (): ColDefType<IDraftResponseType>[] => [
            { headerName: 'مشتری یا گروه مشتری', field: 'customers', valueFormatter: ({ value }) => valueFormatterCustomers(value) },
            { headerName: 'نام نماد', field: 'symbolTitle' },
            { headerName: 'سمت', field: 'orderSide', valueFormatter: valueFormatterSide },
            { headerName: 'تعداد', field: 'quantity', type: 'sepratedNumber' },
            { headerName: 'قیمت', field: 'price', type: 'sepratedNumber' },
            { headerName: 'اعتبار درخواست', field: 'validity', valueFormatter: valueFormatterValidity },
            {
                headerName: 'عملیات',
                field: 'customTitle',
                cellRenderer: (row: ICellRendererParams<IDraftResponseType>) => (
                    <AGActionCell
                        data={row.data}
                        requiredButtons={['Send', 'Edit', 'Delete']}
                        onSendClick={handleSend}
                        onEditClick={handleEdit}
                        onDeleteClick={handleDelete}
                    />
                ),
            },
        ],
        [],
    );

    // const onRowSelected = (event: RowSelectedEvent<IDraftResponseType>) => {
    //     console.log(event);
    // };

    //
    return (
        <div className={'grid grid-rows-min-one h-full p-3'}>
            <div data-actived={isFilter} className="h-0 actived:h-auto transition-all opacity-0 actived:opacity-100">
                <FilterTable {...{ FilterData, handleChangeFilterData }} />
            </div>
            <WidgetLoading spining={isFetching}>
                <AGTable
                    rowData={dataAfterfilter}
                    columnDefs={columns}
                    rowSelection="multiple"
                    // enableBrowserTooltips={false}
                    // suppressRowClickSelection={true}
                    // onRowSelected={onRowSelected}
                />
            </WidgetLoading>
        </div>
    );
};

export default Drafts;
