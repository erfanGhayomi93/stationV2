import AGTable, { ColDefType } from 'src/common/components/AGTable';
import { Paginator } from 'src/common/components/Paginator/Paginator';
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import FilterSettlement from '../commenComponents/FilterSettlement';
import { useQuery } from '@tanstack/react-query';
import AXIOS from 'src/api/axiosInstance';
import { Apis } from 'src/common/hooks/useApiRoutes/useApiRoutes';
import { PandLStatusOptions, RequestStatusOptions, SettlementTypeOptions, initialFilterState } from '../../constants';
import { GridReadyEvent, ICellRendererParams } from 'ag-grid-community';
// import AGActionCell from 'src/common/components/AGActionCell';
// import { ExtraButtons } from '../commenComponents/ExtraButtons';
import { cleanObjectOfFalsyValues, datePeriodValidator } from 'src/utils/helpers';
import { t } from 'i18next';
// import PhysicalSettlementModal from './modals/PhysicalSettlementModal';
// import { useDeletePhysicalSettlement } from 'src/app/queries/option';
// import UpdatePhysicalSettlement from './modals/UpdatePhysicalSettlement';
import HistoryModal from '../commenComponents/HistoryModal';
import dayjs from 'dayjs';
import { useFilterState, useFilterStateDispatch } from '../../filterContext';
import { onErrorNotif, onSuccessNotif } from 'src/handlers/notification';
// import { useAppSelector } from 'src/redux/hooks';
// import { getUserData } from 'src/redux/slices/global';

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

const ResultSettlement = ({ setGridApi }: { setGridApi: Dispatch<SetStateAction<GridReadyEvent<any> | undefined>> }) => {
    //
    const filterState = useFilterState();
    const setFilterState = useFilterStateDispatch();
    const [params, setParams] = useState(cleanObjectOfFalsyValues(filterState));
    // const [settlementModal, setSettlementModal] = useState<TModalState>({ isOpen: false, data: {} });
    // const [updateSettlementModal, setUpdateSettlementModal] = useState<TModalState>({ isOpen: false, data: {} });
    const [historyModalState, setHistoryModalState] = useState<TModalState>({ isOpen: false, data: {} });

    // const { userName } = useAppSelector(getUserData)

    const { data, isLoading, refetch } = useQuery(
        ['ResultSettlement', params],
        ({ queryKey }) => getResultSettlementSettlement(queryKey[1] as typeof filterState),
        { enabled: false },
    );

    // const { mutate: deletePhysicalSettlement } = useDeletePhysicalSettlement({
    //     onSuccess: (result) => {
    //         if (result) {
    //             onSuccessNotif({ title: 'عملیات با موفقیت انجام شد' });
    //             refetch();
    //         }
    //     },
    // });

    useEffect(() => {
        refetch();
    }, [params]);

    const valueFormatter = (options: { label: string; value: string }[], value: string) => {
        return options.find((item) => item.value === value)?.label;
    };

    // const handleOnSettlementClick = (data?: Record<string, any>) => {
    //     setSettlementModal({ isOpen: true, data });
    // };

    // const handleDelete = (data?: Record<string, any>) => deletePhysicalSettlement({ id: data?.id, customerISIN: data?.customerISIN, symbolISIN: data?.symbolISIN, userName: userName });

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
                headerName: 'سمت',
                field: 'side',
                valueFormatter: ({ value }) => (value === 'Buy' ? 'خرید' : value === 'Sell' ? 'فروش' : ''),
                cellClass: ({ value }) => (value === 'Buy' ? 'text-[#01BC8D]' : value === 'Sell' ? 'text-[#E84830]' : ''),
            },

            {
                field: 'pandLStatus',
                headerName: 'وضعیت قرارداد ( سود / زیان )',
                cellClass: ({ value }) => (value === 'Profit' ? 'text-[#01BC8D]' : value === 'Loss' ? 'text-[#E84830]' : ''),
                valueFormatter: ({ value }) => (value ? valueFormatter(PandLStatusOptions, value) : value),
                minWidth: 180,
            },
            {
                field: 'settlementType',
                headerName: 'نوع تسویه',
                valueFormatter: ({ value }) => value ? t('options.settlementType_' + value) : "-"
            },
            {
                field: 'settlementRequestType',
                headerName: 'نوع اعمال',
                valueFormatter: ({ value }) => value ? t('options.type_request_settlement_' + value) : "-"
            },
            {
                field: 'requestCount',
                headerName: 'تعداد درخواست برای تسویه',
                minWidth: 150,
            },
            {
                field: 'ceValue',
                headerName: 'تعداد پذیرفته شده',
                minWidth: 150,
            },
            {
                field: 'peValue',
                headerName: 'تعداد اعمال شده',
                minWidth: 150,
            },
            {
                field: 'incomeValue',
                headerName: 'مبلغ تسویه',
                type: 'sepratedNumber',
            },
            {
                field: 'penValue',
                headerName: 'تعداد نکول',
                type: 'sepratedNumber',
            },
             {
                field: 'penVolume',
                headerName: 'مبلغ نکول',
                type: 'sepratedNumber',
            },
            {
                field: 'penPenaltyValue',
                headerName: 'جریمه نکول',
                type: 'sepratedNumber',
            },
            {
                field: 'commissionIncomeValue',
                headerName: 'کارمزد تسویه',
                type: 'sepratedNumber',
            },
            {
                field: 'settlementTax',
                headerName: 'مالیات',
                type: 'sepratedNumber',
            },
            {
                field: 'strikePrice',
                headerName: 'قیمت اعمال',
                type: 'sepratedNumber',
            },
            {
                field: 'physicalSettlementDate',
                headerName: 'تاریخ تسویه فیزیکی',
                valueFormatter: ({ value }) => dayjs(value).calendar('jalali').format('YYYY/MM/DD'),
                minWidth: 140,
            },
            {
                field: 'requestDate',
                headerName: 'تاریخ  درخواست',
                valueFormatter: ({ value }) => dayjs(value).calendar('jalali').format('YYYY/MM/DD'),
                minWidth: 140,
            },
            {
                field: 'sendDate',
                headerName: 'تاریخ پاسخ',
                valueFormatter: ({ value }) => dayjs(value).calendar('jalali').format('YYYY/MM/DD'),
                minWidth: 140,
            },
            {
                field: 'status',
                headerName: 'وضعیت',
                valueFormatter: ({ value }) => (value ? valueFormatter(RequestStatusOptions, value) : value),
            },
          
            // {
            //     field: 'closingPrice',
            //     headerName: 'آخرین قیمت',
            //     type: 'sepratedNumber',
            // },
            // {
            //     field: 'baseClosingPrice',
            //     headerName: 'آخرین قیمت دارایی پایه',
            //     type: 'sepratedNumber',
            // },
          

            // {
            //     field: 'openPositionCount',
            //     headerName: 'تعداد موقعیت باز',
            //     type: 'sepratedNumber',
            // },
            // {
            //     field: 'doneCount',
            //     headerName: 'تعداد اعمال شده',
            //     type: 'sepratedNumber',
            // },
            // {
            //     field: 'doneCount',
            //     headerName: 'تعداد نکول',
            //     type: 'sepratedNumber',
            // },
           
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
            // {
            //     sortable: false,
            //     headerName: 'عملیات',
            //     cellRenderer: (row: ICellRendererParams<any>) => (
            //         <AGActionCell
            //             data={row?.data}
            //             requiredButtons={['Delete']}
            //             onDeleteClick={() => handleDelete(row?.data)}
            //             disableDelete={!row?.data?.enabled || !(row?.data?.status === 'InSendQueue' || row?.data?.status === 'Registered')}
            //             disableEdit={!row?.data?.enabled || !(row?.data?.status === 'InSendQueue' || row?.data?.status === 'Registered')}
            //             // onEditClick={() => setUpdateSettlementModal({ isOpen: true, data: row?.data })}
            //             rightNode={
            //                 <ExtraButtons
            //                     disableSettlement={row?.data?.status !== 'Draft' || !Boolean(row?.data?.enabled)}
            //                     onHistoryClick={() => setHistoryModalState({ isOpen: true, data: row?.data })}
            //                     onSettlementClick={() => handleOnSettlementClick(row?.data)}
            //                 />
            //             }
            //         />
            //     ),
            //     lockVisible: true,
            //     minWidth: 220,
            // },
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
                isHistory
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
            {/* {settlementModal?.isOpen && (
                <PhysicalSettlementModal settlementState={settlementModal} setSettlementState={setSettlementModal} onClose={() => refetch()} />
            )} */}
            {/* {updateSettlementModal?.isOpen && (
                <UpdatePhysicalSettlement
                    settlementState={updateSettlementModal}
                    setSettlementState={setUpdateSettlementModal}
                    onClose={() => refetch()}
                />
            )} */}
            {historyModalState?.isOpen && <HistoryModal title="فیزیکی" state={historyModalState} setState={setHistoryModalState} />}
        </div>
    );
};

const getResultSettlementSettlement = async (formValues: typeof initialFilterState) => {
    const { data } = await AXIOS.get<TResponse>(Apis().Options.SettlementResult, { params: formValues });
    return data;
};

export default ResultSettlement;