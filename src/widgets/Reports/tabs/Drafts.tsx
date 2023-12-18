import { useMutation } from '@tanstack/react-query';
import { ICellRendererParams } from 'ag-grid-community';
import { FC, useMemo, useRef, useState } from 'react';
import { useDeleteDraft, useGetDraft } from 'src/app/queries/draft';
import { setOrder } from 'src/app/queries/order';
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
import ConfirmModal from 'src/common/components/ConfirmModal/ConfirmModal';
import useSendOrders from 'src/widgets/DivideOrderModal/useSendOrders';
type IDraft = {
    ClickLeftNode: any;
};
const Drafts: FC<IDraft> = ({ ClickLeftNode }) => {
    const { data: dataBeforeFilter, isFetching } = useGetDraft();
    const { FilterData, handleChangeFilterData, dataAfterfilter } = useHandleFilterDraft({ dataBeforeFilter } as any);
    const [isOpen, setIsOpen] = useState(false);
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
    const { mutate: mutateSend } = useMutation(setOrder, {
        onSuccess: () => {
            onSuccessNotif();
        },
        onError: () => {
            onErrorNotif();
        },
    });

    const selectedDataForDelete = useRef<IDraftResponseType | undefined>();

    const handleDelete = (data?: IDraftResponseType) => {
        selectedDataForDelete.current = data;
        setIsOpen(true);
    };

    const handleSend = (data?: IDraftResponseType) => {
        const { customers , orderSide, orderId, percent, price, quantity, symbolISIN, validity, validityDate } = data || {};
        if(!customers){
            return
        }

        console.log("data",data)

      const order : IOrderRequestType[] = customers.map( item => ({
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
        }))

        sendOrders(0 , order)
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
                    <ActionCell
                        data={row.data}
                        type={[TypeActionEnum.DELETE, TypeActionEnum.EDIT, TypeActionEnum.SEND]}
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                        handleSend={handleSend}
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
            {isOpen && (
                <ConfirmModal
                    title={'حذف پیش نویس'}
                    description={'آیا از حذف پیش نویس اطمینان دارید؟'}
                    onConfirm={() => {
                        selectedDataForDelete.current?.orderId && mutate(selectedDataForDelete.current.orderId);
                        setIsOpen(false);
                    }}
                    onCancel={() => setIsOpen(false)}
                    confirmBtnLabel="تایید"
                />
            )}
        </div>
    );
};

export default Drafts;
