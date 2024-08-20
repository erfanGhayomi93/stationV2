import dayjs from "dayjs";
import i18next from "i18next";

export const turnOverState: ITurnOverStateType = {
    DateFrom: dayjs().subtract(1, 'day').format('YYYY-MM-DDT00:00:00'),
    DateTo: dayjs().format('YYYY-MM-DDT23:59:59'),
    Side: '',
    SymbolISIN: [],
    CustomerISIN: [],
    Time: 'day',
    'QueryOption.PageSize': 25,
    'QueryOption.PageNumber': 1,
    IsAggregated: false,
}

export const transactionSideField = [
    { value: '', label: i18next.t('common.all') },
    { value: 'Buy', label: i18next.t('TransactionTypes.Buy') },
    { value: 'Sell', label: i18next.t('TransactionTypes.Sell') },
    { value: 'Deposit', label: i18next.t('TransactionTypes.Deposit') },
    { value: 'Withdraw', label: i18next.t('TransactionTypes.Withdraw') },
]