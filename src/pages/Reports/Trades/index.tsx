import Tippy from '@tippyjs/react';
import { InfoIcon, ReportsIcon } from 'src/common/icons';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useTradesListExcel, useTradesLists } from 'src/app/queries/order';
import dayjs, { ManipulateType } from 'dayjs';
import { aggregateOnFieldOptions, customerTypeFieldOptions, initialState, sideFieldOptions, timeFieldOptions } from './constant';
import { emptySelectedCustomers, emptySelectedSymbol } from 'src/redux/slices/option';
import { useAppDispatch } from 'src/redux/hooks';
import { cleanObjectOfFalsyValues, excelDownloader, valueFormatterSide } from 'src/utils/helpers';
import ReportLayout from 'src/common/components/ReportLayout';
import ExcelExportBtn from 'src/common/components/Buttons/ExcelExportBtn';
import RefreshBtn from 'src/common/components/Buttons/RefreshBtn';
import WidgetLoading from 'src/common/components/WidgetLoading';
import AGTable, { ColDefType } from 'src/common/components/AGTable';
import { Paginator } from 'src/common/components/Paginator/Paginator';
import { ICellRendererParams, IHeaderParams } from 'ag-grid-community';
import FilterBlock from 'src/common/components/FilterBlock';
import CustomerMegaSelect from 'src/common/components/CustomerMegaSelect';
import SymbolMiniSelect from 'src/common/components/SymbolMiniSelect';
import RadioField from 'src/common/components/RadioGroup';
import AdvancedDatepicker from 'src/common/components/AdvancedDatePicker/AdvanceDatepicker';
import AGActionCell from 'src/common/components/AGActionCell';
import TradeInfoModal from './modals/TradeInfoModal';

const Trades = () => {
    //
    const { t } = useTranslation();
    const [formValues, setFormValues] = useState(initialState);
    const [apiParams, setApiParams] = useState(formValues);
    const [infoModalData, setInfoModalData] = useState<{ isOpen: boolean; data?: IGTTradesListResultType }>({ isOpen: false });
    const dispatch = useAppDispatch();

    const { data: tradesData, refetch, isFetching } = useTradesLists(apiParams, { enabled: false });
    const { refetch: fetchExcel, isFetching: isExcelFetching } = useTradesListExcel(apiParams, {
        enabled: false,
        onSuccess: (response) => {
            if (response?.fileContent) {
                excelDownloader(response);
            }
        },
    });

    useEffect(() => {
        refetch();
    }, [apiParams]);

    const Columns = useMemo(
        (): ColDefType<IGTTradesListResultType>[] => [
            {
                headerName: t('ag_columns_headerName.row'),
                sortable: false,
                minWidth: 60,
                maxWidth: 80,
                valueFormatter: ({ node }) => String((apiParams?.PageNumber - 1) * apiParams?.PageSize + node?.rowIndex! + 1),
            },
            { headerName: t('ag_columns_headerName.customer'), field: 'customerTitle' },
            { headerName: t('ag_columns_headerName.bourseCode'), field: 'bourseCode' },
            { headerName: t('ag_columns_headerName.symbol'), field: 'symbolTitle' },
            {
                headerName: t('ag_columns_headerName.side'),
                field: 'orderSide',
                valueFormatter: valueFormatterSide,
                cellClassRules: {
                    'text-L-success-200': ({ value }) => value === 'Buy',
                    'text-L-error-200': ({ value }) => value === 'Sell',
                },
            },
            { headerName: t('ag_columns_headerName.date'), field: 'tradeDate', type: 'date' },
            { headerName: t('ag_columns_headerName.count'), field: 'tradeQuantity', type: 'sepratedNumber' },
            { headerName: t('ag_columns_headerName.price'), field: 'tradePrice', type: 'sepratedNumber' },
            {
                headerName: t('ag_columns_headerName.finalCost'),
                field: 'totalPrice',
                type: 'sepratedNumber',
                headerComponent: ({ displayName }: IHeaderParams) => (
                    <Tippy content={t('Tooltip.finalCostWithCommission')} className="text-xs">
                        <div className="w-full flex justify-center gap-1">
                            <span>{displayName}</span>
                            <InfoIcon width="16" height="16" />
                        </div>
                    </Tippy>
                ),
            },
            {
                headerName: t('ag_columns_headerName.actions'),
                pinned: 'left',
                sortable: false,
                minWidth: 90,
                maxWidth: 90,
                cellRenderer: (row: ICellRendererParams<IGTTradesListResultType>) => (
                    <AGActionCell
                        data={row.data}
                        requiredButtons={['Info']}
                        disableInfo={!(row?.data?.iterationCount! > 1)}
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

    const PaginatorHandler = useCallback((action: 'PageNumber' | 'PageSize', value: number) => {
        setApiParams((pre) => ({ ...pre, [action]: value, ['PageNumber']: action === 'PageSize' ? 1 : value }));
        action === 'PageSize' && setFormValues((pre) => ({ ...pre, [action]: value }));
    }, []);

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

    const handleClearClick = () => {
        dispatch(emptySelectedCustomers());
        dispatch(emptySelectedSymbol());
        setFormValues({ ...initialState });
        setApiParams(cleanObjectOfFalsyValues({ ...initialState }) as IGTTradesListRequest);
    };

    const isFilterValuesChanged = () => {
        const initialValue = cleanObjectOfFalsyValues(initialState);
        const params = cleanObjectOfFalsyValues(apiParams);
        if (initialValue?.CustomerISIN?.length !== params?.CustomerISIN?.length) return true;
        else if (initialValue?.SymbolISIN?.length !== params?.SymbolISIN?.length) return true;
        else if (initialValue?.FromDate !== params?.FromDate) return true;
        else if (initialValue?.GetTradesAggregateType !== params?.GetTradesAggregateType) return true;
        else if (initialValue?.Side !== params?.Side) return true;
        else if (initialValue?.ToDate !== params?.ToDate) return true;
        else if (initialValue?.CustomerType !== params?.CustomerType) return true;
        else return false;
    };

    return (
        <ReportLayout
            hasBreadcrumb
            BreadCumbCurrentPage="معاملات"
            isFiltered={isFilterValuesChanged()}
            BreadCumbBasePage={
                <>
                    <span>
                        <ReportsIcon />
                    </span>
                    گزارشات
                </>
            }
            onSubmit={() => setApiParams(cleanObjectOfFalsyValues({ ...formValues, Time: '' }) as IGTTradesListRequest)}
            onClear={handleClearClick}
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
                        onChange={(value) => handleFormValueChange('GetTradesAggregateType', value)}
                        options={aggregateOnFieldOptions}
                        value={formValues?.GetTradesAggregateType}
                        label={t('FilterFieldLabel.AggregateType')}
                    />
                </div>
            }
            HeaderLeftNode={
                <>
                    <RefreshBtn onClick={() => refetch()} />
                    <ExcelExportBtn onClick={() => fetchExcel()} />
                </>
            }
            reportNode={
                <>
                    <WidgetLoading spining={isFetching}>
                        <AGTable suppressScrollOnNewData={false} rowData={tradesData?.result || []} columnDefs={Columns} />
                    </WidgetLoading>
                    <div className="border-t flex justify-end items-center pt-4 ">
                        <Paginator
                            loading={isFetching}
                            pageNumber={apiParams?.PageNumber}
                            pageSize={apiParams?.PageSize}
                            totalPages={tradesData?.totalPages}
                            hasNextPage={tradesData?.hasNextPage}
                            hasPreviousPage={tradesData?.hasPreviousPage}
                            PaginatorHandler={PaginatorHandler}
                        />
                    </div>
                    {infoModalData.isOpen && (
                        <TradeInfoModal modalData={infoModalData} setModalData={setInfoModalData} aggregateType={apiParams?.GetTradesAggregateType} />
                    )}
                </>
            }
        />
    );
};

export default Trades;
