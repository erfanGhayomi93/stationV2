import dayjs from "dayjs";
import i18next from "i18next";

export const initialState: ITradeStateType = {
    FromDate: dayjs().subtract(1, 'day').format('YYYY-MM-DDT00:00:00'),
    ToDate: dayjs().format('YYYY-MM-DDT23:59:59'),
    Side: '',
    SymbolISIN: [],
    CustomerISIN: [],
    PageNumber: 1,
    PageSize: 25,
    Time: 'day',
    CustomerType: '',
    MyStationOnly: false,
}

export const timeFieldOptions = [
    { value: 'day', label: i18next.t('timeSheet.day') },
    { value: 'week', label: i18next.t('timeSheet.week') },
    { value: 'month', label: i18next.t('timeSheet.month') },
    { value: 'year', label: i18next.t('timeSheet.year') },
    { value: 'custom', label: i18next.t('timeSheet.custom') },
]

export const sideFieldOptions = [
    { value: '', label: i18next.t('common.all') },
    { value: 'Buy', label: i18next.t('orderSide.Buy') },
    { value: 'Sell', label: i18next.t('orderSide.Sell') },
]

export const customerTypeFieldOptions = [
    { value: '', label: i18next.t('common.all') },
    { value: 'Natural', label: i18next.t('CustomerType.Natural') },
    { value: 'Legal', label: i18next.t('CustomerType.Legal') },
]

export const stationFieldOptions = [
    { value: false, label: i18next.t('common.all') },
    { value: true, label: i18next.t('common.myStation') },
]