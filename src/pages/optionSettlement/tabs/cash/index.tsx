import { Paginator } from 'src/common/components/Paginator/Paginator';
import FilterSettlement from '../commenComponents/FilterSettlement';
import AGTable, { ColDefType } from 'src/common/components/AGTable';
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import AXIOS from 'src/api/axiosInstance';
import { Apis } from 'src/common/hooks/useApiRoutes/useApiRoutes';
import { PandLStatusOptions, RequestStatusOptions, SettlementTypeOptions, initialFilterState } from '../../constants';
import { GridReadyEvent, ICellRendererParams } from 'ag-grid-community';
import AGActionCell from 'src/common/components/AGActionCell';
import { ExtraButtons } from '../commenComponents/ExtraButtons';
import { cleanObjectOfFalsyValues, datePeriodValidator } from 'src/utils/helpers';
import { t } from 'i18next';
import CashSettlementModal from './modals/CashSettlementModal';
import { useDeleteCashSettlement } from 'src/app/queries/option';
import UpdateCashSettlement from './modals/UpdateCashSettlement';
import HistoryModal from '../commenComponents/HistoryModal';
import dayjs from 'dayjs';
import { useFilterState, useFilterStateDispatch } from '../../filterContext';
import { onErrorNotif, onSuccessNotif } from 'src/handlers/notification';

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

type TModalState = {
    isOpen: boolean;
    data?: Record<string, any>;
};

const Cash = ({ setGridApi }: { setGridApi: Dispatch<SetStateAction<GridReadyEvent<any> | undefined>> }) => {
    //
    const filterState = useFilterState();
    const setFilterState = useFilterStateDispatch();
    const [params, setParams] = useState(cleanObjectOfFalsyValues(filterState));
    const [settlementModal, setSettlementModal] = useState<TModalState>({ isOpen: false, data: {} });
    const [updateSettlementModal, setUpdateSettlementModal] = useState<TModalState>({ isOpen: false, data: {} });
    const [historyModalState, setHistoryModalState] = useState<TModalState>({ isOpen: false, data: {} });

    const { data, isLoading, refetch } = useQuery(
        ['CashSettlement', params],
        ({ queryKey }) => getCashSettlement(queryKey[1] as typeof initialFilterState),
        { enabled: false },
    );
    const { mutate: deleteCashSettlement } = useDeleteCashSettlement({
        onSuccess: (result) => {
            if (result) {
                onSuccessNotif({ title: 'عملیات با موفقیت انجام شد' });
                refetch()
            }
        },
    });

    useEffect(() => {
        refetch();
    }, [params]);

    const valueFormatter = (options: { label: string; value: string }[], value: string) => {
        return options.find((item) => item.value === value)?.label;
    };

    const handleOnSettlementClick = (data?: Record<string, any>) => {
        setSettlementModal({ isOpen: true, data });
    };

    const handleDelete = (data?: Record<string, any>) => deleteCashSettlement({ id: data?.id, customerISIN: data?.customerISIN });

    const colDefs = useMemo(
        (): ColDefType<TResponse['result'][number]>[] => [
            {
                field: 'customerTitle',
                headerName: 'مشتری',
            },
            {
                field: 'bourseCode',
                headerName: 'کد بورسی',
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
                headerName: 'سمت',
                field: 'side',
                valueFormatter: ({ value }) => (value === 'Call' ? 'خرید' : value === 'Put' ? 'فروش' : ''),
                cellClass: ({ value }) => (value === 'Call' ? 'text-[#01BC8D]' : value === 'Put' ? 'text-[#E84830]' : ''),
            },
            {
                field: 'cashSettlementDate',
                headerName: 'تاریخ تسویه نقدی',
                valueFormatter: ({ value }) => dayjs(value).calendar('jalali').format('YYYY/MM/DD'),
                minWidth: 140,
            },
            {
                field: 'pandLStatus',
                headerName: 'وضعیت قرارداد ( سود / زیان )',
                cellClass: ({ value }) => (value === 'Profit' ? 'text-[#01BC8D]' : value === 'Loss' ? 'text-[#E84830]' : ''),
                valueFormatter: ({ value }) => (value ? valueFormatter(PandLStatusOptions, value) : value),
                minWidth: 180,
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
                minWidth: 150,
            },
            {
                field: 'doneCount',
                headerName: 'تعداد پذیرفته شده',
                type: 'sepratedNumber',
            },
            {
                field: 'userType',
                headerName: 'درخواست کننده',
                valueFormatter: ({ data }) => {
                    if (data?.userType) {
                        return t('OptionSettlement.UserType_' + data?.userType);
                    } else {
                        return data?.userName ?? '';
                    }
                },
            },
            {
                field: 'status',
                headerName: 'وضعیت',
                valueFormatter: ({ value }) => (value ? valueFormatter(RequestStatusOptions, value) : value),
            },
            {
                sortable: false,
                headerName: 'عملیات',
                cellRenderer: (row: ICellRendererParams<any>) => (
                    <AGActionCell
                        data={row?.data}
                        requiredButtons={['Edit', 'Delete']}
                        onDeleteClick={() => handleDelete(row?.data)}
                        disableDelete={!row?.data?.enabled || !(row?.data?.status === 'InSendQueue' || row?.data?.status === 'Registered')}
                        onEditClick={() => setUpdateSettlementModal({ isOpen: true, data: row?.data })}
                        disableEdit={!row?.data?.enabled || !(row?.data?.status === 'InSendQueue' || row?.data?.status === 'Registered')}
                        rightNode={
                            <ExtraButtons
                                disableSettlement={row?.data?.status !== 'Draft' || !Boolean(row?.data?.enabled)}
                                onHistoryClick={() => setHistoryModalState({ isOpen: true, data: row?.data })}
                                onSettlementClick={() => handleOnSettlementClick(row?.data)}
                            />
                        }
                    />
                ),
                pinned: 'left',
                lockVisible: true,
                minWidth: 220,
            },
        ],
        [],
    );

    const PaginatorHandler = (action: 'PageNumber' | 'PageSize', value: number) => {
        setParams((pre) => ({ ...pre, ['QueryOption.' + action]: value }));
    };

    const handleSubmit = () => {
        if (datePeriodValidator(filterState?.StartDate, filterState?.EndDate)) {
            setParams(cleanObjectOfFalsyValues(filterState));
        } else {
            onErrorNotif({ title: 'بازه انتخاب شده صحیح نیست' });
        }
    };

    return (
        <div className="flex flex-col gap-3 h-full w-full">
            <FilterSettlement
                formValues={filterState}
                setFormValues={setFilterState}
                onClear={() => {
                    setFilterState(initialFilterState);
                    setParams(cleanObjectOfFalsyValues(initialFilterState));
                }}
                onSubmit={handleSubmit}
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
            {settlementModal?.isOpen && (
                <CashSettlementModal settlementState={settlementModal} setSettlementState={setSettlementModal} onClose={() => refetch()} />
            )}
            {updateSettlementModal?.isOpen && (
                <UpdateCashSettlement
                    settlementState={updateSettlementModal}
                    setSettlementState={setUpdateSettlementModal}
                    onClose={() => refetch()}
                />
            )}
            {historyModalState?.isOpen && <HistoryModal title="نقدی" state={historyModalState} setState={setHistoryModalState} />}
        </div>
    );
};

const getCashSettlement = async (formValues: typeof initialFilterState) => {
    const { data } = await AXIOS.get<TResponse>(Apis().Options.GetCashSettlement, { params: formValues });
    return data;
};

export default Cash;
