import dayjs from "dayjs";

export const initialFilterState = {
    'QueryOption.PageNumber': 1,
    'QueryOption.PageSize': 10,
    SymbolISIN: undefined,
    Time: 'day',
    StartDate: dayjs().format('YYYY-MM-DDT00:00:00'),
    EndDate: dayjs().format('YYYY-MM-DDT23:59:59'),
    PandLStatus: 'All',
    SettlementType: [],
    RequestStatus: [],
};

export const PandLStatusOptions = [
    { label: 'سود', value: 'Profit' },
    { label: 'زیان', value: 'Loss' },
    { label: 'بی تفاوت', value: 'Indifferent' },
    { label: 'همه', value: 'All' },
];

export const SettlementTypeOptions = [
    { label: 'اعمال حداکثری', value: 'MaximumStrike' },
    { label: 'قسمتی از قرارداد', value: 'PartialStrike' },
];

export const RequestStatusOptions = [
    { label: 'در حال ارسال به بورس', value: 'InSendQueue' },
    { label: 'درخواست با خطا مواجه شد', value: 'Error' },
    { label: 'ارسال شده به بورس', value: 'SendToBourse' },
    { label: 'دریافت نتیجه از بورس', value: 'SaveResult' },
    { label: 'حذف توسط کاربر', value: 'DeleteByUser' },
    { label: 'ثبت شده', value: 'Registered' },
    { label: 'ارسال شده', value: 'Sent' },
    { label: 'در حال ارسال', value: 'Sending' },
    { label: 'پیش نویس', value: 'Draft' },
    { label: 'تسویه شده', value: 'Settled' },
    { label: 'در حال تسویه', value: 'Settling' },
    { label: 'منقضی شده', value: 'Expired' },
    { label: 'حذف شده', value: 'Deleted' },
];
