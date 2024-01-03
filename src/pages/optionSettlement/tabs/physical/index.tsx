import AGTable, { ColDefType } from 'src/common/components/AGTable';
import { Paginator } from 'src/common/components/Paginator/Paginator';
import { useMemo, useState } from 'react';
import FilterSettlement from '../commenComponents/FilterCash';
import { useQuery } from '@tanstack/react-query';
import AXIOS from 'src/api/axiosInstance';
import { Apis } from 'src/common/hooks/useApiRoutes/useApiRoutes';
import { PandLStatusOptions, RequestStatusOptions, SettlementTypeOptions, initialFilterState } from '../../constants';
import { ICellRendererParams } from 'ag-grid-community';
import AGActionCell from 'src/common/components/AGActionCell';
import { ExtraButtons } from '../commenComponents/ExtraButtons';

type TResponse = {
    result: {
        id: number;
        symbolISIN: string;
        symbolTitle: string;
        openPositionCount: number;
        penCount: number;
        penValue: number;
        customerIsin: string;
        customerTitle: string;
        cashSettlementDate: string;
        settlementRequestType: string;
        requestCount: number;
        status: string;
        doneCount: number;
        pandLStatus: string;
        requestForLostOrProfit: boolean;
        history: {
            dateTime: string;
            status: string;
            description: string;
            userName: string;
        }[];
        side: string;
        deleted: boolean;
        updatedAt: string;
        physicalSettlementId: number;
        userName: string;
        userType: string;
        incomeValue: number;
        commissionIncomeValue: number;
        penVolume: number;
        penPenaltyValue: number;
        enabled: boolean;
    }[];
    pageNumber: number;
    totalPages: number;
    totalCount: number;
    pageSize: number;
    hasPreviousPage: true;
    hasNextPage: true;
    succeeded: true;
    errors: string[];
};

const Physical = (props: any) => {
    //
    const [formValues, setFormValues] = useState(initialFilterState);
    const [params, setParams] = useState(initialFilterState);
    const { data, isLoading } = useQuery(['PhysicalSettlement', params], ({ queryKey }) => getPhysicalSettlement(queryKey[1] as typeof params));

    const valueFormatter = (options: { label: string; value: string }[], value: string) => {
        return options.find((item) => item.value === value)?.label;
    };

    const colDefs = useMemo(
        (): ColDefType<any>[] => [
            {
                field: 'customerTitle',
                headerName: 'مشتری',
            },
            {
                field: 'symbolTitle',
                headerName: 'نماد',
            },
            {
                field: 'openPositionCount',
                headerName: 'تعداد موقعیت باز',
                type: 'sepratedNumber',
            },
            {
                field: 'cashSettlementDate',
                headerName: 'تاریخ تسویه فیزیکی',
                type: 'date',
            },
            {
                field: 'pandLStatus',
                headerName: 'وضعیت قرارداد ( سود / زیان )',
                valueFormatter: ({ value }) => (value ? valueFormatter(PandLStatusOptions, value) : value),
            },
            {
                field: 'settlementRequestType',
                headerName: 'نوع اعمال',
                valueFormatter: ({ value }) => (value ? valueFormatter(SettlementTypeOptions, value) : value),
            },
            {
                field: 'incomeValue',
                headerName: 'مبلغ تسویه',
                type: 'sepratedNumber',
            },
            {
                field: 'requestCount',
                headerName: 'تعداد درخواست برای تسویه',
                type: 'sepratedNumber',
            },
            {
                field: 'doneCount',
                headerName: 'تعداد اعمال شده',
                type: 'sepratedNumber',
            },
            {
                field: '',
                headerName: 'موافقت با تسویه فیزیکی در حالت زیان',
            },
            {
                field: 'penVolume',
                headerName: 'تعداد نکول',
                type: 'sepratedNumber',
            },
            {
                field: 'penValue',
                headerName: 'مبلغ نکول',
                type: 'sepratedNumber',
            },
            {
                field: 'userName',
                headerName: 'درخواست کننده',
            },
            {
                field: 'status',
                headerName: 'وضعیت',
                valueFormatter: ({ value }) => (value ? valueFormatter(RequestStatusOptions, value) : value),
            },
            {
                sortable: false,
                field: '',
                headerName: 'عملیات',
                cellRenderer: (row: ICellRendererParams<IDraftResponseType>) => (
                    <AGActionCell
                        data={row?.data}
                        requiredButtons={['Edit', 'Delete']}
                        rightNode={<ExtraButtons onHistoryClick={() => {}} onSettlementClick={() => {}} />}
                    />
                ),
                pinned: 'left',
                lockVisible: true,
                minWidth: 280,
            },
        ],
        [],
    );

    const PaginatorHandler = (action: 'PageNumber' | 'PageSize', value: number) => {
        setParams((pre) => ({ ...pre, ['QueryOption.' + action]: value }));
    };

    return (
        <div className="flex flex-col gap-3 h-full w-full">
            <FilterSettlement
                formValues={formValues}
                setFormValues={setFormValues}
                onClear={() => {
                    setFormValues(initialFilterState);
                    setParams(initialFilterState);
                }}
                onSubmit={() => setParams(formValues)}
            />
            <div className="flex-1">
                <AGTable columnDefs={colDefs} rowData={data?.result} onGridReady={(p) => props.setGridApi(p)} />
            </div>
            <div className="border-t my-2"></div>
            <Paginator
                loading={isLoading}
                pageNumber={data?.pageNumber || 1}
                pageSize={data?.pageSize || 10}
                totalPages={data?.totalPages}
                hasNextPage={data?.hasNextPage}
                hasPreviousPage={data?.hasPreviousPage}
                PaginatorHandler={PaginatorHandler}
            />
        </div>
    );
};

const getPhysicalSettlement = async (formValues: typeof initialFilterState) => {
    const { data } = await AXIOS.get<TResponse>(Apis().Options.GetPhysicalSettlement, { params: formValues });
    return data;
};

export default Physical;
