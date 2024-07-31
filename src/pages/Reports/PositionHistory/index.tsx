import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import ReportLayout from "src/common/components/ReportLayout";
import { cleanObjectOfFalsyValues } from "src/utils/helpers";
import { actionSourceOption, blockTypeOption, initialState, sideOption } from "./constant";
import { ReportsIcon } from "src/common/icons";
import { emptySelectedCustomers, emptySelectedSymbol } from "src/redux/slices/option";
import FilterBlock from "src/common/components/FilterBlock";
import CustomerMegaSelect from "src/common/components/CustomerMegaSelect";
import SymbolMiniSelect from "src/common/components/SymbolMiniSelect";
import RadioField from "src/common/components/RadioGroup";
import dayjs, { ManipulateType } from "dayjs";
import { timeFieldOptions } from "../Trades/constant";
import AdvancedDatepicker from "src/common/components/AdvancedDatePicker/AdvanceDatepicker";
import RefreshBtn from "src/common/components/Buttons/RefreshBtn";
import WidgetLoading from "src/common/components/WidgetLoading";
import AGTable from "src/common/components/AGTable";
import { Paginator } from "src/common/components/Paginator/Paginator";
import { useAppDispatch } from "src/redux/hooks";
import { ColDef } from "ag-grid-community";
import BlockedValueTableComponent from "./BlockedValueTableComponent";
import { useListPositionHistory } from "src/app/queries/option";
import Select from "src/common/components/Select";

const PositionHistory = () => {

    const { t } = useTranslation()

    const [formValues, setFormValues] = useState(initialState);

    const [apiParams, setApiParams] = useState(formValues);

    const dispatch = useAppDispatch();

    const { data, refetch, isFetching } = useListPositionHistory(cleanObjectOfFalsyValues(apiParams) as IFilterPositionHistory, { enabled: false });

    useEffect(() => {
        refetch();
    }, [apiParams]);


    const isFilterValuesChanged = () => {
        const initialValue = cleanObjectOfFalsyValues(initialState);
        const params = cleanObjectOfFalsyValues(apiParams);
        if (initialValue?.CustomerISIN?.length !== params?.CustomerISIN?.length) return true;
        else if (initialValue?.SymbolISIN?.length !== params?.SymbolISIN?.length) return true;
        else if (initialValue?.FromDate !== params?.FromDate) return true;
        else if (initialValue?.ToDate !== params?.ToDate) return true;
        else if (initialValue?.requestType !== params?.requestType) return true;
        else if (initialValue?.requestState !== params?.requestState) return true;
        else return false;
    };

    const handleClearClick = () => {
        dispatch(emptySelectedCustomers());
        dispatch(emptySelectedSymbol());
        setFormValues({ ...initialState });
        setApiParams(cleanObjectOfFalsyValues({ ...initialState }) as IFilterPositionHistory);
    };

    const handleDateChange = (value: string, field: 'FromDate' | 'ToDate') => {
        setFormValues((prev) => ({ ...prev, Time: '' }));
        handleFormValueChange(field, value);
    };

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

    const PaginatorHandler = (action: 'PageNumber' | 'PageSize', value: number) => {
        setApiParams((pre) => ({ ...pre, ['QueryOption.' + action]: value }));
    };


    const COLUMNS = useMemo<ColDef<IResponsePositionHistory>[]>(() => [
        // ردیف
        {
            headerName: "ردیف",
            maxWidth: 80,
            pinned: 'right',
            valueGetter: ({ node }) => ((apiParams['QueryOption.PageNumber'] - 1) * apiParams['QueryOption.PageSize']) + (node?.rowIndex || 0) + 1,
            cellClass: "justify-start border-solid rounded-r border-r-4 pr-2 text-center",
            cellClassRules: {
                "border-r-L-error-200": ({ data }) => Boolean(data?.side === "Sell"),
                "border-r-L-success-200": ({ data }) => Boolean(data?.side === "Buy")
            },
        },
        /* نماد */
        {
            headerName: t("option_position_history.column_symbol"),
            field: "symbolTitle",
            minWidth: 128,
            pinned: 'right'
        },
        {
            headerName: 'مشتری',
            field: "customerTitle",
            pinned: 'right',
            minWidth: 112,
            valueFormatter: ({ value }) => value ?? "",
        },
         {
            headerName: 'کد بورسی',
            field: "bourseCode",
            valueFormatter: ({ value }) => value ?? "-",
        },
        /* موقعیت */
        {
            headerName: t("option_position_history.column_position"),
            field: 'side',
            valueFormatter: ({ value }) => value ? t('common.' + (value === 'None' ? 'closed' : String(value).toLowerCase())) : '-',
            cellClass: ({ data }) => {
                if (!data) return '';
                return (data.side === 'Buy') ? 'text-L-success-200' : (data.side === 'Sell') ? 'text-L-error-200' : '';
            },
            minWidth: 128,
        },
        /* تعداد  */
        {
            headerName: t("option_position_history.column_count"),
            field: "positionCount",
            cellClass: ({ data }) => {
                if (!data) return '';
                return (data.side === 'Buy') ? 'text-L-success-200 ltr' : (data.side === 'Sell') ? 'text-L-error-200 ltr' : '';
            },
            type: 'sepratedNumber',
            minWidth: 128,

        },
        /* باقیمانده  */
        {
            headerName: t("option_position_history.column_remain"),
            field: "totalPositionCount",
            type: 'sepratedNumber',
            minWidth: 128,

        },
        /* عملیات  */
        {
            headerName: t("option_position_history.column_action"),
            field: "actionSource",
            valueFormatter: ({ value }) => value ? t('option_position_history.actionSource_' + value) : '-',
            minWidth: 144,
        },
        /* محل تضمین  */
        {
            headerName: t("option_position_history.column_blockType"),
            field: "blockType",
            minWidth: 144,
            valueGetter: ({ data }) => {
                if (data?.side === 'Sell') {
                    return t('option_blockType.' + data?.blockType);
                }

                return '-';
            }
        },
        /* اندازه تضمین  */
        {
            headerName: t("option_position_history.column_blockedValue"),
            field: "blockCount",
            cellRenderer: BlockedValueTableComponent,
            minWidth: 144,
        },
        /* اندازه قرارداد */
        {
            headerName: t("option_position_history.column_contractSize"),
            field: "contractSize",
            type: 'sepratedNumber',
            minWidth: 144,
        },
        /* قیمت اعمال */
        {
            headerName: t("option_position_history.column_appliedPrice"),
            field: "strikePrice",
            type: 'sepratedNumber',
            minWidth: 144,

        },
        /* تاریخ */
        {
            headerName: t("option_position_history.column_date"),
            field: "saveDate",
            valueFormatter: ({ value }) => value ? dayjs(value).calendar('jalali').format("YYYY/MM/DD") : '-',
            minWidth: 144,

        },
        /*  ساعت */
        {
            headerName: t("option_position_history.column_time"),
            field: "saveDate",
            valueFormatter: ({ value }) => value ? dayjs(value).calendar('jalali').format("HH:mm:ss") : '-',
            minWidth: 144,

        },
        /* سود و زیان تحقق یافته */
        {
            headerName: t("option_position_history.column_achievedPandL"),
            field: "achievedPandl",
            type: 'sepratedNumber',
            minWidth: 144,
        },
    ], [apiParams["QueryOption.PageNumber"] , apiParams["QueryOption.PageSize"]]);



    return (
        <ReportLayout
            hasBreadcrumb
            BreadCumbCurrentPage="تاریخچه موقعیت ها"
            isFiltered={isFilterValuesChanged()}
            BreadCumbBasePage={
                <>
                    <span>
                        <ReportsIcon />
                    </span>
                    گزارشات
                </>
            }
            onSubmit={() => setApiParams(cleanObjectOfFalsyValues({ ...formValues, Time: '' }) as IFilterPositionHistory)}
            onClear={handleClearClick}
            formFields={
                <div className="flex flex-col gap-4">
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

                    <FilterBlock label='موقعیت:' viewCol className="w-full">
                        <Select
                            value={formValues?.side}
                            options={sideOption}
                            onChange={(selected) => handleFormValueChange('side', selected)}
                        />
                    </FilterBlock>


                    <FilterBlock label='محل تضمین:' viewCol className="w-full">
                        <Select
                            value={formValues?.blockType}
                            options={blockTypeOption}
                            onChange={(selected) => handleFormValueChange('blockType', selected)}
                        />
                    </FilterBlock>

                    <FilterBlock label='عملیات' viewCol className="w-full">
                        <Select
                            value={formValues?.actionSource}
                            options={actionSourceOption}
                            onChange={(selected) => handleFormValueChange('actionSource', selected)}
                        />
                    </FilterBlock>

                </div>
            }
            HeaderLeftNode={
                <>
                    <RefreshBtn onClick={() => refetch()} />
                    {/* <ExcelExportBtn onClick={() => fetchExcel()} /> */}
                </>
            }
            reportNode={
                <>
                    <WidgetLoading spining={isFetching}>
                        <AGTable
                            suppressScrollOnNewData={false}
                            rowData={data?.result || []}
                            columnDefs={COLUMNS}
                            onSortChanged={({ api }) => api.refreshCells()}
                            suppressRowVirtualisation
                        />
                    </WidgetLoading>
                    <div className="border-t flex justify-end items-center pt-4 ">
                        <Paginator
                            loading={isFetching}
                            pageNumber={data?.pageNumber || 1}
                            pageSize={data?.pageSize || 25}
                            totalPages={data?.totalPages}
                            hasNextPage={data?.hasNextPage}
                            hasPreviousPage={data?.hasPreviousPage}
                            PaginatorHandler={PaginatorHandler}
                        />
                    </div>
                </>
            }
        />
    )
}



export default PositionHistory;
