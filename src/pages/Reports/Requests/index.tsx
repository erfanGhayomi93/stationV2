import { ICellRendererParams } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import dayjs from 'dayjs';
import { t } from 'i18next';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useGetOfflineRequestsPaginated } from 'src/app/queries/order';
import AGActionCell from 'src/common/components/AGActionCell';
import AGTable, { ColDefType } from 'src/common/components/AGTable';
import ExcelExportBtn from 'src/common/components/Buttons/ExcelExportBtn';
import RefreshBtn from 'src/common/components/Buttons/RefreshBtn';
import { Paginator } from 'src/common/components/Paginator/Paginator';
import ReportLayout from 'src/common/components/ReportLayout';
import WidgetLoading from 'src/common/components/WidgetLoading';
import { RequestListIcon } from 'src/common/icons';
import { datePeriodValidator, valueFormatterSide } from 'src/utils/helpers';
import InfoModal from 'src/widgets/Reports/components/RequestsModals/InfoModal';

const Requests = () => {
    const gridRef = useRef<AgGridReact>(null);
    const [selectedRows, setSelectedRows] = useState<IOfflineRequestsPaginatedResponse[]>([]);
    const [apiParams, setApiParams] = useState<IGetOfflineRequestsParamsPaginated>({ PageNumber: 1, PageSize: 25 });
    const [formData, setFormData] = useState<IGetOfflineRequestsParamsPaginated>(apiParams);
    const [infoModalParams, setInfoModalParams] = useState<{ data?: Record<string, any>; isOpen: boolean }>({ isOpen: false });

    const { data, isFetching, refetch } = useGetOfflineRequestsPaginated(apiParams);

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
            { headerName: t('ag_columns_headerName.validity'), field: 'requestExpiration', type: 'date', minWidth: 150 },
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
                        onSendClick={(data) => {}}
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
    }, []);

    const handleSendRequestsButtonTitle = () => {
        const selectedRowCount = selectedRows.length;

        if (data?.totalCount) {
            return selectedRowCount === data?.totalCount ? '(همه)' : `(${selectedRowCount + '/' + data?.totalCount})`;
        } else {
            return '';
        }
    };

    return (
        <ReportLayout
            hasBreadcrumb
            isFiltered={false}
            onClear={() => {}}
            onSubmit={() => {}}
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
                        onClick={() => {}}
                        disabled={false}
                    >
                        {`ارسال درخواست ${handleSendRequestsButtonTitle()}`}
                    </button>
                    <button
                        onClick={() => {}}
                        className="px-6 h-9 bg-L-primary-50 dark:bg-D-primary-50 border border-L-primary-50 dark:border-D-primary-50 text-L-basic dark:text-D-basic rounded"
                    >
                        {'ارسال همه درخواست ها'}
                    </button>
                    <RefreshBtn onClick={() => refetch()} />
                    <ExcelExportBtn onClick={() => {}} />
                </>
            }
            formFields={<></>}
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
                            rowBuffer={10}
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
