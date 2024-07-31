import ReportLayout from "src/common/components/ReportLayout";
import { initialState, RequestStateOptions, RequestTypeOptions } from "./constant";
import { useEffect, useMemo, useState } from "react";
import { cleanObjectOfFalsyValues } from "src/utils/helpers";
import { ReportsIcon } from "src/common/icons";
import { useAppDispatch } from "src/redux/hooks";
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
import { useListFreezeHistory } from "src/app/queries/option";
import { Paginator } from "src/common/components/Paginator/Paginator";
import { useTranslation } from "react-i18next";
import { ColDef } from "ag-grid-community";
import Select from "src/common/components/Select";

const FreezeUnFreezeReports = () => {

    const { t } = useTranslation()

    const [formValues, setFormValues] = useState(initialState);

    const [apiParams, setApiParams] = useState(formValues);

    const dispatch = useAppDispatch();

    const { data, refetch, isFetching } = useListFreezeHistory(cleanObjectOfFalsyValues(apiParams) as IFilterFreezeUnFreeze, { enabled: false });

    useEffect(() => {
        refetch();
    }, [apiParams]);


    const handleDateChange = (value: string, field: 'FromDate' | 'ToDate') => {
        setFormValues((prev) => ({ ...prev, Time: '' }));
        handleFormValueChange(field, value);
    };

    const handleFormValueChange = (field: keyof typeof formValues, value: any) => {
        setFormValues((prev) => ({ ...prev, [field]: value }));
    };

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
        setApiParams(cleanObjectOfFalsyValues({ ...initialState }) as IFilterFreezeUnFreeze);
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

    const COLUMNS = useMemo<ColDef<IResponseFreeze>[]>(() => ([
        // ردیف
        {
            headerName: "ردیف",
            maxWidth: 112,
            valueGetter: ({ node }) => (((data?.pageNumber || 1) - 1) * (data?.pageSize || 25) + (node?.rowIndex ?? 0) + 1),
        },
        {
            headerName: 'مشتری',
            field: "customerTitle",
            minWidth: 112,
            valueFormatter: ({ value }) => value ?? "",
        },
        /* نماد */
        {
            headerName: 'نماد',
            field: "symbolTitle",
            minWidth: 112,
            valueFormatter: ({ value }) => value ?? "",
        },
        {
            headerName: 'درخواست',
            field: "requestType",
            minWidth: 112,
            valueFormatter: ({ value }) => value ? t('freeze_request_type.' + value) : ""
        },
        /* تاریخ */
        {
            headerName: 'تاریخ تایید',
            field: "confirmedOn",
            minWidth: 112,
            valueFormatter: ({ value }) => value ? dayjs(value).calendar('jalali').format('YYYY/MM/DD') : '-'
        },
        /* وضعیت */
        {
            headerName: 'وضعیت',
            field: "requestState",
            minWidth: 128,
            valueFormatter: ({ value }) => value ? t('freeze_request_state.' + value) : ""
        },

        /* عملیات */
        // {
        // 	headerName: t("option.table_action"),
        // 	field: "requestState",
        // 	cellClass: 'flex justify-center items-center',
        // 	cellRenderer: DeleteFreezeRequestAction,
        // 	sortable: false,
        // 	cellRendererParams: {
        // 		onDeleteRow
        // 	},
        // 	minWidth: 220,
        // 	maxWidth: 220,
        // },
    ]), [data?.pageNumber , data?.pageSize]);


    return (
        <ReportLayout
            hasBreadcrumb
            BreadCumbCurrentPage="فریز و رفع فریز"
            isFiltered={isFilterValuesChanged()}
            BreadCumbBasePage={
                <>
                    <span>
                        <ReportsIcon />
                    </span>
                    گزارشات
                </>
            }
            onSubmit={() => setApiParams(cleanObjectOfFalsyValues({ ...formValues, Time: '' }) as IFilterFreezeUnFreeze)}
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

                    <FilterBlock label='درخواست' viewCol className="w-full">
                        <Select
                            value={formValues?.RequestType}
                            options={RequestTypeOptions}
                            onChange={(selected) => handleFormValueChange('RequestType', selected)}
                        />
                    </FilterBlock>


                    <FilterBlock label='وضعیت' viewCol className="w-full">
                        <Select
                            value={formValues?.RequestState}
                            options={RequestStateOptions}
                            onChange={(selected) => handleFormValueChange('RequestState', selected)}
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

export default FreezeUnFreezeReports;
