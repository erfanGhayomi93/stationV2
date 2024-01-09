import AGTable, { ColDefType } from 'src/common/components/AGTable';
import { Paginator } from 'src/common/components/Paginator/Paginator';
import { useEffect, useMemo, useState } from 'react';
import FilterSettlement from '../commenComponents/FilterSettlement';
import { useQuery } from '@tanstack/react-query';
import AXIOS from 'src/api/axiosInstance';
import { Apis } from 'src/common/hooks/useApiRoutes/useApiRoutes';
import { PandLStatusOptions, RequestStatusOptions, SettlementTypeOptions, initialFilterState } from '../../constants';
import { ICellRendererParams } from 'ag-grid-community';
import AGActionCell from 'src/common/components/AGActionCell';
import { ExtraButtons } from '../commenComponents/ExtraButtons';
import { cleanObjectOfFalsyValues } from 'src/utils/helpers';
import { t } from 'i18next';
import PhysicalSettlementModal from './modals/PhysicalSettlementModal';
import { useDeletePhysicalSettlement } from 'src/app/queries/option';
import UpdatePhysicalSettlement from './modals/UpdatePhysicalSettlement';
import HistoryModal from '../commenComponents/HistoryModal';
import dayjs from 'dayjs';

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

type TModalState = {
    isOpen: boolean;
    data?: Record<string, any>;
};

const Physical = (props: any) => {
    //
    const [formValues, setFormValues] = useState(initialFilterState);
    const [params, setParams] = useState(cleanObjectOfFalsyValues(initialFilterState));
    const [settlementModal, setSettlementModal] = useState<TModalState>({ isOpen: false, data: {} });
    const [updateSettlementModal, setUpdateSettlementModal] = useState<TModalState>({ isOpen: false, data: {} });
    const [historyModalState, setHistoryModalState] = useState<TModalState>({ isOpen: false, data: {} });

    const { data, refetch, isLoading } = useQuery(
        ['PhysicalSettlement', params],
        ({ queryKey }) => getPhysicalSettlement(queryKey[1] as typeof formValues),
        {
            enabled: false,
        },
    );
    const { mutate: deletePhysicalSettlement } = useDeletePhysicalSettlement({
        onSuccess: (result) => {
            if (result) {
            }
        },
    });

    const valueFormatter = (options: { label: string; value: string }[], value: string) => {
        return options.find((item) => item.value === value)?.label;
    };

    const handleOnSettlementClick = (data?: Record<string, any>) => {
        setSettlementModal({ isOpen: true, data });
    };

    const handleDelete = (data?: Record<string, any>) => deletePhysicalSettlement({ id: data?.id, customerISIN: data?.customerIsin });

    useEffect(() => {
        refetch();
    }, [params]);

    const colDefs = useMemo(
        (): ColDefType<any>[] => [
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
                headerName: 'تاریخ تسویه فیزیکی',
                valueFormatter: ({ value }) => dayjs(value).calendar("jalali").format("YYYY/MM/DD"),
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
                headerName: 'تعداد اعمال شده',
                type: 'sepratedNumber',
            },
            {
                field: 'doneCount',
                headerName: 'تعداد نکول',
                type: 'sepratedNumber',
            },
            {
                field: 'penVolume',
                headerName: 'مبلغ نکول',
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
                        disableDelete={row?.data?.enabled || !(row?.data?.status === 'InSendQueue' || row?.data?.status === 'Registered')}
                        disableEdit={row?.data?.enabled || !(row?.data?.status === 'InSendQueue' || row?.data?.status === 'Registered')}
                        onEditClick={() => setUpdateSettlementModal({ isOpen: true, data: row?.data })}
                        rightNode={
                            <ExtraButtons
                                disableSettlement={row?.data?.status !== 'Draft' || row?.data?.enabled}
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

    return (
        <div className="flex flex-col gap-3 h-full w-full">
            <FilterSettlement
                formValues={formValues}
                setFormValues={setFormValues}
                onClear={() => {
                    setFormValues(initialFilterState);
                    setParams(cleanObjectOfFalsyValues(initialFilterState));
                }}
                onSubmit={() => setParams(cleanObjectOfFalsyValues(formValues))}
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
            {settlementModal?.isOpen && <PhysicalSettlementModal settlementState={settlementModal} setSettlementState={setSettlementModal} />}
            {updateSettlementModal?.isOpen && (
                <UpdatePhysicalSettlement settlementState={updateSettlementModal} setSettlementState={setUpdateSettlementModal} />
            )}
            {historyModalState?.isOpen && <HistoryModal title="فیزیکی" state={historyModalState} setState={setHistoryModalState} />}
        </div>
    );
};

const getPhysicalSettlement = async (formValues: typeof initialFilterState) => {
    const { data } = await AXIOS.get<TResponse>(Apis().Options.GetPhysicalSettlement, { params: formValues });
    return data;
};

export default Physical;
