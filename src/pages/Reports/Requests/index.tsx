import { ICellRendererParams } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import dayjs, { ManipulateType } from 'dayjs';
import { t } from 'i18next';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useGetOfflineRequestsExcel, useGetOfflineRequestsPaginated, useSendRequest } from 'src/app/queries/order';
import AGActionCell from 'src/common/components/AGActionCell';
import AGTable, { ColDefType } from 'src/common/components/AGTable';
import ExcelExportBtn from 'src/common/components/Buttons/ExcelExportBtn';
import RefreshBtn from 'src/common/components/Buttons/RefreshBtn';
import CustomerMegaSelect from 'src/common/components/CustomerMegaSelect';
import FilterBlock from 'src/common/components/FilterBlock';
import { Paginator } from 'src/common/components/Paginator/Paginator';
import RadioField from 'src/common/components/RadioGroup';
import ReportLayout from 'src/common/components/ReportLayout';
import SymbolMiniSelect from 'src/common/components/SymbolMiniSelect';
import WidgetLoading from 'src/common/components/WidgetLoading';
import { RequestListIcon } from 'src/common/icons';
import { cleanObjectOfFalsyValues, datePeriodValidator, valueFormatterSide } from 'src/utils/helpers';
import InfoModal from 'src/widgets/Reports/components/RequestsModals/InfoModal';
import { customerTypeFieldOptions, timeFieldOptions } from '../Trades/constant';
import AdvancedDatepicker from 'src/common/components/AdvancedDatePicker/AdvanceDatepicker';
import { defaultFormValue, stateOptions } from './constant';
import Select from 'src/common/components/Select';
import { marketUnitTypeOption } from 'src/constant/global';
import Input from 'src/common/components/Input';
import { useAppDispatch } from 'src/redux/hooks';
import { emptySelectedCustomers, emptySelectedSymbol } from 'src/redux/slices/option';
import { useMarketUnit } from 'src/app/queries/symbol';

const Requests = () => {
    const gridRef = useRef<AgGridReact>(null);
    const [selectedRows, setSelectedRows] = useState<IOfflineRequestsPaginatedResponse[]>([]);
    const [apiParams, setApiParams] = useState<IGetOfflineRequestsParamsPaginated>(defaultFormValue);
    const [formData, setFormData] = useState<IGetOfflineRequestsParamsPaginated>(apiParams);
    const [infoModalParams, setInfoModalParams] = useState<{ data?: Record<string, any>; isOpen: boolean }>({ isOpen: false });

    const dispatch = useAppDispatch();

    const { data: marketUnitData } = useMarketUnit();

    const { data, isFetching, refetch } = useGetOfflineRequestsPaginated(apiParams, { enabled: false });

    const payloadApiFactory = (data: IGTOfflineTradesResult[], sendAllRequests: boolean): buySellRequestParams => {

        let ids: number[] = []
        data.forEach(item => {
            ids.push(item.id)
        })

        return {
            ids: ids,
            CustomerSearchTerm: "",
            SymbolSearchTerm: "",
            InputState: "All",
            sendAllRequests: sendAllRequests,
        }
    }


    const { mutate: mutateSendRequest } = useSendRequest({
        onSuccess: () => {
            refetch()
        },
    })

    const marketUnitOption = useMemo(() => {
        if (!marketUnitData?.result) return [];

        const options = marketUnitData?.result
            .filter((item) => !['067', '068', '069', '070'].includes(item.code))
            .map((item) => ({
                value: item.type,
                label: item.title,
            }));

        return [{ value: '', label: t('common.all') }, ...options];
    }, [marketUnitData]);

    const sendGroupRequest = () => {
        const selectedNodes = gridRef.current?.api.getSelectedNodes();

        if (selectedNodes && selectedNodes.length > 0) {
            let selectedItem: IGTOfflineTradesResult[] = []
            selectedNodes.forEach(item => {
                selectedItem.push(item.data)
            })

            const payload = payloadApiFactory(selectedItem, false)

            mutateSendRequest(payload)

        }

    };

    const sendSingleRequest = (data: IGTOfflineTradesResult) => {

        const payload = payloadApiFactory([data], false)

        mutateSendRequest(payload)
    };



    const { refetch: getExcel } = useGetOfflineRequestsExcel({ PageNumber: apiParams.PageNumber, PageSize: apiParams.PageSize });

    useEffect(() => {
        refetch();
    }, [apiParams]);

    const colDefs = useMemo(
        (): ColDefType<IOfflineRequestsPaginatedResponse>[] => [
            { type: 'rowSelect' },
            {
                headerName: t('ag_columns_headerName.row'),
                sortable: false,
                minWidth: 60,
                maxWidth: 80,
                valueFormatter: ({ node }) => String((apiParams?.PageNumber - 1) * apiParams?.PageSize + node?.rowIndex! + 1),
            },
            {
                headerName: t('ag_columns_headerName.customer'),
                field: 'customerTitle',
            },
            {
                headerName: t('ag_columns_headerName.symbol'),
                field: 'symbolTitle',
            },
            {
                headerName: t('ag_columns_headerName.side'),
                field: 'side',
                valueFormatter: valueFormatterSide,
                cellClass: ({ value }) => (value === 'Buy' ? 'text-L-success-200' : value === 'Sell' ? 'text-L-error-200' : ''),
            },
            { headerName: t('ag_columns_headerName.count'), field: 'volume', type: 'sepratedNumber' },
            { headerName: t('ag_columns_headerName.price'), field: 'price', type: 'sepratedNumber' },
            { headerName: t('ag_columns_headerName.orderValue'), field: 'orderValue', type: 'sepratedNumber' },
            { headerName: t('ag_columns_headerName.validity'), field: 'requestExpiration', type: 'dateWithoutTime', minWidth: 150 },
            {
                headerName: t('ag_columns_headerName.status'),
                field: 'state',
                valueFormatter: ({ value }) => (value ? t('BuySellRequestState.' + value) : '-'),
            },
            {
                headerName: t('ag_columns_headerName.actions'),
                field: 'customTitle',
                minWidth: 90,
                maxWidth: 90,
                cellRenderer: (row: ICellRendererParams<IOfflineRequestsPaginatedResponse>) => (
                    <AGActionCell
                        requiredButtons={['Send', 'Info']}
                        data={row.data}
                        onSendClick={(data) => (data ? sendSingleRequest(data) : null)}
                        onInfoClick={() => setInfoModalParams({ data: row?.data, isOpen: true })}
                        hideSend={!datePeriodValidator(dayjs().format('YYYY-MM-DDThh:mm:ss'), (row?.data as Record<string, any>)?.requestExpiration)}
                    />
                ),
            },
        ],
        [],
    );

    const PaginatorHandler = useCallback((action: 'PageNumber' | 'PageSize', value: number) => {
        setApiParams((pre) => ({ ...pre, [action]: value, ['PageNumber']: action === 'PageSize' ? 1 : value }));
        action === 'PageSize' && setFormData((pre) => ({ ...pre, [action]: value }));
        setSelectedRows([])
    }, []);

    const handleSendRequestsButtonTitle = () => {
        const selectedRowCount = selectedRows.length;
        const allCount = apiParams?.PageSize;

        if (allCount) {
            return selectedRowCount === allCount ? '(همه)' : `(${selectedRowCount + '/' + allCount})`;
        } else {
            return '';
        }
    };

    const handleFormValueChange = (field: keyof typeof formData, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const onTimeFieldChange = (time: ManipulateType | undefined) => {
        const ToDate = dayjs().format('YYYY-MM-DDT23:59:59');
        const FromDate = dayjs().subtract(1, time).format('YYYY-MM-DDT00:00:00');
        setFormData((pre) => ({
            ...pre,
            FromDate,
            ToDate,
        }));
    };

    const handleDateChange = (value: string, field: 'FromDate' | 'ToDate') => {
        setFormData((prev) => ({ ...prev, Time: '' }));
        handleFormValueChange(field, value);
    };

    const handleClearClick = () => {
        dispatch(emptySelectedCustomers());
        dispatch(emptySelectedSymbol());
        setFormData({ ...defaultFormValue });
        setApiParams(cleanObjectOfFalsyValues({ ...defaultFormValue, Time: '' }) as IGetOfflineRequestsParamsPaginated);
    };

    const isFilterValuesChanged = () => {
        const initialValue = cleanObjectOfFalsyValues(defaultFormValue);
        const params = cleanObjectOfFalsyValues(apiParams);
        if (initialValue?.CustomerISIN?.length !== params?.CustomerISIN?.length) return true;
        else if (initialValue?.SymbolISIN?.length !== params?.SymbolISIN?.length) return true;
        else if (initialValue?.FromDate !== params?.FromDate) return true;
        else if (initialValue?.ToDate !== params?.ToDate) return true;
        else if (initialValue?.State !== params?.State) return true;
        else if (initialValue?.MarketType !== params?.MarketType) return true;
        else if (initialValue?.CustomerType !== params?.CustomerType) return true;
        else if (initialValue?.RequestNo !== params?.RequestNo) return true;
        else if (initialValue?.MarketUnit !== params?.MarketUnit) return true;
        else return false;
    };

    return (
        <ReportLayout
            hasBreadcrumb
            isFiltered={isFilterValuesChanged()}
            onClear={handleClearClick}
            onSubmit={() => setApiParams(cleanObjectOfFalsyValues({ ...formData, Time: '' }) as IGetOfflineRequestsParamsPaginated)}
            BreadCumbBasePage={
                <>
                    <span>
                        <RequestListIcon />
                    </span>
                    درخواست ها
                </>
            }
            BreadCumbCurrentPage="آفلاین"
            HeaderLeftNode={
                <>
                    <button
                        className="rounded h-9 px-6 flex justify-center items-center text-L-basic dark:text-D-basic bg-L-success-200 hover:bg-L-success-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-L-success-200"
                        onClick={() => sendGroupRequest()}
                        disabled={false}
                    >
                        {`ارسال درخواست ${handleSendRequestsButtonTitle()}`}
                    </button>
                    {/* <button
                        onClick={() => { }}
                        className="px-6 h-9 bg-L-primary-50 dark:bg-D-primary-50 border border-L-primary-50 dark:border-D-primary-50 text-L-basic dark:text-D-basic rounded"
                    >
                        {'ارسال همه درخواست ها'}
                    </button> */}
                    <RefreshBtn onClick={() => refetch()} />
                    <ExcelExportBtn onClick={() => getExcel()} />
                </>
            }
            formFields={
                <div className="flex flex-col gap-2">
                    <FilterBlock label={t('FilterFieldLabel.Customer')} viewCol>
                        <CustomerMegaSelect
                            selected={formData.CustomerISIN}
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
                            selected={formData.SymbolISIN}
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
                        value={formData.Time}
                        label={t('FilterFieldLabel.Time')}
                    />
                    <div className="flex w-full gap-3">
                        <FilterBlock label={t('FilterFieldLabel.FromDate')} viewCol className="w-full">
                            <AdvancedDatepicker
                                value={formData?.FromDate}
                                onChange={(value) => handleDateChange(dayjs(value).format('YYYY-MM-DDT00:00:00'), 'FromDate')}
                            />
                        </FilterBlock>
                        <FilterBlock label={t('FilterFieldLabel.ToDate')} viewCol className="w-full">
                            <AdvancedDatepicker
                                value={formData?.ToDate}
                                onChange={(value) => handleDateChange(dayjs(value).format('YYYY-MM-DDT23:59:59'), 'ToDate')}
                            />
                        </FilterBlock>
                    </div>
                    <FilterBlock label={t('FilterFieldLabel.Status')} viewCol className="w-full ">
                        <Select onChange={(selected) => handleFormValueChange('State', selected)} value={formData?.State} options={stateOptions} />
                    </FilterBlock>
                    <FilterBlock label={t('FilterFieldLabel.Market')} viewCol className="w-full">
                        <Select
                            value={formData.MarketType}
                            onChange={(value) => handleFormValueChange('MarketType', value)}
                            options={marketUnitTypeOption}
                        />
                    </FilterBlock>
                    <FilterBlock label={t('FilterFieldLabel.MarketUnit')} viewCol className="w-full">
                        <Select
                            value={formData.MarketUnit}
                            onChange={(value) => handleFormValueChange('MarketUnit', value)}
                            options={marketUnitOption}
                            optionsClassName="h-52"
                        />
                    </FilterBlock>

                    <RadioField
                        onChange={(value) => handleFormValueChange('CustomerType', value)}
                        options={customerTypeFieldOptions}
                        value={formData?.CustomerType}
                        label={t('FilterFieldLabel.CustomerType')}
                    />
                    <FilterBlock label={t('FilterFieldLabel.RequestNO')} viewCol className="w-full">
                        <Input value={formData.RequestNo} onChange={(value) => handleFormValueChange('RequestNo', value.target.value)} />
                    </FilterBlock>
                </div>
            }
            reportNode={
                <>
                    <WidgetLoading spining={isFetching}>
                        <AGTable
                            ref={gridRef}
                            rowSelection="multiple"
                            suppressScrollOnNewData={false}
                            rowData={data?.result || []}
                            columnDefs={colDefs}
                            onSortChanged={({ api }) => api.refreshCells()}
                            onSelectionChanged={(e) => setSelectedRows(e.api.getSelectedRows())}
                            suppressRowVirtualisation
                        />
                    </WidgetLoading>
                    <div className="border-t flex justify-end items-center pt-4 ">
                        <Paginator
                            loading={isFetching}
                            pageNumber={apiParams.PageNumber}
                            pageSize={apiParams.PageSize}
                            PaginatorHandler={PaginatorHandler}
                            totalPages={data?.totalPages}
                            hasNextPage={data?.hasNextPage}
                            hasPreviousPage={data?.hasPreviousPage}
                        />
                    </div>
                    {infoModalParams.isOpen ? (
                        <InfoModal
                            data={infoModalParams.data}
                            isOpen={infoModalParams.isOpen}
                            onClose={() => setInfoModalParams({ isOpen: false, data: undefined })}
                        />
                    ) : (
                        <></>
                    )}
                </>
            }
        />
    );
};

export default Requests;
