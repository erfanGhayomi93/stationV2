import dayjs from "dayjs";

export const initialState: IFilterFreezeUnFreeze = {
    FromDate: dayjs().subtract(1, 'day').format('YYYY-MM-DDT00:00:00'),
    ToDate: dayjs().format('YYYY-MM-DDT23:59:59'),
    SymbolISIN: [],
    CustomerISIN: [],
    PageNumber: 1,
    PageSize: 10,
    Time: 'day',
    RequestType : '' ,
    RequestState  : ''
};

export const RequestTypeOptions = [
    { label: 'همه', value: '' },
    { label: 'فریز', value: 'Freeze' },
    { label: 'رفع فریز', value: 'UnFreeze' },
]

export const RequestStateOptions = [
    { label: 'همه', value: '' },
    { label: 'تایید', value: 'Done' },
    { label: 'در حال انجام', value: 'InProgress' },
    { label: 'ناموفق', value: 'FreezeFailed' },
    { label: 'عدم تایید', value: 'NotApprove' },
]
