import dayjs from "dayjs";

export const initialState: IOfflineRequestStateType = {
    FromDate: dayjs().subtract(1, 'day').format('YYYY-MM-DDT00:00:00'),
    ToDate: dayjs().format('YYYY-MM-DDT23:59:59'),
    Side: 'Cross',
    SymbolISIN: [],
    CustomerISIN: [],
    RequestNo: '',
    State: '',
    MarketType: '',
    MarketUnit: '',
    PageNumber: 1,
    PageSize: 25,
    CustomerType: undefined,
}