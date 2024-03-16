import { ReportsIcon } from 'src/common/icons';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useOrderListExcel, useOrderLists } from 'src/app/queries/order';
import { initialState, orderStatusFieldOptions } from './constant';
import { emptySelectedCustomers, emptySelectedSymbol } from 'src/redux/slices/option';
import { useAppDispatch } from 'src/redux/hooks';
import { cleanObjectOfFalsyValues, excelDownloader, valueFormatterSide } from 'src/utils/helpers';
import ReportLayout from 'src/common/components/ReportLayout';
import RefreshBtn from 'src/common/components/Buttons/RefreshBtn';
import ExcelExportBtn from 'src/common/components/Buttons/ExcelExportBtn';
import WidgetLoading from 'src/common/components/WidgetLoading';
import AGTable, { ColDefType } from 'src/common/components/AGTable';
import { Paginator } from 'src/common/components/Paginator/Paginator';
import FilterBlock from 'src/common/components/FilterBlock';
import CustomerMegaSelect from 'src/common/components/CustomerMegaSelect';
import SymbolMiniSelect from 'src/common/components/SymbolMiniSelect';
import RadioField from 'src/common/components/RadioGroup';
import dayjs, { ManipulateType } from 'dayjs';
import { aggregateOnFieldOptions, customerTypeFieldOptions, sideFieldOptions, timeFieldOptions } from '../Trades/constant';
import AdvancedDatepicker from 'src/common/components/AdvancedDatePicker/AdvanceDatepicker';
import Select from 'src/common/components/Select';
import AGActionCell from 'src/common/components/AGActionCell';
import { ICellRendererParams } from 'ag-grid-community';
import OrderInfoModal from './modals/OrderInfoModal';

export interface OrdersFilterTypes {
    customers: IGoCustomerSearchResult[];
    symbols: SymbolSearchResult[];
    fromDate: string;
    toDate: string;
    side: string;
    customerType: string;
    status: string[];
}

const Orders = () => {
    //

    const { t } = useTranslation();
    const [formValues, setFormValues] = useState(initialState);
    const [apiParams, setApiParams] = useState(formValues);
    const [infoModalData, setInfoModalData] = useState<{ isOpen: boolean; data?: IGTOrderListResultType }>({ isOpen: false });
    const dispatch = useAppDispatch();

    const {
        data: ordersList,
        refetch: getOrdersList,
        isFetching,
    } = useOrderLists(
        {
            ...(cleanObjectOfFalsyValues(apiParams) as IGTOrderListRequest),
        },
        { enabled: false },
    );

    const { refetch: fetchExcel, isFetching: isExcelFetching } = useOrderListExcel(apiParams, {
        enabled: false,
        onSuccess: (response) => {
            if (response?.fileContent) {
                excelDownloader(response);
            }
        },
    });

    useEffect(() => {
        getOrdersList();
    }, [apiParams]);

    const handleClearClick = () => {
        dispatch(emptySelectedCustomers());
        dispatch(emptySelectedSymbol());
        setFormValues({ ...initialState });
        setApiParams(cleanObjectOfFalsyValues({ ...initialState, Time: '' }) as IGTOrderListRequest);
    };

    const PaginatorHandler = useCallback((action: 'PageNumber' | 'PageSize', value: number) => {
        setApiParams((pre) => ({ ...pre, [action]: value, ['PageNumber']: action === 'PageSize' ? 1 : value }));
        action === 'PageSize' && setFormValues((pre) => ({ ...pre, [action]: value }));
    }, []);

    const Columns = useMemo(
        (): ColDefType<IGTOrderListResultType>[] => [
            {
                headerName: t('ag_columns_headerName.row'),
                sortable: false,
                minWidth: 60,
                maxWidth: 80,
                pinned: 'right',
                valueFormatter: ({ node }) => String((apiParams?.PageNumber - 1) * apiParams?.PageSize + node?.rowIndex! + 1),
            },
            { headerName: t('ag_columns_headerName.customer'), field: 'customerTitle' },
            { headerName: t('ag_columns_headerName.symbol'), field: 'symbolTitle', type: 'sepratedNumber' },
            {
                headerName: t('ag_columns_headerName.side'),
                field: 'orderSide',
                type: 'sepratedNumber',
                valueFormatter: valueFormatterSide,
                cellClassRules: {
                    'text-L-success-200': ({ value }) => value === 'Buy',
                    'text-L-error-200': ({ value }) => value === 'Sell',
                },
            },
            { headerName: t('ag_columns_headerName.count'), field: 'quantity', type: 'sepratedNumber' },
            { headerName: t('ag_columns_headerName.price'), field: 'price', type: 'sepratedNumber' },
            {
                headerName: t('ag_columns_headerName.tradeValue'),
                field: 'orderValue',
                type: 'sepratedNumber',
            },
            { headerName: t('ag_columns_headerName.status'), field: 'omsOrderState', valueFormatter: ({ value }) => t('order_status.' + value) },
            { headerName: t('ag_columns_headerName.date'), field: 'orderDateTime', type: 'dateWithoutTime' },
            {
                headerName: t('ag_columns_headerName.actions'),
                pinned: 'left',
                sortable: false,
                minWidth: 90,
                maxWidth: 90,
                cellRenderer: (row: ICellRendererParams<IGTOrderListResultType>) => (
                    <AGActionCell
                        data={row.data}
                        requiredButtons={['Info']}
                        onInfoClick={() => setInfoModalData({ data: row?.data, isOpen: true })}
                    />
                ),
            },
        ],
        [apiParams],
    );

    const handleFormValueChange = (field: keyof typeof formValues, value: any) => {
        setFormValues((prev) => ({ ...prev, [field]: value }));
    };

    const onTimeFieldChange = (time: ManipulateType | undefined) => {
        const ToDate = dayjs().format('YYYY-MM-DDT23:59:59');
        const FromDate = dayjs().subtract(1, time).format('YYYY-MM-DDT00:00:00');
        setFormValues((pre) => ({
            ...pre,
            FromDate,
            ToDate,
        }));
    };

    const handleDateChange = (value: string, field: 'FromDate' | 'ToDate') => {
        setFormValues((prev) => ({ ...prev, Time: '' }));
        handleFormValueChange(field, value);
    };

    const isFilterValuesChanged = () => {
        const initialValue = cleanObjectOfFalsyValues(initialState);
        const params = cleanObjectOfFalsyValues(apiParams);
        if (initialValue?.CustomerISIN?.length !== params?.CustomerISIN?.length) return true;
        else if (initialValue?.SymbolISIN?.length !== params?.SymbolISIN?.length) return true;
        else if (initialValue?.FromDate !== params?.FromDate) return true;
        else if (initialValue?.OrderStatus !== params?.OrderStatus) return true;
        else if (initialValue?.AggregateType !== params?.AggregateType) return true;
        else if (initialValue?.Side !== params?.Side) return true;
        else if (initialValue?.ToDate !== params?.ToDate) return true;
        else if (initialValue?.CustomerType !== params?.CustomerType) return true;
        else return false;
    };

    return (
        <ReportLayout
            hasBreadcrumb
            BreadCumbBasePage={
                <>
                    <span>
                        <ReportsIcon />
                    </span>
                    گزارشات
                </>
            }
            BreadCumbCurrentPage="سفارشات"
            isFiltered={isFilterValuesChanged()}
            onSubmit={() => setApiParams(cleanObjectOfFalsyValues({ ...formValues, Time: '' }) as IGTOrderListRequest)}
            onClear={handleClearClick}
            HeaderLeftNode={
                <>
                    <RefreshBtn onClick={() => getOrdersList()} />
                    <ExcelExportBtn onClick={() => fetchExcel()} />
                </>
            }
            formFields={
                <div className="flex flex-col gap-2">
                    <FilterBlock label={t('FilterFieldLabel.Customer')} viewCol>
                        <CustomerMegaSelect
                            selected={formValues.CustomerISIN}
                            setSelected={(value) =>
                                handleFormValueChange(
                                    'CustomerISIN',
                                    value?.map((x) => x?.customerISIN),
                                )
                            }
                        />
                    </FilterBlock>
                    <FilterBlock label={t('FilterFieldLabel.Symbol')} viewCol>
                        <SymbolMiniSelect
                            multiple
                            selected={formValues.SymbolISIN}
                            setSelected={(value) =>
                                handleFormValueChange(
                                    'SymbolISIN',
                                    value?.map((x) => x?.symbolISIN),
                                )
                            }
                        />
                    </FilterBlock>
                    <RadioField
                        onChange={(value) => {
                            handleFormValueChange('Time', value);
                            onTimeFieldChange(value as ManipulateType);
                        }}
                        options={timeFieldOptions}
                        value={formValues.Time}
                        label={t('FilterFieldLabel.Time')}
                    />
                    <div className="flex w-full gap-3">
                        <FilterBlock label={t('FilterFieldLabel.FromDate')} viewCol className="w-full">
                            <AdvancedDatepicker
                                value={formValues?.FromDate}
                                onChange={(value) => handleDateChange(dayjs(value).format('YYYY-MM-DDT00:00:00'), 'FromDate')}
                            />
                        </FilterBlock>
                        <FilterBlock label={t('FilterFieldLabel.ToDate')} viewCol className="w-full">
                            <AdvancedDatepicker
                                value={formValues?.ToDate}
                                onChange={(value) => handleDateChange(dayjs(value).format('YYYY-MM-DDT23:59:59'), 'ToDate')}
                            />
                        </FilterBlock>
                    </div>
                    <FilterBlock label={t('FilterFieldLabel.Status')} viewCol className="w-full ">
                        <Select
                            onChange={(selected) => handleFormValueChange('OrderStatus', selected)}
                            value={formValues?.OrderStatus}
                            options={orderStatusFieldOptions}
                        />
                    </FilterBlock>
                    <RadioField
                        onChange={(value) => handleFormValueChange('Side', value)}
                        options={sideFieldOptions}
                        value={formValues?.Side}
                        label={t('FilterFieldLabel.Side')}
                    />
                    <RadioField
                        onChange={(value) => handleFormValueChange('CustomerType', value)}
                        options={customerTypeFieldOptions}
                        value={formValues?.CustomerType}
                        label={t('FilterFieldLabel.CustomerType')}
                    />

                    <RadioField
                        onChange={(value) => handleFormValueChange('AggregateType', value)}
                        options={aggregateOnFieldOptions}
                        value={formValues?.AggregateType}
                        label={t('FilterFieldLabel.AggregateType')}
                    />
                </div>
            }
            reportNode={
                <>
                    <WidgetLoading spining={isFetching}>
                        <AGTable
                            suppressScrollOnNewData={false}
                            rowData={ordersList?.result || []}
                            columnDefs={Columns}
                            onSortChanged={({ api }) => api.refreshCells()}
                            suppressRowVirtualisation
                        />
                    </WidgetLoading>
                    <div className="border-t flex justify-end items-center pt-4 ">
                        <Paginator
                            loading={isFetching}
                            pageNumber={apiParams?.PageNumber}
                            pageSize={apiParams?.PageSize}
                            totalPages={ordersList?.totalPages}
                            hasNextPage={ordersList?.hasNextPage}
                            hasPreviousPage={ordersList?.hasPreviousPage}
                            PaginatorHandler={PaginatorHandler}
                        />
                    </div>
                    {infoModalData.isOpen && (
                        <OrderInfoModal modalData={infoModalData} setModalData={setInfoModalData} aggregateType={apiParams?.AggregateType} />
                    )}
                </>
            }
        />
    );
};

export default Orders;
