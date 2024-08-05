import { ICellRendererParams } from 'ag-grid-community';
import { FC, useEffect, useMemo } from 'react';
import { useDeleteDraft, useGetDraft } from 'src/app/queries/draft';
import AGTable, { ColDefType } from 'src/common/components/AGTable';
import WidgetLoading from 'src/common/components/WidgetLoading';
import { ComeFromKeepDataEnum } from 'src/constant/enums';
import { onSuccessNotif } from 'src/handlers/notification';
import { useAppDispatch } from 'src/redux/hooks';
import { setPartDataBuySellAction } from 'src/redux/slices/keepDataBuySell';
import { handleValidity, removeDuplicatesInArray, valueFormatterSide } from 'src/utils/helpers';
import { setSelectedSymbol } from 'src/redux/slices/option';
import useSendOrders from 'src/widgets/DivideOrderModal/useSendOrders';
import AGActionCell from 'src/common/components/AGActionCell';
import AGHeaderSearchInput from 'src/common/components/AGTable/HeaderSearchInput';
import { useTranslation } from 'react-i18next';
import { pushEngine } from 'src/ls/pushEngine';
import { queryClient } from 'src/app/queryClient';
import { LastTradedPrice } from 'src/widgets/Watchlist/components/CellRenderer';


type IDraft = {};

const Drafts: FC<IDraft> = () => {

    const { t } = useTranslation()

    const { sendOrders } = useSendOrders();

    const appDispatch = useAppDispatch();

    const { data, isFetching } = useGetDraft({
        onSuccess: (data) => {
            const symbolISINs = data.map(item => item.symbolISIN);
            const duplicatedSymbolISINs = removeDuplicatesInArray(symbolISINs)

            if (symbolISINs) {
                pushEngine.subscribe({
                    id: 'lastTraderPriceUpdateINDraft',
                    mode: 'MERGE',
                    isSnapShot: 'yes',
                    adapterName: 'RamandRLCDData',
                    items: duplicatedSymbolISINs,
                    fields: ['lastTradedPrice', 'lastTradedPriceVarPercent'],
                    onFieldsUpdate: ({ changedFields, itemName }) => {

                        queryClient.setQueryData(['draftList'], (oldData: IDraftResponseType[] | undefined) => {
                            if (oldData) {
                                const draft: IDraftResponseType[] = JSON.parse(JSON.stringify(oldData));

                                const res = draft.map(item => {
                                    if (item.symbolISIN === itemName) {
                                        return {
                                            ...item,
                                            lastTradedPrice: changedFields.lastTradedPrice ? Number(changedFields.lastTradedPrice) : item.lastTradedPrice,
                                            lastTradedPriceVarPercent: changedFields.lastTradedPriceVarPercent ? changedFields.lastTradedPriceVarPercent : item.lastTradedPriceVarPercent
                                        }
                                    }
                                    return { ...item }
                                })

                                return [...res]
                            }
                        })
                    }
                })
            }
        }
    });

    useEffect(() => {
        return () => pushEngine.unSubscribe('lastTraderPriceUpdateINDraft');
    }, [])


    const { mutate } = useDeleteDraft({
        onSuccess: () => {
            onSuccessNotif({ title: 'پیش نویس حذف گردید' });
        }
    });

    const handleDelete = (data?: IDraftResponseType) => {
        data?.orderId && mutate(data?.orderId);
    };

    const handleSend = async (data?: IDraftResponseType) => {
        const { customers, orderSide, orderId, percent, price, quantity, symbolISIN, validity, validityDate } = data || {};
        if (!customers) {
            return;
        }

        const order: IOrderRequestType[] = customers.map((item) => ({
            customerISIN: [item.customerISIN] as ICustomerIsins,
            customerTitle: [item.customerTitle] as ICustomerIsins,
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

        await new Promise((resolve) => {
            !!symbolISIN && appDispatch(setSelectedSymbol(symbolISIN))
            resolve(1)
        }).then(() => {
            sendOrders(order);
        })


    };


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
            {
                headerName: 'مشتری یا گروه مشتری',
                field: 'customers',
                headerComponent: AGHeaderSearchInput,
                valueFormatter: ({ value }) => valueFormatterCustomers(value),
            },
            {
                headerName: 'نام نماد',
                field: 'symbolTitle',
                headerComponent: AGHeaderSearchInput,
            },
            {
                headerName: 'نوع',
                field: 'orderSide',
                valueFormatter: (data) => valueFormatterSide(data) + ' - ' + t('BSModal.validity_' + data?.data?.validity),
                cellClassRules: {
                    'bg-L-success-101 dark:bg-D-success-101': ({ value }) => value === 'Buy',
                    'bg-L-error-101 dark:bg-D-error-101': ({ value }) => value === 'Sell',
                },
                minWidth: 120
            },
            {
                headerName: 'تعداد',
                field: 'quantity',
                type: 'sepratedNumber',
            },
            {
                headerName: 'قیمت',
                field: 'price',
                type: 'sepratedNumber',
            },
            {
                headerName: 'آخرین قیمت',
                field: 'lastTradedPrice',
                type: 'sepratedNumber',
                cellRenderer: LastTradedPrice,
                minWidth: 100,
                maxWidth: 100
            },
            {
                headerName: 'عملیات',
                field: 'orderId',
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

    return (
        <div className={'grid h-full p-3'}>
            <WidgetLoading spining={isFetching}>
                <AGTable
                    rowData={data || []}
                    columnDefs={columns}
                    asyncTransactionWaitMillis={4000}
                    animateRows={true}
                    suppressScrollOnNewData={true}
                    suppressRowVirtualisation={true}
                    suppressColumnVirtualisation={true}
                    suppressLoadingOverlay={true}
                    suppressCellFocus={true}
                    stopEditingWhenCellsLoseFocus={true}
                    suppressColumnMoveAnimation={true}
                    onGridSizeChanged={({ api }) => api.sizeColumnsToFit()}
                    onRowDataUpdated={({ api }) => api.sizeColumnsToFit()}
                    onRowClicked={({ data }) => data?.symbolISIN && appDispatch(setSelectedSymbol(data?.symbolISIN))}
                />
            </WidgetLoading>
        </div>
    );
};

export default Drafts;
