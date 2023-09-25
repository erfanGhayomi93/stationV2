import dayjs from "dayjs";
import i18next from "i18next";

export const turnOverState: ITurnOverStateType = {
    DateFrom: dayjs().subtract(1, 'day').format(),
    DateTo: dayjs().format(),
    Side: undefined,
    SymbolISIN: [],
    CustomerISIN: [],
    Time: 'day',
    PageNumber: 1,
    PageSize: 25,
    IsAggregated: false,
}

export const transactionSideField = [
    { value: 'Buy', label: i18next.t('TransactionTypes.Buy') },
    { value: 'Sell', label: i18next.t('TransactionTypes.Sell') },
    { value: 'Deposit', label: i18next.t('TransactionTypes.Deposit') },
    { value: 'Withdraw', label: i18next.t('TransactionTypes.Withdraw') },
]