export const initialFilterState = {
    'QueryOption.PageNumber': 1,
    'QueryOption.PageSize': 10,
    SymbolISIN: undefined,
    Time: 'day',
    StartDate: '',
    EndDate: '',
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
    { label: 'InSendQueue', value: 'InSendQueue' },
    { label: 'Error', value: 'Error' },
    { label: 'SendToBourse', value: 'SendToBourse' },
    { label: 'SaveResult', value: 'SaveResult' },
    { label: 'DeleteByUser', value: 'DeleteByUser' },
    { label: 'Registered', value: 'Registered' },
    { label: 'Sent', value: 'Sent' },
    { label: 'Sending', value: 'Sending' },
    { label: 'Draft', value: 'Draft' },
    { label: 'Settled', value: 'Settled' },
    { label: 'Settling', value: 'Settling' },
    { label: 'Expired', value: 'Expired' },
    { label: 'Deleted', value: 'Deleted' },
];
