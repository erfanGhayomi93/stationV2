import { useMutation } from '@tanstack/react-query';
import { ICellRendererParams } from 'ag-grid-community';
import { FC, useMemo } from 'react';
import { useDeleteDraft, useGetDraft } from 'src/app/queries/draft';
import { setOrder } from 'src/app/queries/order';
import AGTable, { ColDefType } from 'src/common/components/AGTable';
import WidgetLoading from 'src/common/components/WidgetLoading';
import { ComeFromKeepDataEnum } from 'src/constant/enums';
import { onErrorNotif, onSuccessNotif } from 'src/handlers/notification';
import { useAppDispatch } from 'src/redux/hooks';
import { setDataBuySellAction, setPartDataBuySellAction } from 'src/redux/slices/keepDataBuySell';
import { handleValidity, valueFormatterSide, valueFormatterValidity } from 'src/utils/helpers';
import ActionCell, { TypeActionEnum } from '../components/actionCell';
import FilterTable from '../components/FilterTable';
import useHandleFilterDraft from '../components/useHandleFilterDraft';
import { setSelectedSymbol } from 'src/redux/slices/option';
type IDraft = {
    ClickLeftNode: any;
};
const Drafts: FC<IDraft> = ({ ClickLeftNode }) => {
    const { data: dataBeforeFilter, isFetching } = useGetDraft();
    const { FilterData, handleChangeFilterData, dataAfterfilter } = useHandleFilterDraft({ dataBeforeFilter } as any);
    const { mutate } = useDeleteDraft();
    const { isFilter } = ClickLeftNode;
    const { mutate: mutateSend } = useMutation(setOrder, {
        onSuccess: () => {
            onSuccessNotif();
        },
        onError: () => {
            onErrorNotif();
        },
    });

    const handleDelete = (data?: IDraftResponseType) => {
        data && mutate(data?.orderId);
    };

    const handleSend = (data?: IDraftResponseType) => {
        const { customers, customerTags, gtGroups, orderSide, orderId, percent, price, quantity, symbolISIN, validity, validityDate } = data || {};
        mutateSend({
            customerISIN: customers?.map((item) => item?.customerISIN) || [],
            CustomerTagId: customerTags?.map((item) => item?.customerTagTitle) || [],
            GTTraderGroupId: gtGroups?.map((item) => item?.traderGroupId) || [],
            orderSide: orderSide || 'Buy',
            orderDraftId: orderId,
            orderStrategy: 'normal',
            orderType: 'MarketOrder',
            percent: percent || 0,
            price: price || 0,
            quantity: quantity || 0,
            symbolISIN: symbolISIN || '',
            validity: handleValidity(validity || ''),
            validityDate: validityDate,
        });
    };

    const appDispatch = useAppDispatch();
    const handleEdit = async (data?: IDraftResponseType) => {
        if (!data) return
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
                id: data.orderId
            },
            comeFrom: ComeFromKeepDataEnum.Draft,
            customerIsin: data.customers.map(item => item.customerISIN)
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
        </div>
    );
};

export default Drafts;
