import dayjs from "dayjs";

export const initialState: IOfflineRequestStateType = {
    FromDate: dayjs().subtract(1, 'day').format(),
    ToDate: dayjs().format(),
    Side: 'Cross',
    SymbolISIN: [],
    CustomerISIN: [],
    RequestNo: '',
    State: '',
    MarketType: '',
    PageNumber: 1,
    PageSize: 25,
    CustomerType: undefined,
}