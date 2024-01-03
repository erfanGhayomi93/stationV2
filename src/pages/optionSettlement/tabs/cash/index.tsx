import { Paginator } from 'src/common/components/Paginator/Paginator';
import FilterSettlement from '../commenComponents/FilterCash';
import AGTable, { ColDefType } from 'src/common/components/AGTable';
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import AXIOS from 'src/api/axiosInstance';
import { Apis } from 'src/common/hooks/useApiRoutes/useApiRoutes';
import { PandLStatusOptions, RequestStatusOptions, SettlementTypeOptions, initialFilterState } from '../../constants';
import { GridReadyEvent } from 'ag-grid-community';

type TResponse = {
    result: {
        id: number;
        symbolISIN: string;
        customerIsin: string;
        customerTitle: string;
        symbolTitle: string;
        openPositionCount: number;
        cashSettlementDate: string;
        settlementRequestType: string;
        requestCount: number;
        status: string;
        doneCount: number;
        pandLStatus: string;
        history: {
            dateTime: string;
            status: string;
            description: string;
            userName: string;
        }[];

        side: string;
        deleted: true;
        updatedAt: string;
        cashSettlementId: number;
        userName: string;
        userType: string;
        incomeValue: number;
        enabled: boolean;
    }[];

    pageNumber: number;
    totalPages: number;
    totalCount: number;
    pageSize: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    succeeded: boolean;
    errors: any;
};

const Cash = ({ setGridApi }: { setGridApi: Dispatch<SetStateAction<GridReadyEvent<any> | undefined>> }) => {
    //
    const [formValues, setFormValues] = useState(initialFilterState);
    const [params, setParams] = useState(initialFilterState);
    const { data, isLoading } = useQuery(['CashSettlement', params], ({ queryKey }) => getCashSettlement(queryKey[1] as typeof initialFilterState));

    const valueFormatter = (options: { label: string; value: string }[], value: string) => {
        return options.find((item) => item.value === value)?.label;
    };

    const colDefs = useMemo(
        (): ColDefType<TResponse['result'][number]>[] => [
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
                type: 'sepratedNumber'
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
                type: 'sepratedNumber'
            },
            {
                field: 'requestCount',
                headerName: 'تعداد درخواست برای تسویه',
                type: 'sepratedNumber'
            },
            {
                field: 'doneCount',
                headerName: 'تعداد پذیرفته شده',
                type: 'sepratedNumber'
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
                headerName: 'عملیات',
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
                <AGTable columnDefs={colDefs} rowData={data?.result} onGridReady={(p) => setGridApi(p)} />
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

const getCashSettlement = async (formValues: typeof initialFilterState) => {
    const { data } = await AXIOS.get<TResponse>(Apis().Options.GetCashSettlement, { params: formValues });
    return data;
};

export default Cash;
