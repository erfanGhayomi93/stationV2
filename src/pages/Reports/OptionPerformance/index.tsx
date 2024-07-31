import ReportLayout from "src/common/components/ReportLayout";
import { ReportsIcon } from "src/common/icons";
import { cleanObjectOfFalsyValues, sepNumbersNavigateNumber } from "src/utils/helpers";
import { useTranslation } from "react-i18next";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useAppDispatch } from "src/redux/hooks";
import { useListOptionPerformance } from "src/app/queries/option";
import { emptySelectedCustomers, emptySelectedSymbol } from "src/redux/slices/option";
import { ColDef } from "ag-grid-community";
import dayjs from "dayjs";
import BlockedValueTableComponent from "../PositionHistory/BlockedValueTableComponent";
import FilterBlock from "src/common/components/FilterBlock";
import CustomerMegaSelect from "src/common/components/CustomerMegaSelect";
import RefreshBtn from "src/common/components/Buttons/RefreshBtn";
import WidgetLoading from "src/common/components/WidgetLoading";
import AGTable from "src/common/components/AGTable";
import { Paginator } from "src/common/components/Paginator/Paginator";
import Select from "src/common/components/Select";
import SymbolMiniSelect from "src/common/components/SymbolMiniSelect";
import { initialState, remainOptions } from "./constant";
import { useCommissionQuery } from "src/app/queries/trade";




const OptionPerformance = () => {

    const { t } = useTranslation()

    const [formValues, setFormValues] = useState(initialState);

    const [apiParams, setApiParams] = useState(formValues);

    const dispatch = useAppDispatch();

    const { data, refetch, isFetching } = useListOptionPerformance(cleanObjectOfFalsyValues({ ...apiParams }) as IFilterOptionPerformance, { enabled: false });

    const { data: commissionsData } = useCommissionQuery();

    useEffect(() => {
        refetch();
    }, [apiParams]);


    const PaginatorHandler = useCallback((action: 'PageNumber' | 'PageSize', value: number) => {
        const param = action === 'PageNumber' ? 'QueryOption.PageNumber' : 'QueryOption.PageSize'
        setApiParams((pre) => ({ ...pre, [param]: value, ['QueryOption.PageNumber']: action === 'PageSize' ? 1 : value }));
        action === 'PageSize' && setFormValues((pre) => ({ ...pre, [param]: value }));
    }, []);

    const isFilterValuesChanged = () => {
        const initialValue = cleanObjectOfFalsyValues(initialState);
        const params = cleanObjectOfFalsyValues(apiParams);
        if (initialValue?.CustomerISIN?.length !== params?.CustomerISIN?.length) return true;
        else if (initialValue?.SymbolISIN?.length !== params?.SymbolISIN?.length) return true;
        else if (initialValue?.hasRemain !== params?.hasRemain) return true;
        else return false;
    };


    const handleClearClick = () => {
        dispatch(emptySelectedCustomers());
        dispatch(emptySelectedSymbol());
        setFormValues({ ...initialState });
        setApiParams(cleanObjectOfFalsyValues({ ...initialState }) as IFilterOptionPerformance);
    };

    const optionAppliedCommission = (data?: IResponseOptionPerformance) => {
        if (!data) return 0;

        const { positionSide, contractType } = data;

        if (contractType === 'Call' && positionSide === 'Buy') return 0.0005;

        if (contractType === 'Call' && positionSide === 'Sell') return 0.0055;

        if (contractType === 'Put' && positionSide === 'Buy') return 0.0055;

        if (contractType === 'Put' && positionSide === 'Sell') return 0.0005;

        return 0;
    };

    const handleFormValueChange = (field: keyof typeof formValues, value: any) => {
        setFormValues((prev) => ({ ...prev, [field]: value }));
    };


    const optionCommission = useMemo(() => {
        const commission = commissionsData?.find(c => c.marketUnitTitle === "OptionToBuyInBourse" && c.marketTitle === 'Option');

        return commission?.buyCommission || commission?.sellCommission || 0;
    }, [commissionsData]);

    useEffect(() => {
        console.log(formValues['QueryOption.PageNumber'])
    }, [formValues['QueryOption.PageNumber']])


    const COLUMNS = useMemo<ColDef<IResponseOptionPerformance>[]>(() => [
        // ردیف
        {
            headerName: "ردیف",
            maxWidth: 80,
            pinned: 'right',
            valueGetter: ({ node }) => ((apiParams['QueryOption.PageNumber'] - 1) * apiParams['QueryOption.PageSize']) + (node?.rowIndex || 0) + 1,
            cellClass: "justify-start border-solid rounded-r border-r-4 pr-2 text-center",
            cellClassRules: {
                "border-r-L-error-200": ({ data }) => Boolean(data?.positionSide === "Sell"),
                "border-r-L-success-200": ({ data }) => Boolean(data?.positionSide === "Buy")
            },
        },
        /* نماد */
        {
            pinned: 'right',
            minWidth: 112,
            headerName: t("option_position_history.column_symbol"),
            field: "symbolTitle",
            flex: 1,
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
            field: 'positionSide',
            minWidth: 95,
            valueFormatter: ({ value }) => value ? t('common.' + (value === 'None' ? 'closed' : String(value).toLowerCase())) : '-',
            cellClass: ({ data }) => {
                if (!data) return '';
                return (data.positionSide === 'Buy') ? 'text-L-success-200' : (data.positionSide === 'Sell') ? 'text-L-error-200' : '';
            },
        },
        /* تعداد  */
        {
            headerName: t("option_position_history.column_count"),
            field: "positionCount",
            minWidth: 95,
            cellClass: ({ data }) => {
                if (!data) return '';
                return (data.positionSide === 'Buy') ? 'text-L-success-200 ltr' : (data.positionSide === 'Sell') ? 'text-L-error-200 ltr' : '';
            },
            type: 'sepratedNumber',
        },
        /* تاریخ تسویه فیزیکی  */
        {
            headerName: t("option_position_history.column_contractEndDate"),
            field: "contractEndDate",
            minWidth: 144,
            type: 'dateWithoutTime',
        },
        /* روزهای مانده تا سررسید  */
        {
            headerName: t("option_position_history.column_remainDays"),
            field: "contractEndDate",
            minWidth: 144,
            valueFormatter: ({ value }) => {
                const validDate = dayjs(value).isValid() ? dayjs(value).startOf('day') : null;

                if (!validDate) return '-';

                const today = dayjs().startOf('day');

                const remainingDays = dayjs(validDate).diff(today, 'day');

                return remainingDays && Number(remainingDays) >= 0 ? String(remainingDays) : '-';
            }
        },
        /* محل تضمین  */
        {
            headerName: t("option_position_history.column_blockType"),
            field: "blockType",
            minWidth: 144,
            valueGetter: ({ data }) => {
                if (data?.positionSide === 'Sell') {
                    return t('option_blockType.' + data?.blockType);
                }

                return '-';
            }
        },
        /* اندازه تضمین  */
        {
            headerName: t("option_position_history.column_blockedValue"),
            field: "blockCount",
            minWidth: 164,
            cellRenderer: BlockedValueTableComponent
        },
        /* اندازه قرارداد */
        {
            headerName: t("option_position_history.column_contractSize"),
            field: "contractSize",
            minWidth: 100,
            type: 'sepratedNumber',
        },
        /* قیمت اعمال */
        {
            headerName: t("option_position_history.column_appliedPrice"),
            field: "strikePrice",
            minWidth: 100,
            type: 'sepratedNumber',

        },
        /* میانگین قیمت */
        {
            headerName: t("option_position_history.column_avgPrice"),
            field: "avgPrice",
            minWidth: 140,
            valueGetter: ({ data }) => {
                if (!data) return 0;

                return data.positionSide === 'Buy' ? data.avgBuyPrice : data.positionSide === 'Sell' ? data.avgSellPrice : 0;
            },
            type: 'sepratedNumber',

        },
        /* بهای تمام شده */
        {
            headerName: t("option_position_history.column_finalPrice"),
            field: "bepPrice",
            minWidth: 144,
            valueGetter: ({ data }) => data?.positionSide === 'Buy' ? data.buyCost : data?.positionSide === 'Sell' ? data.sellCost : 0,
            type: 'sepratedNumber',

        },
        /* خالص ارزش روز */
        {
            headerName: t("option_position_history.column_closingValue"),
            field: "dayPureValue",
            minWidth: 128,
            valueGetter: ({ data }) => {
                if (!data) return 0;

                const bestPrice = data.positionSide === 'Buy' ? data.bestBuyLimitPrice_1 : data.bestSellLimitPrice_1;

                const price = bestPrice || data.closingPrice;

                const value = price * data.contractSize * data.positionCount;
                const valueWithCommission = data.positionSide === 'Buy' ? Math.round(value * (1 + optionCommission)) : Math.round(value * (1 - optionCommission));

                if (isNaN(valueWithCommission)) return 0;
                return ((data.positionSide === 'Sell') ? -1 : 1) * Math.abs(valueWithCommission);
            },
            valueFormatter: ({ value }) => sepNumbersNavigateNumber(value),

            cellClass: ({ value }) => {
                return value > 0 ?
                    'ltr text-center text-L-success-200' :
                    value < 0 ?
                        'ltr text-center text-L-error-200' :
                        'ltr text-center text-gray-600 dark:text-dark-gray-600';
            }

        },
        /*  سود و زیان*/
        {
            colId: "pandL",
            headerName: t("option_position_history.column_pandL"),
            minWidth: 128,
            valueGetter: ({ data }) => {
                if (!data) return 0;

                const avgPrice = data.positionSide === 'Buy' ? data.avgBuyPrice : data.avgSellPrice;
                const bestPrice = data.positionSide === 'Buy' ? (data.bestBuyLimitPrice_1 || data.closingPrice) : (data.bestSellLimitPrice_1 || data.closingPrice);

                const price = data.positionSide === 'Buy' ? (bestPrice - avgPrice) : (avgPrice - bestPrice);

                const value = price * data.contractSize * data.positionCount;
                const valueWithCommission = data.positionSide === 'Buy' ? Math.round(value * (1 + optionCommission)) : Math.round(value * (1 - optionCommission));

                if (isNaN(valueWithCommission)) return 0;
                return ((value < 0 || valueWithCommission < 0) ? -1 : 1) * Math.abs(valueWithCommission);
            },
            valueFormatter: ({ value }) => sepNumbersNavigateNumber(value),

            cellClass: ({ value }) => {
                return value > 0 ?
                    'ltr text-center text-L-success-200' :
                    value < 0 ?
                        'ltr text-center text-L-error-200' :
                        'ltr text-center text-gray-600 dark:text-dark-gray-600';
            }
        },

        /* سود و زیان اعمال */
        {
            headerName: t("option_position_history.column_appliedPandL"),
            field: "baseClosingPrice",
            minWidth: 128,
            valueGetter: ({ data }) => {
                if (!data) return 0;

                const price = data.positionSide === 'Buy' ? (data.baseClosingPrice - data.strikePrice) : (data.strikePrice - data.baseClosingPrice) || 0;

                const value = price * data.contractSize * data.positionCount;

                const commission = optionAppliedCommission(data);

                const valueWithCommission = Math.round(value * (1 - commission));

                if (isNaN(valueWithCommission)) return 0;
                return ((value < 0 || valueWithCommission < 0) ? -1 : 1) * Math.abs(valueWithCommission);
            },
            valueFormatter: ({ value }) => sepNumbersNavigateNumber(value),

            cellClass: ({ value }) => {
                return value > 0 ?
                    'ltr text-center text-L-success-200' :
                    value < 0 ?
                        'ltr text-center text-L-error-200' :
                        'ltr text-center text-L-gray-600 dark:text-D-gray-600';
            }

        },
    ], [apiParams["QueryOption.PageNumber"], apiParams["QueryOption.PageSize"]]);


    return (
        <ReportLayout
            hasBreadcrumb
            BreadCumbCurrentPage="عملکرد اختیار"
            isFiltered={isFilterValuesChanged()}
            BreadCumbBasePage={
                <>
                    <span>
                        <ReportsIcon />
                    </span>
                    گزارشات
                </>
            }
            onSubmit={() => setApiParams(cleanObjectOfFalsyValues({ ...formValues }) as IFilterOptionPerformance)}
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
                    <FilterBlock label='باقیمانده:' viewCol className="w-full">
                        <Select
                            value={formValues?.hasRemain}
                            options={remainOptions}
                            onChange={(selected) => handleFormValueChange('hasRemain', selected)}
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


export default OptionPerformance;
